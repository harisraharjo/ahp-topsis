import type { DB, Session, User } from "../types"
import { db } from "../config"
import {
  insertRows,
  selectRows,
  appendID,
  updateRow,
  deleteRows,
} from "./utils"
import type { DestructureQueryValue, QueryValue, RawQueryValue } from "../utils"
import type { AdapterKeyFunctionParameter } from "@server/auth/adapter"
import type { InsertObject } from "kysely"
import { cache } from "react"

export const createUser = (user: InsertObject<DB, "User">) =>
  insertRows("User", appendID(user))
    .executeTakeFirstOrThrow()
    .then(() =>
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      getUserBy(user.email as string, "email").executeTakeFirstOrThrow(),
    )

export const getUserBy = <
  Key extends keyof RawQueryValue<"User">,
  Value extends DestructureQueryValue<"User", Key, "select">,
>(
  value: Value,
  key: Key,
) => selectRows("User", key, "=", value)

export const updateUser = (user: QueryValue<"User", "update", "id">) => {
  const query = updateRow("User", "id", user)

  return query
    .executeTakeFirstOrThrow()
    .then(() =>
      selectRows("User", "id", "=", user.id).executeTakeFirstOrThrow(),
    )
}

export const deleteUser = (id: User["id"]) =>
  deleteRows("User", "id", "=", id).execute()

export const linkAccount = (account: InsertObject<DB, "Account">) =>
  insertRows("Account", appendID(account)).executeTakeFirstOrThrow()

type ProviderAccountID = Pick<
  RawQueryValue<"Account">,
  "provider" | "providerAccountId"
>
export const unlinkAccount = ({
  providerAccountId,
  provider,
}: ProviderAccountID) =>
  deleteRows("Account", "providerAccountId", "=", providerAccountId)
    .where("provider", "=", provider)
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
  selectRows(
    "Session",
    "sessionToken",
    "=",
    sessionToken,
  ).executeTakeFirstOrThrow()

export const createSession = (session: Omit<Session, "id">) =>
  insertRows("Session", appendID(session))
    .executeTakeFirstOrThrow()
    .then(getSession(session.sessionToken))

export const updateSession = cache(
  (session: AdapterKeyFunctionParameter<"updateSession">[0]) =>
    updateRow("Session", "sessionToken", session)
      .executeTakeFirstOrThrow()
      .then(getSession(session.sessionToken)),
)

export const deleteSession = (sessionToken: Session["sessionToken"]) =>
  deleteRows(
    "Session",
    "sessionToken",
    "=",
    sessionToken,
  ).executeTakeFirstOrThrow()
