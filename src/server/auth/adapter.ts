import type { DB } from "../db"

import type { Awaitable as NextAuthAwaitable } from "next-auth"

import {
  createSession,
  createUser,
  deleteSession,
  deleteUser,
  getSessionAndUser,
  getUserBy,
  getUserByAccount,
  linkAccount,
  unlinkAccount,
  updateSession,
  updateUser,
} from "../db/query"

export type AdapterKeyFunctionParameter<Key extends keyof Adapter> = Parameters<
  // @ts-expect-error -> it _should_ works?
  Adapter[Key]
>

export interface Adapter {
  createUser: (user: DB["User"]) => NextAuthAwaitable<DB["User"]>
  getUser: (id: string) => NextAuthAwaitable<DB["User"] | null>
  getUserByEmail: (email: string) => NextAuthAwaitable<DB["User"] | null>
  /** Using the provider id and the id of the user for a specific account, get the user. */
  getUserByAccount: (
    providerAccountId: Pick<DB["Account"], "provider" | "providerAccountId">,
  ) => NextAuthAwaitable<DB["User"] | null>
  updateUser: (user: Partial<DB["User"]>) => NextAuthAwaitable<DB["User"]>
  deleteUser?: (
    userId: string,
  ) => Promise<void> | NextAuthAwaitable<DB["User"] | null | undefined>
  linkAccount: (
    account: DB["Account"],
  ) => Promise<void> | NextAuthAwaitable<DB["Account"] | null | undefined>
  unlinkAccount?: (
    providerAccountId: Pick<DB["Account"], "provider" | "providerAccountId">,
  ) => Promise<void> | NextAuthAwaitable<DB["Account"] | undefined>
  /** Creates a session for the user and returns it. */
  createSession: (session: {
    sessionToken: string
    userId: string
    expires: Date
  }) => NextAuthAwaitable<DB["Session"]>
  getSessionAndUser: (sessionToken: string) => NextAuthAwaitable<{
    session: DB["Session"]
    user: DB["User"]
  } | null>
  updateSession: (
    session: Partial<DB["Session"]> & Pick<DB["Session"], "sessionToken">,
  ) => NextAuthAwaitable<DB["Session"] | null | undefined>
  /**
   * Deletes a session from the database.
   * It is preferred that this method also returns the session
   * that is being deleted for logging purposes.
   */
  deleteSession: (
    sessionToken: string,
  ) => Promise<void> | NextAuthAwaitable<DB["Session"] | null | undefined>
  //   createVerificationToken?: (
  //     verificationToken: DB["VerificationToken"],
  //   ) => NextAuthAwaitable<DB["VerificationToken"] | null | undefined>
  //   /**
  //    * Return verification token from the database
  //    * and delete it so it cannot be used again.
  //    */
  //   useVerificationToken?: (params: {
  //     identifier: string
  //     token: string
  //   }) => NextAuthAwaitable<DB["VerificationToken"] | null>
}

export function KyselyPlanetscaleAdapter(): Adapter {
  return {
    createUser: createUser as unknown as Adapter["createUser"],
    getUser: awaitedOrNull(getUserBy, "id") as Adapter["getUser"],
    getUserByEmail: awaitedOrNull(
      getUserBy,
      "email",
    ) as Adapter["getUserByEmail"],
    getUserByAccount: awaitedOrNull(
      getUserByAccount,
    ) as Adapter["getUserByAccount"],
    updateUser: updateUser as unknown as Adapter["updateUser"],
    deleteUser: deleteUser as unknown as Adapter["deleteUser"],
    linkAccount: linkAccount as unknown as Adapter["linkAccount"],
    unlinkAccount: unlinkAccount as unknown as Adapter["unlinkAccount"],
    createSession: createSession,
    getSessionAndUser: (sessionToken) =>
      getSessionAndUser(sessionToken).then(
        constructSessionAndUser,
      ) as ReturnType<Adapter["getSessionAndUser"]>,

    updateSession,
    deleteSession: deleteSession as unknown as Adapter["deleteSession"],
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type UndefinedPromiselikeFn = (...args: any) => PromiseLike<unknown | undefined>

/**
 *
 * @param fn To return null value if the end result is undefined
 * @param props Takes a PromiseLike function that is possible to have undefined value
 * @returns Return a function that takes args from the adapter and the passed in function
 */
const awaitedOrNull =
  <T extends UndefinedPromiselikeFn, Props extends Parameters<T>[1]>(
    fn: T,
    props?: Props,
  ) =>
  (arg: unknown) => {
    console.log("Awaited or null ->", fn.name)
    return fn(arg, props).then((r) => r ?? null)
  }

/**
 *
 * @param result Takes the awaited result from getSessionAndUser functioni
 * @returns Either an object with Session and User as keys or null
 */
const constructSessionAndUser = (
  result: Awaited<ReturnType<typeof getSessionAndUser>>,
) => {
  if (!result) return null

  const { sessionId, userId, expires, sessionToken, ...user } = result
  return {
    session: {
      id: sessionId,
      sessionToken,
      userId,
      expires,
    },
    user,
  }
}
