"use client"

import type { PropsWithChildren } from "react"
import { useEffect, useState } from "react"
import { useRef } from "react"
import { createPortal } from "react-dom"

type PortalProps = PropsWithChildren<{
  id: string
}>
const Portal = ({ children, id }: PortalProps) => {
  const ref = useRef<Element>()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    ref.current = document.getElementById(id) as Element
    setMounted(true)
  }, [id])

  return <>{mounted && createPortal(children, ref.current as Element)}</>
}

export default Portal
