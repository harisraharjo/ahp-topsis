import { ModalDialog } from "../../../../components/ModalDialog"
import AddPage from "../[slug]/add/page"

const params = { slug: "0-0" } as const
export default function Layout() {
  return (
    <ModalDialog className="p-3">
      <AddPage params={params} />
    </ModalDialog>
  )
}
