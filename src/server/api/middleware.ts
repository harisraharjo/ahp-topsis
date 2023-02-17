import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next"

import type { ResponseError } from "./http"
import { sendHTTPResponse } from "./http"

export type Next = () => Promise<void>

export type Hook<
  T,
  ResponseT extends NextApiResponse<T> = NextApiResponse<T>,
> = (
  req: NextApiRequest,
  res: ResponseT,
  next: Next,
) => PromiseLike<void> | void

type HooksOrHandler<T> = [...Hook<T>[], NextApiHandler<T>]

async function runMiddlewares<
  Middleware extends HooksOrHandler<unknown>,
  Resp extends NextApiResponse,
>(
  req: NextApiRequest,
  res: Resp,
  middlewares: Middleware,
  currentMiddlewareIndex: number,
) {
  // Check if previous middleware sent a response - if it did we stop execution
  if (res.headersSent) return

  const next = async () => {
    // Get next middleware, if there is one - if there isn't we stop execution
    const nextMiddleware = middlewares[currentMiddlewareIndex + 1]
    if (!nextMiddleware) return

    // Recursively run next middleware
    await runMiddlewares(req, res, middlewares, currentMiddlewareIndex + 1)
  }

  // Initializes middleware chain - the next function will
  // recursively run next middleware when called by the current middleware
  await middlewares[currentMiddlewareIndex]?.(req, res, next)
}

export const use = <T, Middleware extends HooksOrHandler<T>>(
  ...middleware: Middleware
): NextApiHandler<
  | ResponseError<500>
  | (Middleware extends HooksOrHandler<T> ? Middleware[number] : never)
> => {
  return async (req, res) => {
    try {
      await runMiddlewares(req, res, middleware, 0)
    } catch (error) {
      // console.error(error)
      sendHTTPResponse(res, 500, {
        error: "Internal Server Error",
      })
    }
  }
}
