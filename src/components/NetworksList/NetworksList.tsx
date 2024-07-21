'use client'
import { Search } from '../Search/Search'
import countries from '@/lib/data/countries.json'
import { filterNetworksBySearchQuery } from '@/lib/utils'
import { Suspense, useContext, useEffect } from 'react'
import { NetworksListItem } from './NetworksListItem'
import { useRouter, useSearchParams } from 'next/navigation'
import { NetworkContext } from '@/lib/context/networkContext'
import { NETWORKS_PAGE_SIZE } from '@/lib/constants'
import { Pagination } from '../Pagination/Pagination'

function SearchBar() {
  const { allNetworks, setNetworks } = useContext(NetworkContext)
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
export function NetworksList() {
  const { networks, currentPage, setCurrentPage } = useContext(NetworkContext)
  const totalPages = Math.ceil(networks.length / NETWORKS_PAGE_SIZE)
  const startIndex = currentPage * NETWORKS_PAGE_SIZE
  const endIndex = startIndex + NETWORKS_PAGE_SIZE
  const currentPageItems = networks.slice(startIndex, endIndex)

  return (
    <>
      <Suspense>
        <SearchBar />
      </Suspense>
      <ul>
        {currentPageItems.map(({ id, name, company, location }) => (
          <li key={id}>
            <NetworksListItem id={id} name={name} company={company} location={location} />
          </li>
        ))}
      </ul>
      {totalPages > 1 && (
        <Pagination
          pages={Array.from({ length: totalPages }, (_, index) => index)}
          currentPage={currentPage}
          onPageClick={setCurrentPage}
        />
      )}
    </>
  )
}
