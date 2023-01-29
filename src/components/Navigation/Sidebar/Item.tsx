"use client"

import Link from "next/link"
import type { PropsWithChildren, ReactElement } from "react"
import type { PATH } from "./routeData"
import { Svg } from "@components/Svg"
// import DI from "../../../../public/DashboardIcon.svg"
import { useSelectedLayoutSegment } from "next/navigation"

type ActiveLink =
  "shadow-soft-xl rounded-lg bg-white font-semibold text-slate-700"
type ActiveSVG = "bg-gradient-to-tl from-purple-700 to-pink-500"

const activeStyles: { link: ActiveLink; svg: ActiveSVG } = {
  link: "shadow-soft-xl rounded-lg bg-white font-semibold text-slate-700",
  svg: "bg-gradient-to-tl from-purple-700 to-pink-500",
}

type SidebarItemProps = PropsWithChildren<PATH>
export const SidebarItem = ({
  href,
  children,
  slug,
  title,
}: SidebarItemProps) => {
  const segment = useSelectedLayoutSegment()
  const isActive = segment === slug
  // TODO: SVG PAKAI SPRITE. Terakhir aja
  return (
    <li className="mt-0.5 w-full">
      <Link
        className={`ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap py-2.7 px-4 text-sm transition-colors ${
          isActive ? activeStyles.link : ""
        }`}
        href={href}
      >
        <Svg
          className={`mr-2 h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center shadow-soft-2xl xl:p-2.5 ${
            isActive ? activeStyles.svg : ""
          }`}
        >
          <use xlinkHref={`#${title}Icon`} />
        </Svg>
        {children}
      </Link>
    </li>
  )
}
