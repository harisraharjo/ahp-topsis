"use client"

import { type PropsWithChildren, useState } from "react"
import type { Mode } from "./PanelProvider"
import { PanelProvider } from "./PanelProvider"

type Props = PropsWithChildren
export const Panel = ({ children }: Props) => {
  const mode = useState<Mode>("view")
  return (
    <>
      <button
        className="capitalize"
        onClick={() => {
          console.log("CHANGE")
          mode[1]((prev) => (prev === "edit" ? "view" : "edit"))
        }}
      >
        {mode[0]}
      </button>
      {/* <button>Compare</button> */}
      <PanelProvider mode={mode}>{children}</PanelProvider>
    </>
  )
}
