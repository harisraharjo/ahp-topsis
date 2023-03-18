"use client"

import { useCallback, useState } from "react"

export type DialogType = "add" | "edit"
export function useMutationDialog(dialogTrigger: () => void, type: DialogType) {
  const [dialogType, setDialogType] = useState<DialogType>(type)

  const openDialog = useCallback(
    (type: DialogType) => {
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
