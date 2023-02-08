import { insertValuesInto, selectTableBy, updateTableBy } from "./utils"
import { db } from "../config"
import type { DestructureQueryValue, QueryValues } from "../utils"

export const createCriteria = (criteria: QueryValues<"Criteria", "insert">) =>
  insertValuesInto(db, "Criteria", criteria)
    .executeTakeFirstOrThrow()
    .then((r) =>
      selectTableBy(
        db,
        "Criteria",
        "id",
        r.insertId as unknown as number,
      ).executeTakeFirst(),
    )

export const deleteCriteria = (
  id: DestructureQueryValue<"Criteria", "id", "update">,
) => db.deleteFrom("Criteria").where("Criteria.id", "=", id).execute()

export const updateCriteria = (
  criteria: Partial<QueryValues<"Criteria", "update">>,
) => {
  const { id, ...criteriaData } = criteria
  if (!id) throw new Error("Criteria not found")

  const query = updateTableBy(db, "Criteria", "id", criteriaData)

  return query
    .executeTakeFirstOrThrow()
    .then(() =>
      selectTableBy(db, "Criteria", "id", id).executeTakeFirstOrThrow(),
    )
}
