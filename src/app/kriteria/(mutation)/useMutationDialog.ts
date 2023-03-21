"use client"

import { useCallback, useRef, useState } from "react"

type Callback<T extends DialogType> = (
  data: T extends "edit" ? string : string[],
) => void
type OpenDialog = (type: DialogType, callback: Callback<typeof type>) => void
export type DialogType = "add" | "edit"
export function useMutationDialog(dialogTrigger: () => void, type: DialogType) {
  const [dialogType, setDialogType] = useState<DialogType>(type)
  // const callbackRef = useRef<Callback | null>(null)

  const openDialog = useCallback<OpenDialog>(
    (type: DialogType, callback) => {
      // callbackRef.current = callback
      setDialogType(type)
      dialogTrigger()
    },
    // dialogTrigger is just a setState function
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  return {
    openDialog,
    dialogType,
  }
}
