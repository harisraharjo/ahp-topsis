import { Kysely } from "kysely"
import { PlanetScaleDialect } from "kysely-planetscale"
import { PrismaClient } from "@prisma/client"

import { env } from "@env/server.mjs"
import type { DB } from "./types"

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    log:
      env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  })

if (env.NODE_ENV !== "production") {
  global.prisma = prisma
}

const config = {
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
} as const

export const db = new Kysely<DB>({
  dialect: new PlanetScaleDialect(config),
})
