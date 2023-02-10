import {
  insertValuesInto,
  selectAllFrom,
  selectRowsBy,
  updateTableBy,
} from "./utils"
import { db } from "../config"
import type { DestructureQueryValue, QueryValues } from "../utils"

export const createCriteria = (criteria: QueryValues<"Criteria", "insert">) =>
  insertValuesInto("Criteria", criteria)
    .executeTakeFirstOrThrow()
    .then((r) =>
      r.insertId ? selectCriteria(r.insertId as unknown as number) : undefined,
    )

export const selectCriteria = (
  id: DestructureQueryValue<"Criteria", "id", "select">,
) => selectRowsBy("Criteria", "id", "=", id)

export const selectAllCriteria = () => selectAllFrom("Criteria")

export const deleteCriteria = (
  id: DestructureQueryValue<"Criteria", "id", "update">,
) => db.deleteFrom("Criteria").where("Criteria.id", "=", id)

export const updateCriteria = (
  criteria: QueryValues<"Criteria", "update", "id">,
) => updateTableBy("Criteria", "id", criteria)
