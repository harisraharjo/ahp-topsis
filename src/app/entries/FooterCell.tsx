"use client"

import type { Table } from "@tanstack/react-table"
import { Button } from "~components/ui/button"


export const FooterCell = ({ table }: {table: Table<Record<string, string>>}) => {
  const meta = table.options.meta
    
  return (
      <Button type="button" onClick={
          //  @ts-expect-error it's ok
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          meta!.addRow
      }>
        Add
    </Button>
  )
}
