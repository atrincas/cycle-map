import { FormEvent, useState } from 'react'
import { ComboboxItem } from '../../types'
import { Input } from '@/components/ui/input'
import { Combobox } from '../Combobox/Combobox'

interface Props {
  comboBoxItems: ComboboxItem[]
  defaultQuery?: string
  defaultFilterValue?: string
  onSearch: (query: string, filterCode?: string) => void
}

export function Search({ comboBoxItems, defaultQuery, defaultFilterValue, onSearch }: Props) {
  const [query, setQuery] = useState(defaultQuery || '')
  const [filterValue, setFilterValue] = useState(defaultFilterValue || '')

  function handleInputSubmit(e: FormEvent) {
    e.preventDefault()

    onSearch(query, filterValue)
  }

  function handleFilterSelect(v: string) {
    setFilterValue(v)
    onSearch(query, v)
  }

  return (
    <form className="grid grid-cols-[auto_114px] gap-2" onSubmit={handleInputSubmit}>
      <Input
        type="search"
        placeholder="Search network"
        onChange={(e) => setQuery(e.target.value)}
        value={query}
      />
      <Combobox
        items={comboBoxItems}
        onSelect={handleFilterSelect}
        placeholder="Country"
        searchPlaceholder="Search country"
        defaultvalue={filterValue ?? undefined}
      />
    </form>
  )
}
