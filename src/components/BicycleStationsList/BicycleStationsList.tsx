'use client'
import { STATIONS_PAGE_SIZE } from '@/lib/constants'
import { Station } from '@/types'
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'
import { Pagination } from '../Pagination/Pagination'
import { columns } from './BicycleStationsList.helpers'
import { useEffect } from 'react'

interface Props {
  data: Station[]
  onPaginationChange: () => void
}

export function BicycleStationsList({ data, onPaginationChange }: Props) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    initialState: {
      pagination: {
        pageSize: STATIONS_PAGE_SIZE
      }
    }
  })

  useEffect(() => {
    onPaginationChange()
  }, [table.getState().pagination, onPaginationChange])

  return (
    <div className="p-2">
      <table className="w-full">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="flex gap-2 border-b border-white">
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
