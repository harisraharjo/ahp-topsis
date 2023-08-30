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
type Document = { id: Id; parentId: Id | null; name: string; isBenefit: 0 | 1 }
type Node<T extends Document> = Document & { children?: Node<T>[] }

export const GOAL = "Goal" as const
export const GOAL_ID = 0 as const

type Goal<Data extends Document> = {
  id: typeof GOAL_ID
  parentId: -1
  name: typeof GOAL
  children: Node<Data>[]
  isBenefit: 0
}

export function constructHierarchy<Data extends Document[]>(
  data?: Data,
): Goal<Data[number]> {
  type IDMap = Record<Document["id"], number>

  const nodes = [] as Node<Data[number]>[]
  const result: Goal<Data[number]> = {
    id: 0,
    parentId: -1,
    name: GOAL,
    children: nodes,
    isBenefit: 0,
  }

  if (!data) return result

  const idMapping = data.reduce((acc, el, i) => {
    acc[el.id] = i

    return acc
  }, {} as IDMap)

  let i
  const length = data.length
  for (i = 0; i < length; i++) {
    const el = data[i] as Document
    const isRoot = el.parentId === 0
    if (isRoot) {
      nodes.push(el)
      continue
    }

    const parentId = el.parentId

    // parentId will never be null because the query is filtered
    const arrayIndex = idMapping[parentId!]

    const parentEl = data[arrayIndex as number] as Node<Data[number]>

    Array.isArray(parentEl.children)
      ? parentEl.children.push(el)
      : (parentEl.children = [el])
  }

  // data.forEach((el) => {
  //   const isRoot = el.parentId === 0
  //   if (isRoot) {
  //     nodes.push(el)
  //     return
  //   }

  //   const parentId = el.parentId

  //   // parentId will never be null because the query is filtered
  //   const arrayIndex = idMapping[parentId!]

  //   const parentEl = data[arrayIndex as number] as Node<Data[number]>

  //   Array.isArray(parentEl.children)
  //     ? parentEl.children.push(el)
  //     : (parentEl.children = [el])
  // })

  result.children = nodes

  return result
}
