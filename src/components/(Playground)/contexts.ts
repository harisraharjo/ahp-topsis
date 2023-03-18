import { createContext, useContext } from "react"

export function usePlaygroundContext() {
  return useContext(PlaygroundContext)
}

export type DialogType = "add" | "edit"
export type OpenDialog = (type: DialogType) => void
const PlaygroundContext = createContext<OpenDialog | undefined>(undefined)
export const PlaygroundContextProvider = PlaygroundContext.Provider
