export function objIsEmpty<T>(obj: { [key: string]: T }) {
  for (const _ in obj) {
    return false
  }

  return true
}

import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

type Id = string | number
type Document = { id: Id; parentId: Id | null; name: string, isBenefit: 0 | 1 }
type Node<T extends Document> = Document & { children?: Node<T>[] }
type Goal<Data extends Document> = {
  id: 0
  parentId: -1
  name: string
  children: Node<Data>[]
  isBenefit: 0 | 1
}

export function constructHierarchy<Data extends Document[]>(
  data: Data,
  goal = "Siswa Teladan",
): Node<Goal<Data[number]>> {
  type IDMap = Record<Document["id"], number>
  const idMapping = data.reduce((acc, el, i) => {
    acc[el.id] = i

    return acc
  }, {} as IDMap)

  const nodes = [] as Node<Data[number]>[]
  data.forEach((el) => {
    const isRoot = el.parentId === 0
    if (isRoot) {
      nodes.push(el)
      return
    }

    const parentId = el.parentId
    
    // honestly parentId will never be null because the query is filtered
    const arrayIndex = idMapping[parentId!]

    const parentEl = data[arrayIndex as number] as Node<Data[number]>

    Array.isArray(parentEl.children)
      ? parentEl.children.push(el)
      : (parentEl.children = [el])
  })

  return {
    id: 0,
    parentId: -1,
    name: goal,
    children: nodes,
    isBenefit: 1
  }
}