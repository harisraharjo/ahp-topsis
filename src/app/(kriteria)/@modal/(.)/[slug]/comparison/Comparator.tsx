"use client"

import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { Input } from "~components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~components/ui/table"
import { Button } from "~components/ui/button"

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
    header: "Perbandingan",
  },
  {
    accessorKey: "scale",
    header: "Skala",
    cell: ({ cell: { renderValue, row } }) => (
      <Input
        type="number"
        min={1}
        max={9}
        className="outline"
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

  // THE AMOUNT OF COMPARISONS NEEDED
  // n*(n-1)/2


  return (
   <>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
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
          {
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          }
        </TableBody>
      </Table>

      <Button>Hitung</Button>
    </>
  )
}
