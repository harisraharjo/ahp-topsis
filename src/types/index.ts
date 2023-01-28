// import type { NextPage } from "next"

export type FunctionPropertyNames<T> = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  [K in keyof T]: T[K] extends Function ? K : never
}[keyof T]

// export type Page = NextPage & {
//   layout:
// }
