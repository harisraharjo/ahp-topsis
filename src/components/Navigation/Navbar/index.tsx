import { type PropsWithChildren, type ReactNode } from "react"
import { SidebarHandler } from "../Sidebar"
import Link from "next/link"
import { UserButton } from "@clerk/nextjs"
// import { SignOut } from "~components/SigninHandler"

export type NavbarProps = PropsWithChildren<{ _?: ReactNode }>
export const Navbar = ({}: NavbarProps) => {
  return (
    <nav className="relative mx-auto flex w-full flex-wrap items-center justify-between rounded-2xl px-4 py-2 transition-all duration-250 ease-soft-in lg:flex-nowrap lg:justify-start">
      <Link href={"/"}>
        Home
      </Link>
      <Link href="/entries" className="ml-7">
        Entries
      </Link>
      <div className="flex grow items-center lg:basis-auto">
        <div className="flex items-center md:ml-auto md:pr-4">
          <UserButton />
        </div>
        <ul className="flex list-none flex-row justify-end pl-0 md-max:w-full">
          <li className="flex items-center pl-4 xl:hidden">
            <SidebarHandler />
          </li>
        </ul>
      </div>
      {/* </div> */}
    </nav>
  )
}
