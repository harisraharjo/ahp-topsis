// "use client"

// import {
// //   type ColumnDef,
//   flexRender,
//   getCoreRowModel,
//   useReactTable,
// } from "@tanstack/react-table"
// import { Input } from "~components/ui/input"
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableFooter,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "~components/ui/table"
// import { Button } from "~components/ui/button"
// import { useState } from "react"
// import { FooterCell } from "./FooterCell"

// type ComparatorProps = {
//     // data: TableData[]
//     columns: {
//         header: string;
//         accessorKey: string;
//     }[]
//     leaves: number
//     fieldNames: Record<string, string>
// }

// // type TableData = Record<string, string>

// const defaultColumn = {
//     // @ts-expect-error it's ok
//     cell: (w) => {
//     return (
//         <Input
//             type="text"
//         // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
//             name={`${w.row.index}-${w.column.id}`}
//         // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
//         defaultValue={w.cell.renderValue()}
//         className="outline"
//       />
//     )
//   },
// }

// export const EntriesTable = ({  columns, fieldNames }: ComparatorProps) => {
//     const [data, setData] = useState(() => [fieldNames]);
    
//     // const [columns2] = useState(() => columns.map((col) => {
    
//     //     col["cell"] = (({ cell: { renderValue, row, column } }) => (
//     //         <Input
//     //             type="text"
//     //             className="outline"
//     //             name={`${row.index}-${column.id}`}
//     //             defaultValue={renderValue() as string}
//     //         />
//     //     ));
        
//     //     return col
//     // })
//     // )
    
//   const table = useReactTable({
//     data,
//     columns,
//     defaultColumn,
//     getCoreRowModel: getCoreRowModel(),
//     meta: {
//         addRow: () => {
//             setData((prev) => [...prev, fieldNames] );
//         },
//         // @ts-expect-error it's ok
//       updateData: (rowIndex, columnId, value) => {
//         // Skip page index reset until after next rerender
//         // skipAutoResetPageIndex()
            
//         setData(old =>
//           old.map((row, index) => {
//             if (index === rowIndex) {
//               return {
//                 // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
//                 ...old[rowIndex]!,
//                 // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
//                 [columnId]: value,
//               }
//             }
//             return row
//           })
//         )
//       },
//     },
//   })

//   return (
//    <>
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
//         <TableFooter>
//              <TableRow>
//                 <TableHead>
//                     <FooterCell table={table} />
//                       </TableHead>
                      
//              </TableRow>
//                   <TableRow>
//                       <TableHead className="mx-auto">
//                           <Button>Hitung</Button>
//                       </TableHead>
//                       </TableRow>
//           </TableFooter>
//       </Table>
//     </>
//   )
// }

export {}
