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
