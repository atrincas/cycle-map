'use client'
import { Station } from '@/types'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable
} from '@tanstack/react-table'
import { ArrowUpDown as ArrowUpDownIcon } from 'lucide-react'
import { Pagination } from '../Pagination/Pagination'
import { STATIONS_PAGE_SIZE } from '@/lib/constants'

const columnHelper = createColumnHelper<Station>()

const columns = [
  columnHelper.accessor('name', {
    header: () => <span className="uppercase">station name</span>,
    cell: (info) => info.getValue()
  }),
  columnHelper.accessor('free_bikes', {
    header: () => (
      <>
        <span className="uppercase">free bikes</span>
        <ArrowUpDownIcon className="w-3 h-3 mb4-" strokeWidth={2} />
      </>
    ),
    cell: (info) => info.getValue()
  }),
  columnHelper.accessor('empty_slots', {
    header: () => (
      <>
        <span className="uppercase">empty slots</span>
        <ArrowUpDownIcon className="w-3 h-3" strokeWidth={2} />
      </>
    ),
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
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: STATIONS_PAGE_SIZE
      }
    }
  })

  return (
    <div className="p-2">
      <table className="w-full">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="flex gap-2 border-b border-white px-2 py-3">
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="flex items-center gap-2 first:flex-1 [&:not(:first-child)]:w-1/4 [&:not(:first-child)]:justify-center font-medium text-sm"
                >
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
            <tr
              key={row.id}
              className="flex py-4 px-2 border-b border-dashed border-white border-opacity-50 last:mb-6"
            >
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="flex items-center gap-2 first:flex-1 [&:not(:first-child)]:w-1/4 [&:not(:first-child)]:justify-center font-normal text-base"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {table.getPageOptions().length > 1 && (
        <Pagination
          pages={table.getPageOptions()}
          currentPage={table.getState().pagination.pageIndex}
          onPageClick={(page) => table.setPageIndex(page)}
          dark
        />
      )}
    </div>
  )
}
