import type { InsertObject, UpdateObject, ComparisonOperator } from "kysely"
import { db } from "../config"
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
  table: T,
  values: V,
) => db.insertInto(table).values(values as InsertObject<DB, T>)

export const selectAllFrom = <T extends keyof DB>(table: T) =>
  db.selectFrom(table).selectAll()

export const selectRowsBy = <
  T extends keyof DB,
  Key extends keyof DB[T],
  Op extends ComparisonOperator,
  RawValue extends DestructureQueryValue<T, Key, "select">,
  V extends Op extends "in" | "not in" ? RawValue[] : RawValue,
>(
  table: T,
  key: Key,
  op: Op,
  value: V,
) =>
  selectAllFrom(table).where(
    // @ts-expect-error -> kysely uses function overload which confused vscode
    key,
    op,
    value,
  )

// export const selectIsEqual = <
//   T extends keyof DB,
//   S extends SelectQueryBuilder<DB, T, unknown>,
//   SelectedTable extends S extends SelectQueryBuilder<DB, infer U, unknown>
//     ? U
//     : never,
//   R extends keyof DB[SelectedTable],
//   V extends DestructureQueryValue<SelectedTable, R, "select">,
// >(
//   sb: S,
//   key: R,
//   value: V,
// ) => sb.where(key as ReferenceExpression<DB, SelectedTable>, "=", value)

export const updateTableBy = <
  T extends keyof DB,
  Key extends keyof DB[T],
  V extends QueryValues<T, "update", Key>,
>(
  table: T,
  key: Key,
  value: V,
) => {
  const { [key]: identifier, ...newValue } = value
  //@ts-expect-error kysely types for set and where clause (1st parameter) is too restrictive but don't worry it still works
  return db.updateTable(table).set(newValue).where(key, "=", identifier)
}
