import { MutationDialogTitle } from "../MutationDialogTitle"
import Comparator from "./Comparator"

export default function Page(a: any) {
  return (
    <>
      <MutationDialogTitle type="komparasi" />
      {/* ts-expect-error FIX ME */}
      <Comparator slug={a.params.slug as string} />
    </>
  )
}
