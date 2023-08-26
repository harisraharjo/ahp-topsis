import { type PropsWithChildren, type ReactNode } from "react"
import Link from "next/link"
import { UserButton } from "@clerk/nextjs"
import {  Menubar, MenubarMenu } from "~components/ui/menubar"
import { Button } from "~components/ui/button"

export type NavbarProps = PropsWithChildren<{ _?: ReactNode }>
export const Navbar = ({}: NavbarProps) => {
  return (
    <nav className="flex w-full px-4 py-2 border-b border-slate-50">
      <Menubar className="bg-inherit">
        <MenubarMenu>
          <Button variant={"link"} className="text-slate-50">
            <Link href={"/"}>
              Home
            </Link>
          </Button>
          <Button variant={"link"} className="text-slate-50">
            <Link href="/entries">
              Entries
            </Link>
            </Button>
        </MenubarMenu>
      </Menubar>
       
      <div className="ml-auto">
          <UserButton />
      </div>
    </nav>
  )
}
