"use client"

import { createContext, useContext } from "react"
import type { DialogType } from "./useMutationDialog"

export function useMutationDialogContext() {
  return useContext(MutationDialogContext)
}

export type MutationDialogProviderProps = {
  openDialog: (type: DialogType) => void
  dialogType: DialogType
}

const MutationDialogContext = createContext<
  MutationDialogProviderProps | undefined
>(undefined)
export const MutationDialogContextProvider = MutationDialogContext.Provider
