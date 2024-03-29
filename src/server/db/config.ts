import { Kysely } from "kysely"
import type { PlanetScaleDialectConfig } from "kysely-planetscale"
import { PlanetScaleDialect } from "kysely-planetscale"
import type { DB } from "./types"
import chalk from "chalk"

const config: PlanetScaleDialectConfig = {
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
} as const

export const db = new Kysely<DB>({
  dialect: new PlanetScaleDialect(config),
  log(event) {
    if (event.level === "query") {
      console.log(chalk.blue("=== QUERY ==="))
      console.log(chalk.magenta(event.query.sql))
      console.log(chalk.cyan(event.query.parameters))
    }

    if (event.level === "error") {
      console.log("=== ERROR ===")
      console.log(event.error)
    }
  },
})

export type KyselyPlanetscaleDB = typeof db
