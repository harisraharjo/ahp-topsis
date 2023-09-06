import type { ExtractMandatoryKeys, WithRequired } from "@customTypes"
import type { ColumnType, InsertObject } from "kysely"
import type { DB } from "./types"

export type InsertValue<Table extends keyof DB> = InsertObject<DB, Table>

type Modify = "update" | "delete"
type QueryType = "select" | Modify
type Tables = keyof DB

export type DestructureQueryValue<
  Table extends Tables,
  Key extends keyof DB[Table],
  Q extends QueryType,
> = DB[Table][Key] extends ColumnType<infer S, unknown, infer U>
  ? Q extends "select"
    ? S
    : Q extends Modify
    ? U
    : never
  : DB[Table][Key]

export type RawQueryValue<
  Table extends Tables,
  Q extends QueryType = "select",
  Key extends keyof DB[Table] = keyof DB[Table],
> = {
  [K in Key]: DestructureQueryValue<Table, K, Q>
}

export type QueryValue<
  Table extends Tables,
  Q extends QueryType,
  Key extends keyof DB[Table] = never,
  RawValue extends RawQueryValue<Table, Q> = RawQueryValue<Table, Q>,
> = Q extends Modify
  ? Key extends never
    ? never
    : WithRequired<Partial<RawValue>, Key>
  : Partial<RawValue> & ExtractMandatoryKeys<RawValue>
