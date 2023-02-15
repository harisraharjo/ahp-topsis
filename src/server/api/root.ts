import { criteria } from "./routers"
import { createTRPCRouter } from "./trpc"

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  criteria,
})

// export type definition of API
export type AppRouter = typeof appRouter

export type Endpoints = "criteria" | "students" //typeof endpoints[number]

// const getBaseUrl = () => {
//   if (typeof window !== "undefined") return "" // browser should use relative url
//   if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}` // SSR should use vercel url
//   return `http://localhost:${process.env.PORT ?? 3000}` // dev SSR should use localhost
// }
