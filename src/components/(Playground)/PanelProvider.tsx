"use client"

import type { Dispatch, PropsWithChildren, SetStateAction } from "react"
import { useContext } from "react"
import { createContext } from "react"

export type Mode = "edit" | "view"

export function usePanelContext() {
  return useContext(context)
}
type PanelContext = [Mode, Dispatch<SetStateAction<Mode>>]
export const context = createContext<PanelContext>(["view", () => "view"])

export type PanelContextProviderProps = PropsWithChildren<{
  mode: PanelContext
}>
export const PanelProvider = ({
  children,
  mode,
}: PanelContextProviderProps) => (
  <PanelContextProvider value={mode}>{children}</PanelContextProvider>
)

const PanelContextProvider = context.Provider
