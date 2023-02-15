import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next"
import { sendHTTPResponse } from "./http"

export type Next = () => Promise<void>

export type Hook<
  RequestT extends NextApiRequest = NextApiRequest,
  ResponseT extends NextApiResponse = NextApiResponse,
> = (req: RequestT, res: ResponseT, next: Next) => PromiseLike<void> | void

async function runMiddlewares<
  RequestT extends NextApiRequest,
  ResponseT extends NextApiResponse,
  Middleware extends Hook<RequestT, ResponseT>[],
  Handler extends NextApiHandler,
>(
  req: RequestT,
  res: ResponseT,
  middlewares: [...Middleware, Handler],
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

export function use<
  RequestT extends NextApiRequest,
  ResponseT extends NextApiResponse,
  Middleware extends Hook<RequestT, ResponseT>[],
  Handler extends NextApiHandler,
  Middlewares extends [...Middleware, Handler],
>(...middlewares: Middlewares) {
  return async (req: RequestT, res: ResponseT) => {
    try {
      await runMiddlewares(req, res, middlewares, 0)
    } catch (error) {
      console.error(error)
      sendHTTPResponse(res, 500, "Internal Server Error")
    }
  }
}
