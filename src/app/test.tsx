"use client"
import { useMemo, useState } from "react"

export const Zoom = () => {
  const [update, setUpdate] = useState(false)
  const data = useMemo(() => {
    return { one: 999999 }
  }, [])
  useOuter(data)

  return (
    <>
      {String(update)}
      <button onClick={() => setUpdate((prev) => !prev)}>Render</button>
    </>
  )
}

const set = new Set()
function useOuter(param: { one: number }) {
  console.log("From Outer", param)
  set.add(param)
  console.log("Set data", set)
  const crt = create()

  return crt(param.one)
}

function create() {
  console.log("From Create")
  return (param: number) => useLogger(param)
}

function useLogger(param: number) {
  const [stata] = useState(() => {
    console.log("Create Expensive")
    return {
      expensive: true,
    }
  })

  console.log("From useLogger")
  console.log("Param", param)
  console.log("State", stata)
}
