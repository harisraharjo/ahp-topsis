"use client"

import { useRef, useState } from "react"
import type { ReactNode, PropsWithChildren } from "react"
import { SidebarContainer, SidebarContextProvider } from "./Sidebar"
import useOnClickOutside from "use-onclickoutside"

type NavigationProps = PropsWithChildren<{ navbar: ReactNode }>
export const Container = ({ children, navbar }: NavigationProps) => {
  const [isOpen, handler] = useState(false)
  const handlerRef = useRef<HTMLButtonElement | null>(null)
  const ref = useRef(null)
  useOnClickOutside(
    ref,
    (event) =>
      void (
        !handlerRef.current?.contains(event.target as Node) &&
        handler(() => false)
      ),
  )

  return (
    <>
      <SidebarContextProvider handler={handler} handlerRef={handlerRef}>
        {navbar}
      </SidebarContextProvider>
      <SidebarContainer isOpen={isOpen} ref={ref}>
        {children}
      </SidebarContainer>
    </>
  )
}
