import { useRef, useState } from "react"
import type { ReactNode, PropsWithChildren } from "react"
import {
  SidebarBody,
  SidebarContainer,
  SidebarContextProvider,
} from "./Sidebar"
import { Navbar } from "./Navbar"

type NavigationProps = PropsWithChildren<{ navbar: ReactNode }>
const Container = ({ children, navbar }: NavigationProps) => {
  const [isOpen, handler] = useState(false)
  const handlerRef = useRef(null)

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

export const Navigation = () => {
  return (
    <Container navbar={<Navbar />}>
      <SidebarBody />
    </Container>
  )
}
