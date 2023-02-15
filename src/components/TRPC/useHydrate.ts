import { hydrate, useQueryClient } from "@tanstack/react-query"
import { useMemo, useRef } from "react"

function useHydrate(state: any, options = { context: undefined }) {
  const queryClient = useQueryClient({
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    context: options.context,
  })
  const optionsRef = useRef(options)
  optionsRef.current = options // Running hydrate again with the same queries is safe,
  // it wont overwrite or initialize existing queries,
  // relying on useMemo here is only a performance optimization.
  // hydrate can and should be run *during* render here for SSR to work properly

  useMemo(() => {
    if (state) {
      // @ts-expect-error stop
      hydrate(queryClient, state, optionsRef.current)
    }
  }, [queryClient, state])
}
