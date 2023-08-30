import type { ColumnType } from "kysely"

export type Decimal = ColumnType<string, string | number, string | number>

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>

export interface Criteria {
  id: Generated<number>
  name: string
  weight: Decimal
  parentId: number | null
  isBenefit: Generated<0 | 1>
  userId: string
}

export interface DB {
  Criteria: Criteria
}
