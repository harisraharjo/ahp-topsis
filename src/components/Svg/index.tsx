import type { ComponentPropsWithRef, ReactElement } from "react"
import { forwardRef } from "react"

type SvgProps = Omit<ComponentPropsWithRef<"svg">, "id" | "children"> & {
  children: ReactElement<SVGUseElement>
}
export const Svg = forwardRef<SVGSVGElement, SvgProps>(
  ({ children, ...props }, ref) => (
    <svg ref={ref} {...props}>
      <>{children}</>
    </svg>
  ),
)

Svg.displayName = "SvgComponent"
