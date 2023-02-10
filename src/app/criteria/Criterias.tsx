import { selectAllCriteria } from "@server/db"

export const Criterias = async () => {
  const criterias = selectAllCriteria().execute()

  return (
    <>
      {(await criterias).map((criteria) => (
        <div key={criteria.id}>
          {criteria.id}
          {criteria.name}
          {criteria.parentId}
        </div>
      ))}
    </>
  )
}
