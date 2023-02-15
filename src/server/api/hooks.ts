import type { Hook } from "./middleware"
import { sendHTTPResponse, type HTTPMethod } from "./http"

export const methods = <HTTPMethods extends readonly HTTPMethod[]>(
  ...methods: HTTPMethods
): Hook => {
  return (req, res, next): void =>
    void (!req.method ||
    !methods.includes(req.method.toLowerCase() as HTTPMethod)
      ? sendHTTPResponse(res, 405, "Method Not Allowed")
      : next())
}
