"use client"

import { useRouter } from "next/navigation"
import { useState, useTransition } from "react"

export const AddCriteria = ({ operation }: { operation: "Add" | "Delete" }) => {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [isFetching, setIsFetching] = useState(false)

  // Create inline loading UI
  const isMutating = isFetching || isPending

  async function handleChange() {
    setIsFetching(true)
    // Mutate external data source
    await fetch(`http://localhost:3000/api/criteria`, {
      method: "DELETE",
      body: JSON.stringify({ msg: "Hello from add criteria" }),
    })
      .then((r) => {
        console.log(r)
        return r.json()
      })
      .then((r) => {
        console.log("RESP")
        console.log(r)
      })
      .catch((e) => console.error(e))
    setIsFetching(false)

    startTransition(() => {
      // Refresh the current route and fetch new data from the server without
      // losing client-side browser or React state.
      router.refresh()
    })
  }

  return (
    <>
      <button
        onClick={() => {
          handleChange()
            .then(() => console.log("Success"))
            .catch(() => console.log("NO"))
        }}
        style={{ opacity: !isMutating ? 1 : 0.7 }}
      >
        {operation}
      </button>
    </>
  )
}
