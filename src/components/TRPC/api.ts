"use client"

/**
 * This is the client-side entrypoint for your tRPC API.
 * It's used to create the `api` object which contains the Next.js App-wrapper
 * as well as your typesafe react-query hooks.
 *
 * We also create a few inference helpers for input and output types
 */
import { createTRPCReact } from "@trpc/react-query"

import { type inferRouterInputs, type inferRouterOutputs } from "@trpc/server"

import { type AppRouter } from "@server/api/root"

export const {
  Provider,
  createClient,
  criteria: apiCriteria,
  useDehydratedState,
  useQueries,
  ...trpc
} = createTRPCReact<AppRouter>()

// export const api = createTRPCProxyClient<AppRouter>({
//   transformer: superjson,
//   links: [
//     loggerLink({
//       enabled: (opts) =>
//         process.env.NODE_ENV === "development" ||
//         (opts.direction === "down" && opts.result instanceof Error),
//     }),
//     httpBatchLink({
//       url: `${getBaseUrl()}/api/trpc`,
//     }),
//   ],
// })

// /**
//  * A set of typesafe react-query hooks for your tRPC API
//  */
// export const api = createTRPCNext<AppRouter>({
//   config() {
//     return {
//       /**
//        * Transformer used for data de-serialization from the server
//        * @see https://trpc.io/docs/data-transformers
//        **/
//       transformer: superjson,

//       /**
//        * Links used to determine request flow from client to server
//        * @see https://trpc.io/docs/links
//        * */
//       links: [
//         loggerLink({
//           enabled: (opts) =>
//             process.env.NODE_ENV === "development" ||
//             (opts.direction === "down" && opts.result instanceof Error),
//         }),
//         httpBatchLink({
//           url: `${getBaseUrl()}/api/trpc`,
//         }),
//         // splitLink
//       ],
//     }
//   },
//   /**
//    * Whether tRPC should await queries when server rendering pages
//    * @see https://trpc.io/docs/nextjs#ssr-boolean-default-false
//    */
//   ssr: false,
// })

/**
 * Inference helper for inputs
 * @example type HelloInput = RouterInputs['example']['hello']
 **/
export type RouterInputs = inferRouterInputs<AppRouter>
/**
 * Inference helper for outputs
 * @example type HelloOutput = RouterOutputs['example']['hello']
 **/
export type RouterOutputs = inferRouterOutputs<AppRouter>
