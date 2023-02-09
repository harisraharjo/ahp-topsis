import { insertValuesInto, selectTableBy, updateTableBy } from "./utils"
import { db } from "../config"
import type { DestructureQueryValue, QueryValues } from "../utils"

export const createCriteria = (criteria: QueryValues<"Criteria", "insert">) =>
  insertValuesInto(db, "Criteria", criteria)
    .executeTakeFirstOrThrow()
    .then((r) =>
      r.insertId ? selectCriteria(r.insertId as unknown as number) : undefined,
    )

export const selectCriteria = (
  id: DestructureQueryValue<"Criteria", "id", "select">,
) => selectTableBy(db, "Criteria", "id", id).executeTakeFirst()

export const deleteCriteria = (
  id: DestructureQueryValue<"Criteria", "id", "update">,
) => db.deleteFrom("Criteria").where("Criteria.id", "=", id).execute()

export const updateCriteria = (
  criteria: QueryValues<"Criteria", "update", "id">,
) => {
  const query = updateTableBy(db, "Criteria", "id", criteria)

  return query
    .executeTakeFirstOrThrow()
    .then(() =>
      selectTableBy(
        db,
        "Criteria",
        "id",
        criteria.id,
      ).executeTakeFirstOrThrow(),
    )
}
