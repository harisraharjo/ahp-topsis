import { methods } from "@server/api/hooks"
import { use } from "@server/api/middleware"
import type { NextApiRequest, NextApiResponse } from "next"

function handler(req: NextApiRequest, res: NextApiResponse<{ name: string }>) {
  res.status(200).json({ name: "John Doe" })
}

export default use(methods("delete"), handler)
