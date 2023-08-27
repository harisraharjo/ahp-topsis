"use client"

import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { Button } from "~components/ui/button"
import { Input } from "~components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "~components/ui/table"

type ComparatorProps = {
  data: TableData[]
}

export type TableData = {
  id: string
  compareTo: string
  scale: number
}

const columns: ColumnDef<TableData>[] = [
  {
    accessorKey: "compareTo",
    header: "Comparation",
  },
  {
    accessorKey: "scale",
    header: "Scale",
    cell: ({ cell: { renderValue, row } }) => (
      <Input
        type="number"
        min={1}
        max={9}
        className="text-black outline outline-slate-50"
        name={row.original.id}
        defaultValue={renderValue() as number}
      />
    ),
  },
]

export const Comparator = ({ data }: ComparatorProps) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <TableHead
                  key={header.id}
                  className="pointer-events-none text-slate-50"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </TableHead>
              )
            })}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows.map((row) => (
          <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <Button variant={"default"} className="mb-2 ml-1 border">
          Calculate
        </Button>
      </TableFooter>
    </Table>
  )
}
