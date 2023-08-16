import type { Table } from "@tanstack/react-table"
import { Button } from "~components/ui/button"


export const FooterCell = ({ table }: {table: Table<Record<string, string>>}) => {
  const meta = table.options.meta
//   const selectedRows = table.getSelectedRowModel().rows
//   const removeRows = () => {
//     meta.removeSelectedRows(
//       table.getSelectedRowModel().rows.map(row => row.index)
//     )
//     table.resetRowSelection()
//   }
    
  return (
      <Button type="button" onClick={
          //  @ts-expect-error it's ok
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          meta!.addRow
      }>
        Add
      {/* {selectedRows.length > 0 ? (
        <button className="remove-button" onClick={removeRows}>
          Remove Selected x
        </button>
      ) : null}
      <button className="add-button" onClick={meta?.addRow}>
        Add New +
      </button> */}
    </Button>
  )
}
