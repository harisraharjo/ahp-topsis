export type FunctionPropertyNames<T> = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  [K in keyof T]: T[K] extends Function ? K : never
}[keyof T]

export type PromiselikeFn<T> = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ...args: any
) => PromiseLike<T>

export type ExtractMandatoryKeys<T> = {
  [K in keyof T as Exclude<K, undefined | null> extends T[K] ? K : never]: T[K]
}

export type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] }

export type BuildArrayMinLength<
  Data,
  N extends number,
  Current extends readonly Data[],
> = Current["length"] extends N
  ? [...Current, ...Data[]]
  : BuildArrayMinLength<Data, N, [...Current, Data]>

export type ArrayMinLength<Data, N extends number> = BuildArrayMinLength<
  Data,
  N,
  []
>

export type Invalid<T> = TypeError & { __errorMessage: T }

export type IsUnique<Input extends readonly unknown[]> =
  Input extends readonly [infer X, ...infer Rest]
    ? X extends Rest[number]
      ? Invalid<[X, "is repeated"]>
      : IsUnique<Rest>
    : true

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
