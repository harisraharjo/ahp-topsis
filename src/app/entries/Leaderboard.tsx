// "use client"

// import {
//   type ColumnDef,
//   flexRender,
//   getCoreRowModel,
//   useReactTable,
// } from "@tanstack/react-table"
// // import type { HierarchyPointNode } from "d3-hierarchy"
// // import type { HierarchyNode } from "../../(hierarchy)/Hierarchy"
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "~components/ui/table"
// // import { calculateAHP } from "./AHP"
// // import { useRef, useState } from "react"
// // import { calculateAHP } from "./AHP"

// type ComparatorProps = {
//   data: TableData[]
//   // id: string | number
//   // sAction: Action
//   // result: {
//   //   isSuccess: boolean
//   //   pV: number[]
//   // }
// }

// export type TableData = {
//   id: string
//   name: string
// }

// const columns: ColumnDef<TableData>[] = [
//   {
//     accessorKey: "name",
//     header: "Nama",
//   },
// ]

// export const Leaderboard = ({ data }: ComparatorProps) => {
//   const table = useReactTable({
//     data,
//     columns,
//     getCoreRowModel: getCoreRowModel(),
//   })

//   return (
//     <>
//       <br></br>
//       <br></br>
//       Leaderboard
//       <br></br>
//       <Table>
//         <TableHeader>
//           {table.getHeaderGroups().map((headerGroup) => (
//             <TableRow key={headerGroup.id}>
//               {headerGroup.headers.map((header) => {
//                 return (
//                   <TableHead key={header.id}>
//                     {header.isPlaceholder
//                       ? null
//                       : flexRender(
//                           header.column.columnDef.header,
//                           header.getContext(),
//                         )}
//                   </TableHead>
//                 )
//               })}
//             </TableRow>
//           ))}
//         </TableHeader>
//         <TableBody>
//           {
//             table.getRowModel().rows.map((row) => (
//               <TableRow
//                 key={row.id}
//                 data-state={row.getIsSelected() && "selected"}
//               >
//                 {row.getVisibleCells().map((cell) => (
//                   <TableCell key={cell.id}>
//                     {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                   </TableCell>
//                 ))}
//               </TableRow>
//             ))
//           }
//         </TableBody>
//       </Table>
//     </>
//   )
// }

export {}