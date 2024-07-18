'use client'
import { Search } from '../Search/Search'
import countries from '@/lib/data/countries.json'
import { filterNetworksBySearchQuery } from '@/lib/utils'
import { useContext, useEffect } from 'react'
import { NetworksListItem } from './NetworksListItem'
import { useRouter, useSearchParams } from 'next/navigation'
import { NetworkContext } from '../../lib/context/networkContext'

export function NetworksList() {
  const { allNetworks, networks, setNetworks } = useContext(NetworkContext)
  const router = useRouter()
  const params = useSearchParams()

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search)
    const query = decodeURIComponent(searchParams.get('search') || '')
    const countryFilter = searchParams.get('country')
    setFilteredItems(query, countryFilter)
  }, [params])

  function setFilteredItems(query: string, countryFilter?: string | null) {
    let result = filterNetworksBySearchQuery(allNetworks, query)

    if (countryFilter) {
      result = result.filter((network) => network.location.country === countryFilter)
    }

    setNetworks(result)
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
      {networks.map(({ id, name, company, location }) => (
        <li key={id}>
          <NetworksListItem id={id} name={name} company={company} location={location} />
        </li>
      ))}
    </div>
  )
}
