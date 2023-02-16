import type { Hook } from "./middleware"
import type { HTTPMethod, NextAPIResponseError } from "./http"
import { sendHTTPResponse } from "./http"

export const methods = <HTTPMethods extends readonly HTTPMethod[]>(
  ...methods: HTTPMethods
): Hook => {
  return (req, res: NextAPIResponseError<405>, next): void =>
    void (!req.method ||
    !methods.includes(req.method.toLowerCase() as HTTPMethod)
      ? sendHTTPResponse(res, 405, { error: "Method Not Allowed" })
      : next())
}
