import type { NextApiHandler } from "next"

import { methods } from "~server/api/hooks"
import { sendHTTPResponse } from "~server/api/http"
import { use } from "~server/api/middleware"

const handler: NextApiHandler<{ name: string }> = (req, res) => {
  sendHTTPResponse(res, 200, { name: "John Doe" })
}

const api = use(methods("delete"), handler)

export default api
