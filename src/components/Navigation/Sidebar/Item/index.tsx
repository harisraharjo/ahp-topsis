"use client"

import type { PATH } from "~components/Navigation/routeData"
import { useSelectedLayoutSegment } from "next/navigation"
import type { PropsWithChildren } from "react"
import { NavLink, type NavLinkProps } from "./NavLink"

type Props = PropsWithChildren<PATH> & { icon: NavLinkProps["icon"] }
export const SidebarItem = ({ href, children, slug, icon }: Props) => {
  const segment = useSelectedLayoutSegment()
  const isActive = segment === slug

  return (
    <NavLink href={href} isActive={isActive} icon={icon}>
      {children}
    </NavLink>
  )
}
