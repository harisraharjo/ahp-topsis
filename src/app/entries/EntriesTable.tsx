"use client"

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
import type { TableOptions } from "@tanstack/react-table"
import { Input } from "../../components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table"
import { useState } from "react"
import { Button } from "../../components/ui/button"

type ComparatorProps = {
  columns: {
    header: string
    accessorKey: string
  }[]
  fieldNames: Record<string, string>
}

const defaultColumn: TableOptions<unknown>["defaultColumn"] = {
  cell: (ctx) => {
    return (
      <Input
        required
        type={`${ctx.column.id === "name" ? "text" : "number"}`}
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        name={`${ctx.row.index}-${ctx.column.id}`}
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
        defaultValue=""
        className="text-black outline"
      />
    )
  },
}

export const EntriesTable = ({ columns, fieldNames }: ComparatorProps) => {
  const [data, setData] = useState(() => [fieldNames])

  const table = useReactTable({
    data,
    columns,
    defaultColumn,
    getCoreRowModel: getCoreRowModel(),
    meta: {
      addRow: () => {
        setData((prev) => [...prev, fieldNames])
      },
    },
  })

  return (
    <Table className="mb-4">
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
        <TableRow>
          <TableHead>
            <Button
              className="border border-slate-50 text-slate-50"
              type="button"
              //  @ts-expect-error meta is already declared up top
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              onClick={table.options.meta!.addRow}
              variant="default"
            >
              Add Row
            </Button>
          </TableHead>
        </TableRow>
      </TableFooter>
    </Table>
  )
}
