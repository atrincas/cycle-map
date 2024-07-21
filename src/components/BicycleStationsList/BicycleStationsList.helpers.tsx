import { Station } from '@/types'
import { ColumnDefTemplate, createColumnHelper, HeaderContext } from '@tanstack/react-table'
import {
  ArrowDown01 as ArrowDown01Icon,
  ArrowDown10 as ArrowDown10Icon,
  ArrowUpDown as ArrowUpDownIcon
} from 'lucide-react'

const getHeaderWithSorting: (label: string) => ColumnDefTemplate<HeaderContext<Station, number>> =
  (label: string) =>
  ({ column }) => {
    return (
      <button
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        className="flex items-center gap-2 bg-inherit hover:bg-toreabay-700 transition-colors rounded px-2 py-3"
      >
        <span className="uppercase">{label}</span>
        {column.getIsSorted() === 'asc' ? (
          <ArrowDown01Icon className="w-3 h-3 mb4-" strokeWidth={2} />
        ) : column.getIsSorted() === 'desc' ? (
          <ArrowDown10Icon className="w-3 h-3 mb4-" strokeWidth={2} />
        ) : (
          <ArrowUpDownIcon className="w-3 h-3 mb4-" strokeWidth={2} />
        )}
      </button>
    )
  }

const columnHelper = createColumnHelper<Station>()

const columns = [
  columnHelper.accessor('name', {
    header: () => <span className="uppercase px-2 py-3">station name</span>,
    cell: (info) => info.getValue()
  }),
  columnHelper.accessor('free_bikes', {
    header: getHeaderWithSorting('free bikes'),
    cell: (info) => info.getValue()
  }),
  columnHelper.accessor('empty_slots', {
    header: getHeaderWithSorting('empty slots'),
    cell: (info) => info.getValue()
  })
]

export { columns }
