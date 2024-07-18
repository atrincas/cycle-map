'use client'
import { Network } from '@/types'
import { Search } from '../Search/Search'
import countries from '@/lib/data/countries.json'
import { filterNetworksBySearchQuery } from '@/lib/utils'
import { useEffect, useState } from 'react'
import { NetworksListItem } from './NetworksListItem'
import { useRouter, useSearchParams } from 'next/navigation'

interface Props {
  networks: Network[]
}

export function NetworksList({ networks }: Props) {
  const router = useRouter()
  const params = useSearchParams()
  const [items, setItems] = useState<Network[]>(networks)

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search)
    const query = decodeURIComponent(searchParams.get('search') || '')
    const countryFilter = searchParams.get('country')
    setFilteredItems(query, countryFilter)
  }, [networks])

  function setFilteredItems(query: string, countryFilter?: string | null) {
    let result = filterNetworksBySearchQuery(networks, query)

    if (countryFilter) {
      result = result.filter((network) => network.location.country === countryFilter)
    }

    setItems(result)
  }

  function handleOnSearch(query: string, countryFilter?: string) {
    const searchParams = new URLSearchParams()

    if (query) {
      searchParams.append('search', encodeURIComponent(query))
    }

    if (countryFilter) {
      searchParams.append('country', countryFilter)
    }

    const url = `${window.location.pathname}?${searchParams.toString()}`

    router.push(url)
  }

  return (
    <div>
      <Search
        onSearch={handleOnSearch}
        comboBoxItems={countries.data}
        defaultQuery={decodeURIComponent(params.get('search') || '') || undefined}
        defaultFilterValue={params.get('country') ?? undefined}
      />
      {items.map(({ id, name, company, location }) => (
        <li key={id}>
          <NetworksListItem id={id} name={name} company={company} location={location} />
        </li>
      ))}
    </div>
  )
}
