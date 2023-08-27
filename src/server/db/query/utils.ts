import type {
  ComparisonOperator,
  UpdateObject,
  WhereExpressionFactory,
} from "kysely"
import { db } from "../config"
import type { DB } from "../types"
import type { DestructureQueryValue, InsertValue, QueryValue } from "../utils"
import type { ExtractTableAlias } from "kysely/dist/cjs/parser/table-parser"

export const insertRows = <T extends keyof DB, V extends InsertValue<T>>(
  table: T,
  values: V,
) => db.insertInto(table).values(values)

export const selectAllFrom = <T extends keyof DB>(table: T) =>
  db.selectFrom(table).selectAll()

export const selectRows = <
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

type UpdateProps<T extends keyof DB> = UpdateObject<
  DB,
  ExtractTableAlias<DB, T>,
  ExtractTableAlias<DB, T>
>

export const updateRows = <
  T extends keyof DB,
  V extends UpdateProps<T>,
  Where extends WhereExpressionFactory<DB, T>,
>(
  table: T,
  value: V,
  fn: Where,
) => {
  //@ts-expect-error kysely types for set and where clause (1st parameter) is too restrictive but don't worry it still works
  return db.updateTable(table).set(value).where(fn)
}

export const updateRow = <
  T extends keyof DB,
  Key extends keyof DB[T],
  V extends QueryValue<T, "update", Key>,
>(
  table: T,
  key: Key,
  value: V,
) => {
  const { [key]: identifier, ...newValue } = value
  //@ts-expect-error kysely types for set and where clause (1st parameter) is too restrictive but don't worry it still works
  return db.updateTable(table).set(newValue).where(key, "=", identifier)
}

export const deleteRows = <
  T extends keyof DB,
  Key extends keyof DB[T],
  Op extends ComparisonOperator,
  RawValue extends DestructureQueryValue<T, Key, "delete">,
  V extends Op extends "in" | "not in" ? RawValue[] : RawValue,
>(
  table: T,
  key: Key,
  op: Op,
  value: V,
) =>
  db.deleteFrom(table).where(
    // @ts-expect-error -> kysely uses function overload which confuse vscode
    key,
    op,
    value,
  )
