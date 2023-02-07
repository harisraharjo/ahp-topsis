import type { InsertObject, UpdateObject } from "kysely"
import type { KyselyPlanetscaleDB } from "../config"
import type { DB } from "../types"
import { createId as createCUID } from "@paralleldrive/cuid2"
import type { DestructureQueryValue, QueryValues } from "../utils"

export type SetObjectAt<
  TB extends keyof DB,
  UT extends keyof DB = TB,
> = UpdateObject<DB, TB, UT>

export const appendID = <
  T extends keyof DB,
  V extends DB[T] | Omit<DB[T], "id">,
>(
  values: V,
) => ({ ...values, id: createCUID() })

export const insertValuesInto = <
  T extends keyof DB,
  V extends QueryValues<T, "insert">,
>(
  db: KyselyPlanetscaleDB,
  table: T,
  values: V,
) => db.insertInto(table).values(values as InsertObject<DB, T>)

export const selectTableBy = <
  T extends keyof DB,
  Key extends keyof DB[T],
  V extends DestructureQueryValue<T, Key, "select">,
>(
  db: KyselyPlanetscaleDB,
  table: T,
  key: Key,
  value: V,
) =>
  db.selectFrom(table).selectAll().where(
    // @ts-expect-error -> kysely uses function overload which confused vscode
    key,
    "=",
    value,
  )
