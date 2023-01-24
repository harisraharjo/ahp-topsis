import Image from "next/image"
import logo from "@public/logo-ct.png"
import Link from "next/link"
import { useRouter } from "next/router"
import { type PropsWithChildren } from "react"

// SERVER COMPONENT
export const Sidebar = () => {
  return (
    <aside className="max-w-62.5 ease-nav-brand z-990 fixed inset-y-0 my-4 ml-4 block w-full -translate-x-full flex-wrap items-center justify-between overflow-y-auto rounded-2xl border-0 bg-white p-0 antialiased shadow-none transition-transform duration-200 xl:left-0 xl:translate-x-0 xl:bg-transparent">
      <div className="h-19.5">
        <i className="fas fa-times absolute top-0 right-0 hidden cursor-pointer p-4 text-slate-400 opacity-50 xl:hidden"></i>
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
            Soft UI Dashboard
          </span>
        </a>
      </div>

      <hr className="mt-0 h-px bg-transparent bg-gradient-to-r from-transparent via-black/40 to-transparent" />

      <div className="h-sidenav block max-h-screen w-auto grow basis-full items-center overflow-auto">
        <ul className="mb-0 flex flex-col pl-0">
          {/* CLIENT COMPONENT */}
          <SidenavItemContainer />
        </ul>
      </div>
    </aside>
  )
}

type PATH = {
  title: string
  href: string
}

const PATHS: readonly PATH[] = [
  {
    title: "Dashboard",
    // icon: <HomeIcon />,
    href: "/",
  },
  {
    title: "Entries",
    // icon: <StatusIcon />,
    href: "/entries",
  },
]

const activeStyles: { link: ActiveLink; svg: ActiveSVG } = {
  link: "shadow-soft-xl rounded-lg bg-white font-semibold text-slate-700",
  svg: "bg-gradient-to-tl from-purple-700 to-pink-500",
}

// CLIENT COMPONENT
const SidenavItemContainer = () => {
  const { asPath } = useRouter()

  return (
    <>
      {PATHS.map((data) => (
        <SidebarItem
          key={data.href}
          activeLink={asPath === data.href ? activeStyles.link : ""}
          activeSVG={asPath === data.href ? activeStyles.svg : ""}
          href={data.href}
          title={data.title}
        />
      ))}
    </>
  )
}

// Server COMPONENT
const SidebarItemName = ({ children }: { children: string }) => (
  <span className="ease-soft pointer-events-none ml-1 opacity-100 duration-300">
    {children}
  </span>
)

type ActiveLink =
  "shadow-soft-xl rounded-lg bg-white font-semibold text-slate-700"
type ActiveSVG = "bg-gradient-to-tl from-purple-700 to-pink-500"

type SidenavItemProps = PropsWithChildren<
  {
    activeLink: ActiveLink | ""
    activeSVG: ActiveSVG | ""
    title: string
    // icon: SVGProps<SVGUseElement>
  } & PATH
>

import "../../../../public/DashboardIcon.svg"
import { Svg } from "@components/Svg"

const SidebarItem = ({
  activeLink = "",
  activeSVG = "",
  // icon,
  // children,
  href,
  title,
}: //   ...props
SidenavItemProps) => {
  return (
    <li className="mt-0.5 w-full">
      <Link
        className={`py-2.7 ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap px-4 text-sm transition-colors ${activeLink}`}
        href={href}
      >
        <Svg
          className={`shadow-soft-2xl mr-2 h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5 ${activeSVG}`}
        >
          <use xlinkHref={`#${title}Icon`} />
        </Svg>
        <SidebarItemName>{title}</SidebarItemName>
      </Link>
    </li>
  )
}
