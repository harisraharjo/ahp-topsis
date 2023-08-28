import type { RawQueryValue } from "~server/db/utils"

import { Surface } from "./Surface"
import { Hierarchy } from "./Hierarchy"
import type { PropsWithChildren } from "react"
import { constructHierarchy } from "~utils/helper"

export type Criterias = Awaited<RawQueryValue<"Criteria", "update">[]>

export const Playground = ({
  children,
  data,
}: PropsWithChildren<{ data: Criterias }>) => {
  const hierarchyData = constructHierarchy(data)

  return (
    <div className="h-screen w-full overflow-y-hidden" id="svgRoot">
      {children}
      <Surface>
        <Hierarchy key={Math.random()} data={hierarchyData} />
      </Surface>
    </div>
  )
}
