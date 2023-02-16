import { type PropsWithChildren, type ReactNode } from "react"
import { Breadcrumb } from "../Breadcrumb"
import { SidebarHandler } from "../Sidebar"
// import { SignOut } from "@components/SigninHandler"

export type NavbarProps = PropsWithChildren<{ _?: ReactNode }>
export const Navbar = ({}: NavbarProps) => {
  return (
    <nav className="relative flex flex-wrap items-center justify-between rounded-2xl px-0 py-2 transition-all duration-250 ease-soft-in lg:flex-nowrap lg:justify-start">
      <div className="mx-auto flex w-full items-center justify-between px-4 py-1 flex-wrap-inherit">
        <Breadcrumb />

        <div className="mt-2 flex grow items-center sm:mt-0 sm:mr-6 md:mr-0 lg:flex lg:basis-auto">
          <div className="flex items-center md:ml-auto md:pr-4">
            <div className="relative flex w-full flex-wrap items-stretch rounded-lg transition-all ease-soft">
              {/* <span className="absolute z-50 -ml-px flex h-full items-center whitespace-nowrap rounded-lg rounded-tr-none rounded-br-none border border-r-0 border-transparent bg-transparent py-2 px-2.5 text-center text-sm font-normal leading-5.6 text-slate-500 transition-all ease-soft">
                <i className="fas fa-search"></i>
              </span> */}
              <input
                type="text"
                className="relative -ml-px block w-1/100 min-w-0 flex-auto rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 pl-8.75 pr-3 text-sm leading-5.6 text-gray-700 transition-all ease-soft placeholder:text-gray-500 focus:border-fuchsia-300 focus:shadow-soft-primary-outline focus:outline-none focus:transition-shadow"
                placeholder="Type here..."
              />
            </div>
            {/* <SignOut /> */}
          </div>
          {/* <-- --> */}
          <ul className="flex list-none flex-row justify-end pl-0 md-max:w-full">
            <li className="flex items-center pl-4 xl:hidden">
              <SidebarHandler />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
