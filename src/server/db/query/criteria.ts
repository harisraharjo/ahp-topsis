import type { Criteria } from "../types"
import { insertValuesInto, selectTableBy } from "./utils"
import { db } from "../config"

export const createCriteria = (criteria: Criteria) =>
  insertValuesInto(db, "Criteria", criteria)
    .executeTakeFirstOrThrow()
    .then(() =>
      selectTableBy(
        db,
        "Criteria",
        "id",
        criteria.id,
      ).executeTakeFirstOrThrow(),
    )
