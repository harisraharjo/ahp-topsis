import type { LegacyRef, ReactNode, SVGProps } from "react"

type GroupProps = {
  /** Top offset applied to `<g/>`. */
  top?: number
  /** Left offset applied to `<g/>`. */
  left?: number
  /** Override `top` and `left` to provide the entire `transform` string. */
  transform?: string
  children?: ReactNode
  /** ref to underlying `<g/>`. */
  innerRef?: LegacyRef<SVGGElement>
}

export const Group = ({
  top = 0,
  left = 0,
  transform,
  children,
  innerRef,
  ...restProps
}: GroupProps & Omit<SVGProps<SVGGElement>, "ref">) => (
  <g
    ref={innerRef}
    transform={transform || `translate(${left}, ${top})`}
    {...restProps}
  >
    {children}
  </g>
)
