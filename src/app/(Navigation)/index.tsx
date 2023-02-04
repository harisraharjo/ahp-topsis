import { Navbar } from "./Navbar"
import { SidebarBody } from "./Sidebar"
import { Container } from "./Container"

export const Navigation = () => {
  return (
    <Container navbar={<Navbar />}>
      <SidebarBody />
    </Container>
  )
}
