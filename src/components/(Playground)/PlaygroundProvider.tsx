"use client"

import type { PropsWithChildren, RefObject } from "react"
import { useContext } from "react"
import { createContext } from "react"

export type Mode = "edit" | "view"

export function usePlaygroundContext() {
  return useContext(context)
}
type PlaygroundContext = RefObject<SVGSVGElement>
export const context = createContext<PlaygroundContext | null>(null)

export type PlaygroundContextProviderProps = PropsWithChildren<{
  containerRef: PlaygroundContext
}>
export const PlaygroundProvider = ({
  children,
  containerRef,
}: PlaygroundContextProviderProps) => (
  <PlaygroundContextProvider value={containerRef}>
    {children}
  </PlaygroundContextProvider>
)

const PlaygroundContextProvider = context.Provider
