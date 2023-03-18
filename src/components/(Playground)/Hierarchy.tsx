"use client"

import { LinearGradient } from "@visx/gradient"
import { LinkHorizontal } from "@visx/shape"

import { useMutationDialogContext } from "src/app/criteria/(mutation)/contexts"
import type { TreeDescendant, TreeEdge, TreeHead, TreeProps } from "~components"

import { Tree } from "~components"

export type TreeNode = {
  id: number | string
  name: string
  isExpanded?: boolean
  children?: TreeNode[]
  parentId: number | string | null
}

// export const Container = ({ children }: PropsWithChildren) => {
//   return (
//     <ModalTrigger
//       isDismissable
//       triggerElement={(close) => (
//         <PlaygroundContextProvider value={close}>
//           {children}
//         </PlaygroundContextProvider>
//       )}
//     >
//       {(overlayProps, overlayRef, close) => (
//         <SVGDialog overlayRef={overlayRef} overlayProps={overlayProps}>
//           <h1>Hello Dialog</h1>
//           {/* <button onClick={close}>Close</button> */}
//         </SVGDialog>
//       )}
//     </ModalTrigger>
//   )
// }

type HierarchyProps<T extends TreeNode> = Omit<
  TreeProps<T>,
  "Edge" | "Descendant" | "Head"
>
export const Hierarchy = <T extends TreeNode>({
  height,
  width,
  data,
}: HierarchyProps<T>) => {
  return (
    <Tree
      width={width}
      height={height}
      data={data}
      Edge={Edge}
      Head={Head}
      Descendant={Descendant}
    />
  )
}

const Edge: TreeEdge = ({ data }) => (
  <LinkHorizontal
    data={data}
    // percent={stepPercent}
    stroke="rgb(254,110,158,0.6)"
    strokeWidth="1"
    fill="none"
  />
)

const Head: TreeHead = ({ redraw }) => {
  return (
    <>
      <LinearGradient id="links-gradient" from="#fd9b93" to="#fe6e9e" />
      <circle
        r={50}
        fill="url('#links-gradient')"
        onClick={() => {
          // node.data.isExpanded = !Boolean(node.data.isExpanded)
          redraw()
        }}
      />
    </>
  )
}

const Descendant: TreeDescendant = ({ data, redraw }) => {
  const context = useMutationDialogContext()

  const width = 50,
    height = width

  return (
    <rect
      // id={`rect-${key}`}
      height={height}
      width={width}
      y={-height / 2}
      x={-width / 2}
      fill="#272b4d"
      stroke={data.children ? "#03c0dc" : "#26deb0"}
      strokeWidth={1}
      strokeDasharray={data.children ? "0" : "2,2"}
      strokeOpacity={data.children ? 1 : 0.6}
      rx={data.children ? 2 : 15}
      onClick={() => {
        context?.openDialog("add")
        // data.isExpanded = !Boolean(data.isExpanded)

        // const newData = {
        //   id: 93,
        //   parentId: data.id,
        //   name: "NasionalB",
        //   scale: null,
        //   weight: 1.23,
        // }

        // Array.isArray(data.children)
        //   ? data.children.push(newData)
        //   : (data.children = [newData])

        // redraw()
      }}
    />
  )
}
