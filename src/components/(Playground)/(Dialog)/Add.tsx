import { type SVGProps } from "react"
import type { Trigger } from "~components/Overlays"

export type DialogContainer = Omit<
  SVGProps<SVGForeignObjectElement>,
  "ref" | "refX" | "refY"
>
type Props = Omit<Trigger, "setIsOpen"> & DialogContainer
const AddDialog = ({ isOpen, toggle, ...props }: Props) => <div>Add Form</div>

export default AddDialog
