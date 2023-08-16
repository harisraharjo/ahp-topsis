import {
  deleteRows,
  insertRows,
  selectAllFrom,
  selectRows,
  updateRow,
} from "../query/utils"

import type { DestructureQueryValue, InsertValue, QueryValue } from "../utils"

export const createCriteria = (criteria: InsertValue<"Criteria">) =>
  insertRows("Criteria", criteria)
    .executeTakeFirstOrThrow()
    // .then((r) =>
    //   r.insertId ? selectCriteria(r.insertId as unknown as number) : undefined,
    // )

export const selectCriteria = (
  id: DestructureQueryValue<"Criteria", "id", "select">,
) => selectRows("Criteria", "id", "=", id)


export const selectAllCriteria = () =>
  selectAllFrom("Criteria")//.where("parentId", "is not", null)

export const deleteCriteria = (
  id: DestructureQueryValue<"Criteria", "id", "update">,
) => deleteRows("Criteria", "id", "=", id)

export const updateCriteria = (
  criteria: QueryValue<"Criteria", "update", "id">,
) => updateRow("Criteria", "id", criteria)
