"use client"

export const AddCriteria = ({ operation }: { operation: "Add" | "Delete" }) => {
  return (
    <>
      <button
        onClick={() => {
          console.log(`${operation} Criteria`)
        }}
      >
        {operation}
      </button>
    </>
  )
}
