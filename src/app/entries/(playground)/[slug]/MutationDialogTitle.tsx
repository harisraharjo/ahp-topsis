type DialogType = "add" | "detail" | "komparasi"


export const MutationDialogTitle = ({ type }: { type: DialogType }) => (
  <h4 className="capitalize">{type} Criteria</h4>
)
