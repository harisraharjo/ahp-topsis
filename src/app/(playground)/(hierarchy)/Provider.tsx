"use client"

import { useContext, createContext } from "react"
import type { HierarchyPointNode } from "d3-hierarchy"

import type { HierarchyNode } from "./Hierarchy"

// export type TreeProviderProps = PropsWithChildren<
//   {
//     data: HierarchyNode
//     accessor: Accessor<HierarchyNode>
//   } & Omit<UseTreeProps<HierarchyNode>, "root">
// >

// export const HierarchyProvider = ({
//   children,
//   data,
//   accessor,
//   size,
//   separation,
//   nodeSize,
// }: TreeProviderProps) => {
//   const [root] = useState(() => hierarchy(data, accessor))
//   const tree = useTree(root, size, separation, nodeSize)
//   const redraw = useForceUpdate()

//   return (
//     <HierarchyContextProvider value={{ tree, redraw }}>
//       {children}
//     </HierarchyContextProvider>
//   )
// }

export function useHierarchyContext() {
  return useContext(hierarchyContext)
}
const hierarchyContext = createContext<{
  tree: HierarchyPointNode<HierarchyNode>
  redraw: () => void
} | null>(null)
export const HierarchyContextProvider = hierarchyContext.Provider
