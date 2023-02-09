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

export const selectAll = <T extends keyof DB>(
  db: KyselyPlanetscaleDB,
  table: T,
) => db.selectFrom(table).selectAll()

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
  selectAll(db, table).where(
    // @ts-expect-error -> kysely uses function overload which confused vscode
    key,
    "=",
    value,
  )

// type D = OperandValueExpressionOrList<DB, T, Key>
// export const selectIsEqual = <
//   T extends keyof DB,
//   S extends SelectAllQueryBuilder<DB, T, object, T>,
//   V extends DestructureQueryValue<T, keyof DB[T], "select">,
//   R extends ReferenceExpression<DB, S extends SelectAllQueryBuilder<DB, any, unknown, infer U>
//   ? U
//   : never>
// >(
//   sb: S,
//   key: R,
//   value: V,
// ) =>
//   sb.where(
//     key,
//     "=",

//     value,
//   )

// const add = selectAll(db, "User")
// const ald = selectIsEqual(add,"", {})

export const updateTableBy = <
  T extends keyof DB,
  Key extends keyof DB[T],
  V extends QueryValues<T, "update", Key>,
>(
  db: KyselyPlanetscaleDB,
  table: T,
  key: Key,
  value: V,
) => {
  const { [key]: identifier, ...newValue } = value
  //@ts-expect-error kysely types for set and where clause (1st parameter) is too restrictive but don't worry it still works
  return db.updateTable(table).set(newValue).where(key, "=", identifier)
}
