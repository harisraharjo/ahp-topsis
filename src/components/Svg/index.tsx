import type { ReactElement, SVGProps } from "react"

type SvgProps = Omit<SVGProps<SVGSVGElement>, "id" | "children"> & {
  children: ReactElement<SVGUseElement>
}
export const Svg = ({ children, ...props }: SvgProps) => {
  return (
    <svg {...props}>
      <>{children}</>
    </svg>
  )
}
