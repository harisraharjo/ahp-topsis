"use client"

import { api } from "@utils"
import { useState } from "react"
import { QueryClient } from "@tanstack/react-query"

export const AddCriteria = ({ operation }: { operation: "Add" | "Delete" }) => {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <>
      <button
        onClick={() => {
          api.criteria.removeCriteria
            .mutate({
              msg: "Hello from add criteria",
            })
            .then((r) => {
              console.log(r)
            })
            .catch((e) => console.log(e))
        }}
      >
        {operation}
      </button>
    </>
  )
}
