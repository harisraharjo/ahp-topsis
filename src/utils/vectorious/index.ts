/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  type INDArray,
  type DType,
  type TypedArray,
  V_MAXDIMS,
  flatten,
  get_dtype,
  get_length,
  get_shape,
  get_strides,
  get_type,
  is_typed_array,
} from "./utils"

const inspectSymbol: unique symbol = Symbol.for("nodejs.util.inspect.custom")

class NDIter implements Iterator<number[]> {
  /**
   * @name x
   * @memberof NDIter.prototype
   * @type NDArray
   */
  public x: NDArray

  /**
   * @name shape
   * @memberof NDIter.prototype
   * @type Number[]
   */
  public shape: number[]

  /**
   * @name shapem1
   * @memberof NDIter.prototype
   * @type Number[]
   */
  public shapem1: number[]

  /**
   * @name strides
   * @memberof NDIter.prototype
   * @type Number[]
   */
  public strides: number[]

  /**
   * @name backstrides
   * @memberof NDIter.prototype
   * @type Number[]
   */
  public backstrides: number[]

  /**
   * @name length
   * @memberof NDIter.prototype
   * @type Number
   */
  public length: number

  /**
   * @name lengthm1
   * @memberof NDIter.prototype
   * @type Number
   */
  public lengthm1: number

  /**
   * @name nd
   * @memberof NDIter.prototype
   * @type Number
   */
  public nd: number

  /**
   * @name ndm1
   * @memberof NDIter.prototype
   * @type Number
   */
  public ndm1: number

  /**
   * @name index
   * @memberof NDIter.prototype
   * @type Number
   */
  public index: number

  /**
   * @name coords
   * @memberof NDIter.prototype
   * @type Number[]
   */
  public coords: number[]

  /**
   * @name pos
   * @memberof NDIter.prototype
   * @type Number
   */
  public pos: number

  /**
   * @name factors
   * @memberof NDIter.prototype
   * @type Number[]
   */
  public factors: number[]

  constructor(x: NDArray | ArrayLike<unknown>) {
    this.x = array(x)
    const { shape, strides, length } = this.x

    this.length = length
    this.lengthm1 = length - 1
    this.nd = shape.length
    this.ndm1 = this.nd - 1

    this.shape = Array(V_MAXDIMS).fill(0)
    this.strides = Array(V_MAXDIMS).fill(0)
    this.shapem1 = Array(V_MAXDIMS).fill(0)
    this.coords = Array(V_MAXDIMS).fill(0)
    this.backstrides = Array(V_MAXDIMS).fill(0)
    this.factors = Array(V_MAXDIMS).fill(0)

    if (this.nd !== 0) {
      this.factors[this.nd - 1] = 1
    }

    let i
    for (i = 0; i < this.nd; i += 1) {
      this.shape[i] = shape[i]!
      this.shapem1[i] = shape[i]! - 1
      this.strides[i] = strides[i]!
      this.backstrides[i] = strides[i]! * this.shapem1[i]!
      this.coords[i] = 0

      if (i > 0) {
        this.factors[this.ndm1 - i] =
          this.factors[this.nd - i]! * shape[this.nd - i]!
      }
    }

    this.index = 0
    this.pos = 0
  }

  /**
   * @function done
   * @memberof NDIter.prototype
   * @description Returns true if the iterator is done, false otherwise
   * @returns {Boolean}
   * @example
   * import { array } from 'vectorious/core/array';
   * import { NDIter } from 'vectorious/iterator';
   *
   * const iter = new NDIter(array([1, 2, 3]));
   * iter.done(); // false
   */
  done() {
    return this.index > this.lengthm1
  }

  /**
   * @function current
   * @memberof NDIter.prototype
   * @description Returns the current element of the iterator
   * @returns {Object} current
   * @returns {Number} [current.value]
   * @returns {Boolean} current.done
   * @example
   * import { array } from 'vectorious/core/array';
   * import { NDIter } from 'vectorious/iterator';
   *
   * const iter = new NDIter(array([1, 2, 3]));
   * iter.current(); // { value: 1, done: false }
   */
  current(): IteratorResult<any> {
    const done = this.done()
    return {
      value: done ? undefined : this.pos,
      done,
    }
  }

  /**
   * @function next
   * @memberof NDIter.prototype
   * @description
   * Steps to the next position in the iterator.
   * Returns the current index of the iterator, or undefined if done.
   * @returns {Object}
   * @example
   * import { array } from 'vectorious/core/array';
   * import { NDIter } from 'vectorious/iterator';
   *
   * const iter = new NDIter(array([1, 2, 3]));
   * iter.next(); // { value: 2, done: false }
   * iter.next(); // { value: 3, done: false }
   * iter.next(); // { done: true }
   */
  next() {
    const current = this.current()
    if (current.done) {
      return current
    }

    const { ndm1, shapem1, strides, backstrides } = this

    let i
    for (i = ndm1; i >= 0; i -= 1) {
      if (this.coords[i]! < shapem1[i]!) {
        this.coords[i] += 1
        this.pos += strides[i]!
        break
      }

      this.coords[i] = 0
      this.pos -= backstrides[i]!
    }

    this.index += 1
    return current
  }

  [Symbol.iterator]() {
    return this
  }
}

class NDMultiIter implements Iterator<number[]> {
  /**
   * @name iters
   * @memberof NDMultiIter.prototype
   * @type NDIter[]
   */
  public iters: NDIter[]

  /**
   * @name shape
   * @memberof NDMultiIter.prototype
   * @type Number[]
   */
  public shape: number[]

  /**
   * @name nd
   * @memberof NDMultiIter.prototype
   * @type Number
   */
  public nd: number

  /**
   * @name length
   * @memberof NDMultiIter.prototype
   * @type Number
   */
  public length: number

  /**
   * @name lengthm1
   * @memberof NDMultiIter.prototype
   * @type Number
   */
  public lengthm1: number

  /**
   * @name numiter
   * @memberof NDMultiIter.prototype
   * @type Number
   */
  public numiter: number

  /**
   * @name index
   * @memberof NDMultiIter.prototype
   * @type Number
   */
  public index: number

  /**
   * @name pos
   * @memberof NDMultiIter.prototype
   * @type Number[]
   */
  public pos: number[]

  constructor(...args: (NDArray | ArrayLike<any>)[]) {
    this.iters = args.map((arg) => new NDIter(arg))
    this.numiter = args.length

    let i
    let nd
    for (i = 0, nd = 0; i < this.numiter; i += 1) {
      nd = Math.max(nd, this.iters[i]!.x.shape.length)
    }

    this.nd = nd
    this.shape = Array(nd).fill(0)

    let it
    let j
    let k
    let tmp
    for (i = 0; i < nd; i += 1) {
      this.shape[i] = 1
      for (j = 0; j < this.numiter; j += 1) {
        it = this.iters[j]!
        k = i + it.x.shape.length - nd
        if (k >= 0) {
          tmp = it.x.shape[k]
          if (tmp == 1) {
            continue
          }
          if (this.shape[i] == 1) {
            this.shape[i] = tmp!
          } else if (this.shape[i] !== tmp) {
            throw new Error("shape mismatch")
          }
        }
      }
    }

    tmp = this.shape.reduce((acc, dim) => acc * dim, 1)

    this.length = tmp
    this.lengthm1 = tmp - 1

    for (i = 0; i < this.numiter; i += 1) {
      it = this.iters[i]!
      it.nd = this.nd
      it.ndm1 = this.nd - 1
      it.length = tmp
      it.lengthm1 = tmp - 1

      nd = it.x.shape.length
      if (nd !== 0) {
        it.factors[this.nd - 1] = 1
      }

      for (j = 0; j < this.nd; j += 1) {
        it.shape[j] = this.shape[j]!
        it.shapem1[j] = this.shape[j]! - 1
        k = j + nd - this.nd

        if (k < 0 || it.x.shape[k] !== this.shape[j]) {
          it.strides[j] = 0
        } else {
          it.strides[j] = it.x.strides[k]!
        }

        it.backstrides[j] = it.strides[j]! * it.shapem1[j]!

        if (j > 0) {
          it.factors[this.nd - j - 1] =
            it.factors[this.nd - j]! * this.shape[this.nd - j]!
        }
      }
    }

    this.index = 0
    this.pos = Array(this.numiter).fill(0)
  }

  /**
   * @function done
   * @memberof NDMultiIter
   * @description Returns true if the iterator is done, false otherwise
   * @returns {Boolean}
   * @example
   * import { array } from 'vectorious/core/array';
   * import { NDMultiIter } from 'vectorious/iterator';
   *
   * const iter = new NDMultiIter(array([1, 2, 3]), array([4, 5, 6]));
   * iter.done(); // false
   */
  done() {
    return this.index > this.lengthm1
  }

  /**
   * @function current
   * @memberof NDMultiIter
   * @description Returns the current indices of the iterators
   * @returns {Object} current
   * @returns {Number[]} [current.value]
   * @returns {Boolean} current.done
   * @example
   * import { array } from 'vectorious/core/array';
   * import { NDMultiIter } from 'vectorious/iterator';
   *
   * const iter = new NDMultiIter(array([1, 2, 3]), array([4, 5, 6]));
   * iter.current(); // { value: [0, 0], done: false }
   */
  current(): IteratorResult<any> {
    const done = this.done()
    return {
      value: done ? undefined : this.pos,
      done,
    }
  }

  /**
   * @function next
   * @memberof NDMultiIter
   * @description
   * Steps to the next position in the iterator.
   * Returns the current indices of the iterators, or undefined if done.
   * @returns {Object} current
   * @returns {Number[]} [current.value]
   * @returns {Boolean} current.done
   * @example
   * import { array } from 'vectorious/core/array';
   * import { NDMultiIter } from 'vectorious/iterator';
   *
   * const iter = new NDMultiIter(array([1, 2, 3]), array([4, 5, 6]));
   * iter.next(); // { value: [0, 0], done: false }
   * iter.next(); // { value: [1, 1], done: false }
   * iter.next(); // { value: [2, 2], done: false },
   * iter.next(); // { value: undefined, done: true },
   */
  next() {
    const current = this.current()
    if (current.done) {
      return current
    }

    this.index += 1

    const { numiter } = this

    let it
    let i
    for (i = 0; i < numiter; i += 1) {
      it = this.iters[i]!
      this.pos[i] = it.pos
      it.next()
    }

    return current
  }

  [Symbol.iterator]() {
    return this
  }
}

/**
 * @static
 * @memberof module:Globals
 * @function ones
 * @description Creates an array containing ones (`1`) of shape `shape`
 * @param {Number[]} ...shape
 * @returns {NDArray}
 * @example
 * import { ones } from 'vectorious/core/ones';
 *
 * ones(3); // => array([1, 1, 1])
 */
export const ones = (...shape: number[]): NDArray =>
  new NDArray(
    new Float64Array(shape.reduce((sum: number, dim: number) => sum * dim, 1)),
    {
      shape,
    },
  ).fill(1)

/**
 * @static
 * @memberof module:Globals
 * @function array
 * @description `array(...args)` is an alias for `new v(...args)`
 * @param {} ...args
 * @returns {NDArray}
 * @example
 * import { array } from 'vectorious/core/array';
 *
 * array([1, 2, 3]); // => array([1, 2, 3])
 */
export const array = (...args: any[]): NDArray => new NDArray(...args)

export class NDArray implements INDArray {
  /**
   * @name data
   * @memberof NDArray.prototype
   * @type TypedArray
   * @default new Float64Array(0)
   */
  public data: TypedArray = new Float64Array(0)

  /**
   * @name dtype
   * @memberof NDArray.prototype
   * @type String
   * @default 'float64'
   */
  public dtype: DType = "float64"

  /**
   * @name length
   * @memberof NDArray.prototype
   * @type Number
   * @default 0
   */
  public length: number = 0

  /**
   * @name shape
   * @memberof NDArray.prototype
   * @type Number[]
   * @default [0]
   */
  public shape: number[] = [0]

  /**
   * @name strides
   * @memberof NDArray.prototype
   * @type Number[]
   * @default [0]
   */
  public strides: number[] = [0]

  public [inspectSymbol]: () => string = toString

  public dot = dot
  public get = get
  public set = set
  public check = check
  public fill = fill
  public slice = slice

  public constructor(
    data?: any,
    options?: {
      shape?: number[]
      length?: number
      strides?: number[]
      dtype?: DType
    },
  ) {
    if (!data) {
      return
    }

    if (data instanceof NDArray) {
      return data
    }

    if (data instanceof NDIter) {
      if (!options || !options.dtype) {
        throw new Error("dtype is missing")
      }

      if (data.shape) {
        options.shape = data.shape
      }

      const length = data.length
      data = new (get_type(options.dtype))(length)
    }

    const {
      shape = get_shape(data),
      length = get_length(shape),
      strides = get_strides(shape),
      dtype = get_dtype(data),
    } = options || {}

    this.data = is_typed_array(data)
      ? data
      : new (get_type(dtype))(flatten(data))
    this.shape = shape
    this.length = length
    this.dtype = dtype
    this.strides = strides
  }

  /**
   * @name x
   * @memberof NDArray.prototype
   * @description Gets or sets the value at index 0
   * @type Number
   */
  public get x(): number {
    return this.get(0)
  }

  public set x(value: number) {
    this.set(0, value)
  }

  /**
   * @name y
   * @memberof NDArray.prototype
   * @description Gets or sets the value at index 1
   * @type Number
   */
  public get y(): number {
    return this.get(1)
  }

  public set y(value: number) {
    this.set(1, value)
  }

  /**
   * @name z
   * @memberof NDArray.prototype
   * @description Gets or sets the value at index 2
   * @type Number
   */
  public get z(): number {
    return this.get(2)
  }

  public set z(value: number) {
    this.set(2, value)
  }

  /**
   * @name w
   * @memberof NDArray.prototype
   * @description Gets or sets the value at index 3
   * @type Number
   */
  public get w(): number {
    return this.get(3)
  }

  public set w(value: number) {
    this.set(3, value)
  }
}

/**
 * @static
 * @memberof module:Globals
 * @function dot
 * @description
 * Performs dot multiplication with `x` and `y`.
 * Accelerated with BLAS `?dot`.
 * @param {NDArray} x
 * @param {NDArray} y
 * @returns {Number}
 * @example
 * import { dot } from 'vectorious/core/dot';
 *
 * dot([1, 2, 3], [4, 5, 6]); // => 32
 */
// export const dot = (
//   x: NDArray | ArrayLike<any>,
//   y: NDArray | ArrayLike<any>,
// ): number => array(x).dot(array(y))

/**
 * @function dot
 * @memberof NDArray.prototype
 * @description
 * Performs dot multiplication with `x` and current array
 * Accelerated with BLAS `?dot`.
 * @param {NDArray} x
 * @returns {Number}
 * @example
 * import { array } from 'vectorious/core/array';
 *
 * array([1, 2, 3]).dot([4, 5, 6]); // => 32
 */
function dot(this: NDArray, x: NDArray): number {
  const { data: d1 } = this
  const { data: d2 } = x

  let result: number = 0
  const iter = new NDMultiIter(this, x)

  for (const [i, j] of iter) {
    result += d1[i]! * d2[j]!
  }

  return result
}

/**
 * @function get
 * @memberof NDArray.prototype
 * @description Gets the element at `i, j, ..., n` from current vector.
 * @param {Number[]} ...indices
 * @returns {Number}
 * @example
 * import { array } from 'vectorious/core/array';
 *
 * array([1, 2, 3]).get(2); // 3
 */
function get(this: NDArray, ...indices: number[]): number {
  this.check(...indices)

  const { data: d1, shape: s1 } = this
  const { length: ndim } = s1
  let index: number = indices[ndim - 1]!

  let i: number
  let j: number
  for (i = 0; i < ndim - 1; i += 1) {
    let p: number = 1
    for (j = i + 1; j < ndim; j += 1) {
      p *= s1[j]!
    }

    index += indices[i]! * p
  }

  return d1[index]!
}

/**
 * @function check
 * @memberof NDArray.prototype
 * @description Asserts if indices `i, j, ..., n` are within the bounds of current array
 * @param {Number[]} ...indices
 * @throws {Error} index out of bounds
 * @example
 * import { array } from 'vectorious/core/array';
 *
 * array([0.5, 1.5, 2.5]).check(3); // Error: index out of bounds
 */
function check(this: NDArray, ...indices: number[]): void {
  const { shape: s1, length: l1 } = this

  if (indices.length === 1) {
    const [i] = indices
    if (i! < 0 || i! > l1 - 1 || !Number.isFinite(i)) {
      throw new Error("index out of bounds")
    }
  } else if (
    !s1.every(
      (dim: number, i: number) =>
        dim > indices[i]! && Number.isFinite(indices[i]) && indices[i]! >= 0,
    )
  ) {
    throw new Error("index out of bounds")
  }
}

/**
 * @function set
 * @memberof NDArray.prototype
 * @description Sets the element at `i, j, ..., n` to `value`.
 * @param {Number[]} ...indices
 * @param {Number} value
 * @returns {this}
 * @example
 * import { array } from 'vectorious/core/array';
 *
 * array([1, 2, 3]).set(1, 0); // <=> array([1, 0, 3])
 */
function set(this: NDArray, ...args: number[]): void {
  const indices: number[] = args.slice(0, -1)
  const value: number = args[args.length - 1]!

  this.check(...indices)

  const { shape: s1 } = this
  let index: number = indices[indices.length - 1]!

  let i: number
  for (i = 0; i < indices.length - 1; i += 1) {
    index += indices[i]! * s1[i + 1]!
  }

  this.data[index] = value
}

/**
 * @function fill
 * @memberof NDArray.prototype
 * @description Fills the current array with a scalar value
 * @param {Number} value
 * @returns {this}
 * @example
 * import { array } from 'vectorious/core/array';
 *
 * array([1, 2, 3]).fill(0); // <=> array([0, 0, 0])
 */
function fill(
  this: NDArray,
  value: number | ((index: number) => number) = 0,
): NDArray {
  const { data: d1 } = this
  const iter = new NDIter(this)

  for (const i of iter) {
    d1[i] = value instanceof Function ? value(i) : value
  }

  return this
}

/**
 * @function slice
 * @memberof NDArray.prototype
 * @description Slices the current array along the leading dimension
 * @param {Number} begin
 * @param {Number} end
 * @param {Number} step
 * @returns {this}
 * @example
 * import { array } from 'vectorious/core/array';
 *
 * array([1, 2, 3, 4]).slice(0, 4, 2); // => array([1, 3])
 */
function slice(
  this: NDArray,
  begin: number = 0,
  end: number = this.shape[0]!,
  step: number = 1,
): NDArray {
  const { data: d1, shape: s1 } = this
  const nd = s1.length

  if (begin < 0 || end < 0) {
    return this.slice(
      begin < 0 ? s1[s1.length - 1]! + begin : begin,
      end < 0 ? s1[s1.length - 1]! + end : end,
    )
  }

  if (begin > end) {
    return this.slice(end, begin, step)
  }

  if (step <= 0) {
    throw new Error("step argument has to be a positive integer")
  }

  const s2: number[] = [
    Math.ceil((end - begin) / Math.abs(step)),
    ...s1.slice(1),
  ]
  const l2: number = get_length(s2)
  const st2: number[] = get_strides(s2)
  const d2: TypedArray =
    nd > 1
      ? d1.subarray(begin * s2[s2.length - 1]!, end * s2[s2.length - 1]!)
      : d1.subarray(begin, end)

  st2[0] *= step

  return new NDArray(d2, {
    shape: s2,
    length: l2,
    strides: st2,
  })
}
