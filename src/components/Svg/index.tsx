import type { SVGProps } from "react"

export const Svg = ({
  children,
  ...props
}: Omit<SVGProps<SVGSVGElement>, "id">) => {
  return <svg {...props}>{children}</svg>
}
