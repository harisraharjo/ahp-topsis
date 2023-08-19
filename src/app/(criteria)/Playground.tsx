import type { RawQueryValue } from "~server/db/utils"

import { Surface } from "./Surface"
import { Hierarchy } from "./(hierarchy)/Hierarchy"
import type { PropsWithChildren } from "react"
import { constructHierarchy } from "~utils/helper"


export type Criterias = Awaited<RawQueryValue<"Criteria", "update">[]>

const structure = {
    height: 900,
    width: 900,
    margin: { top: 20, left: 30, right: 30, bottom: 20 },
} as const
  

export const Playground = ({ children, data }: PropsWithChildren<{ data: Criterias }>) => {

  const hierarchyData = constructHierarchy(data)

  return (
    <div className="h-full w-full overflow-y-hidden" id="svgRoot">
      {children}
      <Surface
        height={900}
        width={900}
      >
        <Hierarchy
          key={Math.random()}
          width={
            structure.width - structure.margin.left - structure.margin.right
          }
          height={
            structure.height - structure.margin.top - structure.margin.bottom
          }
          data={hierarchyData}
        />
      </Surface>
    </div>

  )
}
