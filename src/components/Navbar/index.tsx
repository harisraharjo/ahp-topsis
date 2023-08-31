import { type PropsWithChildren, type ReactNode } from "react"
import { UserButton } from "@clerk/nextjs"
import { Menubar, MenubarMenu } from "~components/ui/menubar"
import { ButtonLink } from "~components/ButtonLink"

export type NavbarProps = PropsWithChildren<{ _?: ReactNode }>
export const Navbar = ({}: NavbarProps) => {
  return (
    <nav className="flex w-full px-4 py-2">
      <Menubar className="bg-inherit">
        <MenubarMenu>
          <ButtonLink destination="/">Home</ButtonLink>
          <ButtonLink destination="/entries">Entries</ButtonLink>
        </MenubarMenu>
      </Menubar>
      <div className="ml-auto">
        <UserButton />
      </div>
    </nav>
  )
}
