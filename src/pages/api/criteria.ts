import { methods } from "@server/api/hooks"
import { sendHTTPResponse } from "@server/api/http"
import { use } from "@server/api/middleware"
import type { NextApiRequest, NextApiResponse } from "next"

function handler(req: NextApiRequest, res: NextApiResponse<{ name: string }>) {
  sendHTTPResponse(res, 200, { name: "John Doe" })
}

export default use(methods("delete"), handler)
