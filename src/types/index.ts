export type FunctionPropertyNames<T> = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  [K in keyof T]: T[K] extends Function ? K : never
}[keyof T]

export type PromiselikeFn<T> = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ...args: any
) => PromiseLike<T>
