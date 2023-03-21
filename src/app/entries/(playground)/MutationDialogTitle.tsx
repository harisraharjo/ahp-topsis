import type { DialogType } from "~components/(Playground)/contexts"

export const MutationDialogTitle = ({ type }: { type: DialogType }) => (
  <h4 className="capitalize">{type} Criteria</h4>
)
