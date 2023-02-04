"use client"

import { useRef, useState } from "react"
import type { ReactNode, PropsWithChildren } from "react"
import { SidebarContainer, SidebarContextProvider } from "./Sidebar"

type NavigationProps = PropsWithChildren<{ navbar: ReactNode }>
export const Container = ({ children, navbar }: NavigationProps) => {
  const [isOpen, handler] = useState(false)
  const handlerRef = useRef<HTMLButtonElement | null>(null)

  return (
    <>
      <SidebarContextProvider handler={handler} handlerRef={handlerRef}>
        {navbar}
      </SidebarContextProvider>
      <SidebarContainer
        isOpen={isOpen}
        handlerRef={handlerRef}
        handler={handler}
      >
        {children}
      </SidebarContainer>
    </>
  )
}
