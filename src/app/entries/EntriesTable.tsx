"use client"

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
import type { TableOptions } from "@tanstack/react-table"
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
import { type MouseEventHandler, useState } from "react"
import { Button, type ButtonVariants } from "~components/ui/button"
import Link from "next/link"

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

type ButtonProps = {
  variant: ButtonVariants
  onClick?: MouseEventHandler<HTMLButtonElement>
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

  let buttonProps: ButtonProps = {
    //  @ts-expect-error meta is already declared up top
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    onClick: table.options.meta!.addRow,
    variant: "default",
  }

  const enoughCriteria = Boolean(columns.length)
  if (!enoughCriteria) {
    buttonProps = {
      variant: "link",
    }
  }

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
              {...buttonProps}
            >
              {enoughCriteria && "Add Row"}
              {!enoughCriteria && (
                <Link href="/" className="text-slate-50">
                  Add Criteria
                </Link>
              )}
            </Button>
          </TableHead>
        </TableRow>
      </TableFooter>
    </Table>
  )
}
