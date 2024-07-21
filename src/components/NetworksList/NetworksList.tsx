'use client'
import { NETWORKS_PAGE_SIZE } from '@/lib/constants'
import { NetworkContext } from '@/lib/context/networkContext'
import { Suspense, useContext, useEffect } from 'react'
import { Pagination } from '../Pagination/Pagination'
import { NetworksSearch } from '../Search/NetworksSearch'
import { NetworksListItem } from './NetworksListItem'

interface Props {
  onPaginationChange: () => void
}

export function NetworksList({ onPaginationChange }: Props) {
  const { networks, currentPage, setCurrentPage } = useContext(NetworkContext)
  const totalPages = Math.ceil(networks.length / NETWORKS_PAGE_SIZE)
  const startIndex = currentPage * NETWORKS_PAGE_SIZE
  const endIndex = startIndex + NETWORKS_PAGE_SIZE
  const currentPageItems = networks.slice(startIndex, endIndex)

  useEffect(() => {
    onPaginationChange()
  }, [currentPage, onPaginationChange])

  return (
    <>
      <Suspense>
        <NetworksSearch />
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
