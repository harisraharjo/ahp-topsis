import { MutationDialogTitle } from "../../MutationDialogTitle"
import { ButtonLink } from "../ButtonLink"

export default function Page() {
  return (
    <>
      <MutationDialogTitle type="add" />
      <div>Add Content</div>
      <ButtonLink
        destination="/"
        query={{ data: "Hello There" }}
        className="bg-blue-700"
      >
        Tambah
      </ButtonLink>
    </>
  )
}
