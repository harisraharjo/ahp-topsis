import Image from "next/image"
import logo from "@public/logo-ct.png"

import { PATHS } from "../routeData"
import { SidebarItem } from "./Item"

export const SidebarBody = () => (
  <>
    <Logo />
    <div className="block h-sidenav max-h-screen w-auto grow basis-full items-center overflow-auto">
      <ul className="mb-0 flex flex-col pl-0">
        <SidebarItems />
      </ul>
    </div>
  </>
)

const Logo = () => (
  <>
    <div className="h-19.5">
      {/* <i className="fas fa-times absolute top-0 right-0 hidden cursor-pointer p-4 text-slate-400 opacity-50 xl:hidden"></i> */}
      <a
        className="m-0 block whitespace-nowrap px-8 py-6 text-sm text-slate-700"
        href="#"
      >
        <Image
          src={logo}
          className="ease-nav-brand inline h-full max-h-8 w-auto max-w-full transition-all duration-200"
          alt="main_logo"
          width={500}
          height={500}
        />
        <span className="ease-nav-brand ml-1 font-semibold transition-all duration-200">
          SMP Negeri 1 Waru
        </span>
      </a>
    </div>

    <hr className="mt-0 h-px bg-transparent bg-gradient-to-r from-transparent via-black/40 to-transparent" />
  </>
)

const SidebarItems = () => (
  <>
    {PATHS.map((path) => (
      <SidebarItem key={path.href} {...path}>
        <span className="pointer-events-none ml-1 opacity-100 duration-300 ease-soft">
          {path.title}
        </span>
      </SidebarItem>
    ))}
  </>
)
