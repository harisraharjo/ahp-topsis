import type { DB } from "../types"
import { db } from "../config"
import type { UpdateObject } from "kysely"
import { type Adapter } from "@server/auth/adapter"
import { insertValuesInto, selectTableBy } from "./utils"

// const filter<T extends keyof DB, Key extends keyof DB[T]>(
//   table: T,
//   key: Key,
// ) {
//   return db
//     .selectFrom(table)
//     .selectAll()
//     .where()
// }

export const createUser = (user: DB["User"]) =>
  insertValuesInto(db, "User", user)
    .executeTakeFirstOrThrow()
    .then(() =>
      selectTableBy(db, "User", "email", user.email).executeTakeFirstOrThrow(),
    )

export const getUserBy = <
  Key extends keyof DB["User"],
  Value extends DB["User"][Key],
>(
  key: Key,
  value: Value,
) => selectTableBy(db, "User", key, value).executeTakeFirst()

export const updateUser = (user: Partial<DB["User"]>) => {
  const { id, ...userData } = user
  if (!id) throw new Error("User not found")

  const query = db
    .updateTable("User")
    .set(userData as UpdateObject<DB, "User", "User">)
    .where("id", "=", id)

  return query
    .executeTakeFirstOrThrow()
    .then(() => selectTableBy(db, "User", "id", id).executeTakeFirstOrThrow())
}

export const deleteUser = (id: DB["User"]["id"]) =>
  db.deleteFrom("User").where("User.id", "=", id).execute()

export const linkAccount = (account: DB["Account"]) =>
  insertValuesInto(db, "Account", account).executeTakeFirstOrThrow()

type ProviderAccountID = Parameters<Adapter["getUserByAccount"]>[0]

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

export const getSessionAndUser = (
  sessionToken: DB["Session"]["sessionToken"],
) =>
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

const getSession = (sessionToken: DB["Session"]["sessionToken"]) =>
  selectTableBy(
    db,
    "Session",
    "sessionToken",
    sessionToken,
  ).executeTakeFirstOrThrow()

export const createSession = (session: Omit<DB["Session"], "id">) =>
  insertValuesInto(db, "Session", session)
    .executeTakeFirstOrThrow()
    .then(() => getSession(session.sessionToken))

export const updateSession = (
  session: Parameters<Adapter["updateSession"]>[0],
) =>
  db
    .updateTable("Session")
    .set(session)
    .where("Session.sessionToken", "=", session.sessionToken)
    .executeTakeFirstOrThrow()
    .then(() => getSession(session.sessionToken))

export const deleteSession = (sessionToken: DB["Session"]["sessionToken"]) =>
  db
    .deleteFrom("Session")
    .where("Session.sessionToken", "=", sessionToken)
    .executeTakeFirstOrThrow()
