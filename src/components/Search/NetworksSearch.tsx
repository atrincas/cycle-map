'use client'
import { NetworkContext } from '@/lib/context/networkContext'
import { filterNetworksBySearchQuery } from '@/lib/utils'
import countries from '@/lib/data/countries.json'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { useContext, useEffect } from 'react'
import { Search } from './Search'

export function NetworksSearch() {
  const { allNetworks, setNetworks, setCurrentPage } = useContext(NetworkContext)
  const router = useRouter()
  const params = useSearchParams()

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search)
    const query = decodeURIComponent(searchParams.get('search') || '')
    const countryFilter = searchParams.get('country')
    let result = filterNetworksBySearchQuery(allNetworks, query)

    if (countryFilter) {
      result = result.filter((network) => network.location.country === countryFilter)
    }

    setNetworks(result)
  }, [params, allNetworks, setNetworks])

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
    setCurrentPage(0)
  }

  return (
    <Search
      onSearch={handleOnSearch}
      comboBoxItems={countries.data}
      defaultQuery={decodeURIComponent(params.get('search') || '') || undefined}
      defaultFilterValue={params.get('country') ?? undefined}
    />
  )
}
