"use client"

import type { QueryClient } from "@tanstack/react-query"
import { QueryClientProvider } from "@tanstack/react-query"
import { httpBatchLink, loggerLink } from "@trpc/react-query"
import { createClient, Provider } from "./api"
import type { PropsWithChildren } from "react"
import { useState } from "react"
import SuperJSON from "superjson"

const getBaseUrl = () => {
  if (typeof window !== "undefined") return "" // browser should use relative url
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}` // SSR should use vercel url
  return `http://localhost:${process.env.PORT ?? 3000}` // dev SSR should use localhost
}

const config: Parameters<typeof createClient>[0] = {
  transformer: SuperJSON,
  links: [
    loggerLink({
      enabled: (opts) =>
        process.env.NODE_ENV === "development" ||
        (opts.direction === "down" && opts.result instanceof Error),
    }),
    httpBatchLink({
      url: `${getBaseUrl()}/api/trpc`,
    }),
  ],
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Props = PropsWithChildren & { fn: (...args: any) => QueryClient }
export const TRPCProvider = ({ children, fn }: Props) => {
  const [queryClient] = useState(fn)
  const [client] = useState(() => createClient(config))

  return (
    <Provider client={client} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </Provider>
  )
}
