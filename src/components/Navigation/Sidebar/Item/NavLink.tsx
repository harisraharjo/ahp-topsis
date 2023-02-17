import Link from "next/link"
import type { PropsWithChildren } from "react"

import { Svg, type SvgProps } from "~components/Svg"
import type { PATH } from "../../routeData"

type ActiveLink =
  "shadow-soft-xl rounded-lg bg-white font-semibold text-slate-700"
type ActiveSVG = "bg-gradient-to-tl from-purple-700 to-pink-500"

const activeStyles: { link: ActiveLink; svg: ActiveSVG } = {
  link: "shadow-soft-xl rounded-lg bg-white font-semibold text-slate-700",
  svg: "bg-gradient-to-tl from-purple-700 to-pink-500",
}

export type NavLinkProps = PropsWithChildren<Pick<PATH, "href">> & {
  isActive: boolean
  icon: SvgProps["children"]
}
export const NavLink = ({ href, children, isActive, icon }: NavLinkProps) => (
  <li className="mt-0.5 w-full">
    <Link
      className={`flex items-center whitespace-nowrap py-2.7 px-4 text-sm transition-colors ${
        isActive ? activeStyles.link : ""
      }`}
      href={href}
    >
      <Svg
        className={`mr-2 h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center shadow-soft-2xl xl:p-2.5 ${
          isActive ? activeStyles.svg : ""
        }`}
      >
        {icon}
      </Svg>
      {children}
    </Link>
  </li>
)
