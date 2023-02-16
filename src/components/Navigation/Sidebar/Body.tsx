import Image from "next/image"
import logo from "@public/logo-ct.png"

import { PATHS } from "../routeData"
import { SidebarItem } from "./Item"
import Link from "next/link"

export const SidebarBody = () => (
  <>
    <Logo />
    {/* h-sidenav */}
    <div className="max-h-screen w-auto grow basis-full items-center overflow-auto">
      <ul className="flex flex-col">
        <SidebarItems />
      </ul>
    </div>
  </>
)

const Logo = () => (
  <>
    <div className="h-19.5">
      <Link
        className="block whitespace-nowrap px-4 py-6 text-sm text-slate-700"
        href="/"
      >
        <Image
          src={logo}
          className="inline h-full max-h-8 w-auto max-w-full transition-all duration-200"
          alt="main_logo"
          width={500}
          height={500}
        />
        <span className=" ml-1 font-semibold transition-all duration-200">
          SMP Negeri 1 Waru
        </span>
      </Link>
    </div>
    <hr className="h-px bg-transparent bg-gradient-to-r from-transparent via-black/40 to-transparent" />
  </>
)

// TODO: SVG PAKAI SPRITE (Terakhir)
const SidebarItems = () => (
  <>
    {PATHS.map((path) => (
      <SidebarItem
        key={path.href}
        {...path}
        icon={<use xlinkHref={`#${path.title}Icon`} />}
      >
        <span className="pointer-events-none ml-1 opacity-100 duration-300 ease-soft">
          {path.title}
        </span>
      </SidebarItem>
    ))}
  </>
)
