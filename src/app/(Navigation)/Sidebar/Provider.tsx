"use client"

import {
  useContext,
  createContext,
  type PropsWithChildren,
  type MutableRefObject,
  type Dispatch,
  type SetStateAction,
} from "react"

type SidebarHandler = Dispatch<SetStateAction<boolean>>
const SidebarHandlerContext = createContext<SidebarHandler>(() => false)

type SidebarState = MutableRefObject<HTMLButtonElement | null>
const SidebarStateContext = createContext<SidebarState | undefined>(undefined)

const SidebarHandlerContextProvider = SidebarHandlerContext.Provider
const SidebarStateContextProvider = SidebarStateContext.Provider

export function useSidebarContext() {
  const handler = useContext(SidebarHandlerContext)
  const ref = useContext(SidebarStateContext)

  return { handler, ref }
}

export type SidebarContextProviderProps = PropsWithChildren<{
  handler: SidebarHandler
  handlerRef: SidebarState
}>
export const SidebarContextProvider = ({
  handler,
  handlerRef,
  children,
}: SidebarContextProviderProps) => (
  <SidebarHandlerContextProvider value={handler}>
    <SidebarStateContextProvider value={handlerRef}>
      {children}
    </SidebarStateContextProvider>
  </SidebarHandlerContextProvider>
)
