import type { PropsWithChildren } from "react"
import { useContext } from "react"
import type { HierarchyPointNode } from "d3-hierarchy"
import { createContext } from "react"
import type { TreeNode } from "./Tree"

export function useTreeContext() {
  return useContext(context)
}
type TreeContext = HierarchyPointNode<TreeNode>
export const context = createContext<TreeContext | null>(null)

export type TreeContextProviderProps = PropsWithChildren<{
  tree: TreeContext
}>
export const TreeProvider = ({ children, tree }: TreeContextProviderProps) => (
  <TreeContextProvider value={tree}>{children}</TreeContextProvider>
)

const TreeContextProvider = context.Provider
