import {
  insertRows,
  selectAllFrom,
  selectRows,
  updateRow,
  updateRows,
} from "../query/utils"

import type { DestructureQueryValue, InsertValue, QueryValue } from "../utils"

export const createCriteria = (criteria: InsertValue<"Criteria">) =>
  insertRows("Criteria", criteria).executeTakeFirstOrThrow()
// .then((r) =>
//   r.insertId ? selectCriteria(r.insertId as unknown as number) : undefined,
// )

export const selectCriteria = (
  id: DestructureQueryValue<"Criteria", "id", "select">,
) => selectRows("Criteria", "id", "=", id)

export const selectAllCriteria = () =>
  selectAllFrom("Criteria").where("parentId", "is not", null)

export const deleteCriteria = (
  id: DestructureQueryValue<"Criteria", "id", "update">,
) => {
  return updateRows("Criteria", { parentId: null }, ({ cmpr, or, and }) =>
    and([or([cmpr("id", "=", id), cmpr("parentId", "=", id)])]),
  )
}

export const updateCriteria = (
  criteria: QueryValue<"Criteria", "update", "id">,
) => updateRow("Criteria", "id", criteria)

export const getSiblings = (
  id: DestructureQueryValue<"Criteria", "id", "update">,
) => selectAllCriteria().where("parentId", "=", id)
