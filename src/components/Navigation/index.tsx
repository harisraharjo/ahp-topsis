import { forwardRef, useState } from "react"
import type { ComponentPropsWithRef } from "react"
import { Sidebar } from "./Sidebar"
import { Navbar } from "./Navbar"

const Hamburger = () => (
  <li className="flex items-center pl-4 xl:hidden">
    <a
      className="ease-nav-brand block p-0 text-sm text-slate-500 transition-all"
      // sidenav-trigger
    >
      <div className="w-4.5 overflow-hidden">
        <i className="relative mb-0.75 block h-0.5 rounded-sm bg-slate-500 transition-all ease-soft"></i>
        <i className="relative mb-0.75 block h-0.5 rounded-sm bg-slate-500 transition-all ease-soft"></i>
        <i className="relative block h-0.5 rounded-sm bg-slate-500 transition-all ease-soft"></i>
      </div>
    </a>
  </li>
)

export const Navigation = () => {
  const [first, setfirst] = useState()
  return (
    <>
      <Sidebar />
      <Navbar hamburger={<Hamburger />} />
    </>
  )
}

type SidebarSwitch = Omit<
  ComponentPropsWithRef<"button">,
  | "children"
  | "type"
  | "aria-expanded"
  | "aria-label"
  | "Toggle sidenav"
  | "className"
>

export const SidebarSwitch = forwardRef<HTMLButtonElement, SidebarSwitch>(
  ({ onClick, ...props }, ref) => {
    return (
      <button
        type="button"
        aria-expanded="false"
        aria-label="Toggle sidebar"
        onClick={onClick}
        className="text-4xl text-white focus:outline-none"
        ref={ref}
        {...props}
      >
        &#8801;
      </button>
    )
  },
)

SidebarSwitch.displayName = "SidebarSwitch"

// export {}
