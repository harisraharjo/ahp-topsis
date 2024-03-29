import {
  insertRows,
  selectAllFrom,
  selectRows,
  updateRow,
  updateRows,
} from "../query/utils"

import type { DestructureQueryValue, InsertValue, QueryValue } from "../utils"

export const createCriteria = (criteria: InsertValue<"Criteria">) =>
  insertRows("Criteria", criteria) //.executeTakeFirstOrThrow()
// .then((r) =>
//   r.insertId ? selectCriteria(r.insertId as unknown as number) : undefined,
// )

export const selectCriteria = (
  id: DestructureQueryValue<"Criteria", "id", "select">,
) => selectRows("Criteria", "id", "=", id)

export const selectAllCriteria = (
  userId: DestructureQueryValue<"Criteria", "userId", "select">,
) =>
  selectAllFrom("Criteria").where(({ eb }) =>
    eb("parentId", "is not", null).and("userId", "=", userId),
  )

export const deleteCriteria = (
  id: DestructureQueryValue<"Criteria", "id", "update">,
  parentId: DestructureQueryValue<"Criteria", "parentId", "update">,
) => {
  const children = updateRows("Criteria", { parentId: null }, ({ eb }) =>
    eb("id", "=", id).or("parentId", "=", id),
  )
  const siblings = updateRows("Criteria", { weight: 0 }, ({ eb }) =>
    eb("parentId", "=", parentId),
  )
  // TODO: DELETE ZOMBIE NODES VIA CRON JOBS

  return [children, siblings]
}

export const updateCriteria = (
  criteria: QueryValue<"Criteria", "update", "id">,
) => updateRow("Criteria", "id", criteria)

export const getSiblings = (
  id: DestructureQueryValue<"Criteria", "id", "update">,
  userId: DestructureQueryValue<"Criteria", "userId", "select">,
) =>
  selectAllFrom("Criteria").where(({ eb }) =>
    eb("parentId", "=", id).and("userId", "=", userId),
  )
