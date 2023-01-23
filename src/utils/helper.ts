export function objIsEmpty<T>(obj: { [key: string]: T }) {
  for (const _ in obj) {
    return false
  }

  return true
}
