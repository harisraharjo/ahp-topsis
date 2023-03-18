import type { PropsWithChildren } from "react"
import { createPortal } from "react-dom"

type PortalProps = PropsWithChildren<{
  container: Element | DocumentFragment
}>
const Portal = ({ children, container }: PortalProps) =>
  createPortal(children, container)

export default Portal
