'use client'
import { Search } from '../Search/Search'
import countries from '@/lib/data/countries.json'
import { filterNetworksBySearchQuery } from '@/lib/utils'
import { useContext, useEffect } from 'react'
import { NetworksListItem } from './NetworksListItem'
import { useRouter, useSearchParams } from 'next/navigation'
import { NetworkContext } from '@/lib/context/networkContext'
import { PAGE_SIZE } from '@/lib/constants'
import { Pagination } from '../Pagination/Pagination'

function usePagination() {}

export function NetworksList() {
  const { allNetworks, networks, currentPage, setCurrentPage, setNetworks } =
    useContext(NetworkContext)
  const router = useRouter()
  const params = useSearchParams()
  const totalPages = Math.ceil(networks.length / PAGE_SIZE)
  const startIndex = (currentPage - 1) * PAGE_SIZE
  const endIndex = startIndex + PAGE_SIZE
  const currentPageItems = networks.slice(startIndex, endIndex)

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search)
    const query = decodeURIComponent(searchParams.get('search') || '')
    const countryFilter = searchParams.get('country')
    const page = parseInt(searchParams.get('page') || '1', 10)
    setFilteredItems(query, countryFilter)
    setCurrentPage(page)
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

  function handlePageChange(page: number) {
    const searchParams = new URLSearchParams(window.location.search)
    searchParams.set('page', page.toString())
    const url = `${window.location.pathname}?${searchParams.toString()}`
    router.push(url)
  }

  return (
    <>
      <Search
        onSearch={handleOnSearch}
        comboBoxItems={countries.data}
        defaultQuery={decodeURIComponent(params.get('search') || '') || undefined}
        defaultFilterValue={params.get('country') ?? undefined}
      />
      <ul>
        {currentPageItems.map(({ id, name, company, location }) => (
          <li key={id}>
            <NetworksListItem id={id} name={name} company={company} location={location} />
          </li>
        ))}
      </ul>
      <Pagination
        pages={Array.from({ length: totalPages }, (_, index) => index + 1)}
        currentPage={currentPage}
        onPageClick={handlePageChange}
      />
    </>
  )
}
