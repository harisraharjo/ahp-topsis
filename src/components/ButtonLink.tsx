import Link from "next/link"
import type { PropsWithChildren } from "react"
import type { UrlObject } from "url"
import { Button } from "~components/ui/button"

type ButtonLinkProps = PropsWithChildren<{
  destination: string
  query?: UrlObject["query"]
}>

export const ButtonLink = ({
  children,
  destination,
  query,
}: ButtonLinkProps) => (
  <Button
    type="button"
    variant="link"
    className="border border-slate-50 text-slate-50"
  >
    <Link href={{ pathname: `${destination}`, query }}>{children}</Link>
  </Button>
)
