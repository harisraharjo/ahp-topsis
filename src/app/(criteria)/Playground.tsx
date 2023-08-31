import type { RawQueryValue } from "~server/db/utils"

import { Surface } from "./Surface"
import { Hierarchy } from "./Hierarchy"
import { constructHierarchy } from "~components/Tree"

export type Criterias = Awaited<RawQueryValue<"Criteria", "update">[]>

export const Playground = ({ data }: { data?: Criterias }) => {
  const hierarchyData = constructHierarchy(data)

  return (
    <div className="h-screen w-full overflow-y-hidden" id="svgRoot">
      <Surface>
        <Hierarchy key={Math.random()} data={hierarchyData} />
      </Surface>
    </div>
  )
}
