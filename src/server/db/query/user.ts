import type { Session, User } from "../types"
import { db } from "../config"

import { appendID, updateTableBy } from "./utils"
import { insertValuesInto, selectRowsBy } from "./utils"
import type {
  DestructureQueryValue,
  QueryValues,
  RawQueryValue,
} from "../utils"
import type { AdapterKeyFunctionParameter } from "@server/auth/adapter"

export const createUser = (user: QueryValues<"User", "insert">) =>
  insertValuesInto("User", appendID(user))
    .executeTakeFirstOrThrow()
    .then(() => getUserBy(user.email, "email").executeTakeFirstOrThrow())

export const getUserBy = <
  Key extends keyof RawQueryValue<"User">,
  Value extends DestructureQueryValue<"User", Key, "select">,
>(
  value: Value,
  key: Key,
) => selectRowsBy("User", key, "=", value)

export const updateUser = (user: QueryValues<"User", "update", "id">) => {
  const query = updateTableBy("User", "id", user)

  return query
    .executeTakeFirstOrThrow()
    .then(() =>
      selectRowsBy("User", "id", "=", user.id).executeTakeFirstOrThrow(),
    )
}

export const deleteUser = (id: User["id"]) =>
  db.deleteFrom("User").where("User.id", "=", id).execute()

export const linkAccount = (account: QueryValues<"Account", "insert">) =>
  insertValuesInto("Account", appendID(account)).executeTakeFirstOrThrow()

type ProviderAccountID = Pick<
  RawQueryValue<"Account">,
  "provider" | "providerAccountId"
>
export const unlinkAccount = ({
  providerAccountId,
  provider,
}: ProviderAccountID) =>
  db
    .deleteFrom("Account")
    .where("Account.providerAccountId", "=", providerAccountId)
    .where("Account.provider", "=", provider)
    .executeTakeFirstOrThrow()

export const getUserByAccount = ({
  providerAccountId,
  provider,
}: ProviderAccountID) =>
  db
    .selectFrom("User")
    .innerJoin("Account", "User.id", "Account.userId")
    .selectAll("User")
    .where("Account.providerAccountId", "=", providerAccountId)
    .where("Account.provider", "=", provider)
    .executeTakeFirst()

export const getSessionAndUser = (sessionToken: Session["sessionToken"]) =>
  db
    .selectFrom("Session")
    .innerJoin("User", "User.id", "Session.userId")
    .selectAll("User")
    .select([
      "Session.id as sessionId",
      "Session.userId",
      "Session.sessionToken",
      "Session.expires",
    ])
    .where("Session.sessionToken", "=", sessionToken)
    .executeTakeFirst()

const getSession = (sessionToken: Session["sessionToken"]) => () =>
  selectRowsBy(
    "Session",
    "sessionToken",
    "=",
    sessionToken,
  ).executeTakeFirstOrThrow()

export const createSession = (session: Omit<Session, "id">) =>
  insertValuesInto("Session", appendID(session))
    .executeTakeFirstOrThrow()
    .then(getSession(session.sessionToken))

export const updateSession = (
  session: AdapterKeyFunctionParameter<"updateSession">[0],
) =>
  updateTableBy("Session", "sessionToken", session)
    .executeTakeFirstOrThrow()
    .then(getSession(session.sessionToken))

export const deleteSession = (sessionToken: Session["sessionToken"]) =>
  db
    .deleteFrom("Session")
    .where("Session.sessionToken", "=", sessionToken)
    .executeTakeFirstOrThrow()
