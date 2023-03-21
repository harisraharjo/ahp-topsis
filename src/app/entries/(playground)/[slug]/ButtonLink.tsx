import Link from "next/link"
import type { PropsWithChildren } from "react"
import type { UrlObject } from "url"

// href: string | UrlObject
type ButtonLinkProps = PropsWithChildren<{
  destination: string
  className: string
  query?: UrlObject["query"]
}>
export const ButtonLink = ({
  children,
  destination,
  className,
  query,
}: ButtonLinkProps) => (
  <Link
    href={{ pathname: `/entries${destination}`, query }}
    className={className}
  >
    {children}
  </Link>
)
