"use client"

import type { QueryClient } from "@tanstack/react-query"
import { dehydrate, Hydrate } from "@tanstack/react-query"
import type { PropsWithChildren } from "react"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Props = PropsWithChildren & { fn: (...args: any) => QueryClient }
export const HydratedPosts = ({ children, fn }: Props) => {
  const queryClient = fn()
  //   await queryClient.prefetchQuery(["posts"], getPosts)
  const dehydratedState = dehydrate(queryClient)
  // const hydratedState = trpc.useDehydratedState(client, undefined)

  return <Hydrate state={dehydratedState}>{children}</Hydrate>
}
