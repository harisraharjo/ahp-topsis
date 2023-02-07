import { insertValuesInto, selectTableBy } from "./utils"
import { db } from "../config"
import type { QueryValues } from "../utils"

export const createCriteria = (criteria: QueryValues<"Criteria", "insert">) =>
  insertValuesInto(db, "Criteria", criteria)
    .executeTakeFirstOrThrow()
    .then((r) =>
      selectTableBy(
        db,
        "Criteria",
        "id",
        r.insertId as unknown as number,
      ).executeTakeFirstOrThrow(),
    )
