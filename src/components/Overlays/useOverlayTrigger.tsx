"use client"

import type { Dispatch, SetStateAction } from "react"
import { useMemo, useState } from "react"

export type Trigger = {
  toggle: () => void
  setIsOpen: Dispatch<SetStateAction<boolean>>
  isOpen: boolean
}

export function useOverlayTrigger(defaultState = false) {
  const [isOpen, setIsOpen] = useState(defaultState),
    trigger = useMemo(
      () => ({
        toggle: () => setIsOpen((prev) => !prev),
        setIsOpen,
      }),
      [],
    ) as Trigger

  trigger.isOpen = isOpen

  return trigger
}
