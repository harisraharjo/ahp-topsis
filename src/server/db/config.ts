import { Kysely } from "kysely"
import { PlanetScaleDialect } from "kysely-planetscale"
import type { DB } from "./types"

const config = {
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
} as const

export const db = new Kysely<DB>({
  dialect: new PlanetScaleDialect(config),
})

export type KyselyDB = typeof db
