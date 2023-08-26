type DialogType = "add" | "detail" | "compare"


export const MutationDialogTitle = ({ type }: { type: DialogType }) => (
  <h4 className="capitalize">{type} Criteria</h4>
)
