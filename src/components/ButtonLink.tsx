import Link from "next/link"
import type { PropsWithChildren } from "react"
import type { UrlObject } from "url"
import { Button } from "@components/ui/button"

type ButtonLinkProps = PropsWithChildren<{
  destination: string
  query?: UrlObject["query"]
  className?: HTMLButtonElement["className"]
  replace?: true
}>

export const ButtonLink = ({
  children,
  destination,
  query,
  className = "",
  ...props
}: ButtonLinkProps) => (
  <Button type="button" variant="link" className={`text-slate-50 ${className}`}>
    <Link href={{ pathname: `${destination}`, query }} {...props}>
      {children}
    </Link>
  </Button>
)
