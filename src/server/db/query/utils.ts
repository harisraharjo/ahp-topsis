import type { InsertObject } from "kysely"
import type { KyselyPlanetscaleDB } from "../config"
import type { DB } from "../types"
import { createId as createCUID } from "@paralleldrive/cuid2"

export const insertValuesInto = <T extends keyof DB>(
  db: KyselyPlanetscaleDB,
  table: T,
  values: DB[T] | Omit<DB[T], "id">,
) =>
  db
    .insertInto(table)
    .values({ ...values, id: createCUID() } as InsertObject<DB, T>)

export const selectTableBy = <
  T extends keyof DB,
  Key extends keyof DB[T],
  V extends DB[T][Key],
>(
  db: KyselyPlanetscaleDB,
  table: T,
  key: Key,
  value: V,
) =>
  db.selectFrom(table).selectAll().where(
    // @ts-expect-error kysely uses const overload which makes vscode confused
    key,
    "=",
    value,
  )
