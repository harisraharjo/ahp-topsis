import type { ColumnType } from "kysely"

export type ProtectedId = ColumnType<string, string, never>
