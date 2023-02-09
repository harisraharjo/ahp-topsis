import type { ExtractMandatoryKeys } from "@customTypes"
import type { ColumnType } from "kysely"
import type { DB } from "./types"

type QueryType = "select" | "insert" | "update"
type Tables = keyof DB
// TODO: (VERY LOW) No autocomplete?
export type DestructureQueryValue<
  Table extends Tables,
  Key extends keyof DB[Table],
  Q extends QueryType,
> = DB[Table][Key] extends ColumnType<infer S, infer I, infer U>
  ? Q extends "select"
    ? S
    : Q extends "insert"
    ? I
    : Q extends "update"
    ? U
    : never
  : DB[Table][Key]

export type RawQueryValue<
  Table extends Tables,
  Q extends QueryType = "select",
> = {
  [K in keyof DB[Table]]: DestructureQueryValue<Table, K, Q>
}

export type QueryValues<
  Table extends Tables,
  Q extends QueryType,
  Key extends keyof DB[Table] = never,
  Value extends RawQueryValue<Table, Q> = RawQueryValue<Table, Q>,
> = Q extends "update"
  ? Key extends never
    ? never
    : WithRequired<Partial<Value>, Key>
  : Partial<Value> & ExtractMandatoryKeys<Value>

type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] }
