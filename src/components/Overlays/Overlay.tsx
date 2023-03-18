"use client"

import { FocusScope } from "@react-aria/focus"
import type { Dispatch, PropsWithChildren, SetStateAction } from "react"
import { createContext, useContext, useState, useLayoutEffect } from "react"

type OverlayProps = PropsWithChildren

export const OverlayContext = createContext<Dispatch<
  SetStateAction<boolean>
> | null>(null)

const OverlayContextProvider = OverlayContext.Provider

/**
 * A container which renders an overlay such as a popover or modal in a portal,
 * and provides a focus scope for the child elements.
 */
export function Overlay({ children }: OverlayProps) {
  const [contain, setContain] = useState(false)

  return (
    <OverlayContextProvider value={setContain}>
      <FocusScope restoreFocus contain={contain}>
        {children}
      </FocusScope>
    </OverlayContextProvider>
  )
}

export function useOverlayFocusContain() {
  const setContain = useContext(OverlayContext)
  useLayoutEffect(() => {
    setContain?.(true)
  }, [setContain])
}
