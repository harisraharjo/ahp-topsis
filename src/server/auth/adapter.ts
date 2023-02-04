/* eslint-disable @typescript-eslint/require-await */
import type { DB } from "../db"

import type { Awaitable } from "next-auth"
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

// import type { Adapter } from "next-auth/adapters"
// type AwaitableTable<T extends keyof DB, Null = false, Undefined = false> = Awaitable<(DB[T] | Null extends null ? null : never | Undefined extends undefined ? undefined : never)>
// type DA = AwaitableTable<"User">

export interface Adapter {
  createUser: (user: DB["User"]) => Awaitable<DB["User"]>
  getUser: (id: string) => Awaitable<DB["User"] | null>
  getUserByEmail: (email: string) => Awaitable<DB["User"] | null>
  /** Using the provider id and the id of the user for a specific account, get the user. */
  getUserByAccount: (
    providerAccountId: Pick<DB["Account"], "provider" | "providerAccountId">,
  ) => Awaitable<DB["User"] | null>
  updateUser: (user: Partial<DB["User"]>) => Awaitable<DB["User"]>
  deleteUser?: (
    userId: string,
  ) => Promise<void> | Awaitable<DB["User"] | null | undefined>
  linkAccount: (
    account: DB["Account"],
  ) => Promise<void> | Awaitable<DB["Account"] | null | undefined>
  unlinkAccount?: (
    providerAccountId: Pick<DB["Account"], "provider" | "providerAccountId">,
  ) => Promise<void> | Awaitable<DB["Account"] | undefined>
  /** Creates a session for the user and returns it. */
  createSession: (session: {
    sessionToken: string
    userId: string
    expires: Date
  }) => Awaitable<DB["Session"]>
  getSessionAndUser: (sessionToken: string) => Awaitable<{
    session: DB["Session"]
    user: DB["User"]
  } | null>
  updateSession: (
    session: Partial<DB["Session"]> & Pick<DB["Session"], "sessionToken">,
  ) => Awaitable<DB["Session"] | null | undefined>
  /**
   * Deletes a session from the database.
   * It is preferred that this method also returns the session
   * that is being deleted for logging purposes.
   */
  deleteSession: (
    sessionToken: string,
  ) => Promise<void> | Awaitable<DB["Session"] | null | undefined>
  //   createVerificationToken?: (
  //     verificationToken: DB["VerificationToken"],
  //   ) => Awaitable<DB["VerificationToken"] | null | undefined>
  //   /**
  //    * Return verification token from the database
  //    * and delete it so it cannot be used again.
  //    */
  //   useVerificationToken?: (params: {
  //     identifier: string
  //     token: string
  //   }) => Awaitable<DB["VerificationToken"] | null>
}

export function KyselyPlanetscaleAdapter(): Adapter {
  return {
    createUser: createUser as unknown as Adapter["createUser"],
    getUser: async (id) =>
      ((await getUserBy("id", id)) ?? null) as ReturnType<
        Adapter["getUserByAccount"]
      >,
    getUserByEmail: async (email) =>
      ((await getUserBy("email", email)) ?? null) as ReturnType<
        Adapter["getUserByEmail"]
      >,
    getUserByAccount: async (providerAccountID) =>
      ((await getUserByAccount(providerAccountID)) ?? null) as ReturnType<
        Adapter["getUserByAccount"]
      >,
    updateUser: updateUser as unknown as Adapter["updateUser"],
    deleteUser: deleteUser as unknown as Adapter["deleteUser"],
    linkAccount: linkAccount as unknown as Adapter["linkAccount"],
    unlinkAccount: unlinkAccount as unknown as Adapter["unlinkAccount"],
    createSession: createSession,
    getSessionAndUser: async (sessionToken) =>
      ((await getSessionAndUser(sessionToken)) ?? null) as ReturnType<
        Adapter["getSessionAndUser"]
      >,
    updateSession,
    deleteSession: deleteSession as unknown as Adapter["deleteSession"],
  }
}
