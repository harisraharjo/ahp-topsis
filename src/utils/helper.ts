export function objIsEmpty<T>(obj: { [key: string]: T }) {
  for (const _ in obj) {
    return false
  }

  return true
}

// export type BuildArrayMinLength<
//   T,
//   N extends number,
//   Current extends readonly T[],
// > = Current["length"] extends N
//   ? [...Current, ...T[]]
//   : BuildArrayMinLength<T, N, [...Current, T]>

// export type ArrayMinLength<T, N extends number> = BuildArrayMinLength<T, N, []>

// type KeysUnder<T, A extends (keyof T)[]> = T extends object
//   ? {
//       [P in keyof T]: P extends string
//         ? A["length"] extends 1
//           ? keyof T
//           : KeysUnder<T[P], [...A[P], T[P]]>
//         : never
//     }[keyof T]
//   : never

// export type Dot<
//   T,
//   N extends number,
//   A extends (keyof T)[],
// > = BuildArrayMinLength<KeysUnder<T, A>, N, []>
