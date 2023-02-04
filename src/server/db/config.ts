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
  log(event) {
    if (event.level === "query") {
      console.log("=== QUERY ===")
      console.log(event.query)
    }

    if (event.level === "error") {
      console.log("=== ERROR ===")
      console.log(event.error)
    }
  },
})

export type KyselyDB = typeof db
