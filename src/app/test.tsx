"use client"

import { useSelectedLayoutSegment } from "next/navigation"

export const Test = () => {
  const loginSegments = useSelectedLayoutSegment("auth")
  console.log("SEGMEN", loginSegments)

  return null
}
