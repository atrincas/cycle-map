'use client'
import { Station } from '@/types'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable
} from '@tanstack/react-table'

const columnHelper = createColumnHelper<Station>()

const columns = [
  columnHelper.accessor('name', {
    header: () => <span className="uppercase">station name</span>,
    cell: (info) => info.getValue()
  }),
  columnHelper.accessor('free_bikes', {
    header: () => <span className="uppercase">free bikes</span>,
    cell: (info) => info.getValue()
  }),
  columnHelper.accessor('empty_slots', {
    header: () => <span className="uppercase">empty slots</span>,
    cell: (info) => info.getValue()
  })
]

interface Props {
  data: Station[]
}

export function BicycleStationsList({ data }: Props) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel()
  })

  return (
    <div className="p-2">
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
