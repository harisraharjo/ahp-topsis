"use client"

// import { useEffect } from "react"
import { useHierarchyContext } from "../../(hierarchy)/Provider"

const Comparator = ({ slug }: { slug: string | number }) => {
  const d = useHierarchyContext()
  const siblings = d?.tree.find((n) => {
    return n.data.id == slug
  })?.parent?.children

  // useEffect(() => {
  //   return () => {
  //     console.log("THE EFF")
  //     d?.redraw()
  //   }
  // }, [])

  return (
    <div>
      {siblings?.map((s) => (
        <div key={s.data.id}> {s.data.name} </div>
      ))}
    </div>
  )
}

export default Comparator
