import classNames from 'classnames'
import { ChevronLeft as ChevronLeftIcon, ChevronRight as ChevronRightIcon } from 'lucide-react'

interface Props {
  pages: number[]
  currentPage: number
  onPageClick: (page: number) => void
  dark?: boolean
}

export function Pagination({ pages, currentPage, dark, onPageClick }: Props) {
  const totalPages = pages.length
  const getPageNumbers = () => {
    if (totalPages <= 2) {
      return pages
    }

    if (currentPage <= 2) {
      return [0, 1, 2]
    }

    if (currentPage === totalPages) {
      return [currentPage - 2, currentPage - 1, currentPage]
    }

    return [currentPage - 1, currentPage, currentPage + 1]
  }

  return (
    <nav className="flex justify-center" aria-label="Pagination">
      <ul className={classNames('flex items-center gap-1', dark && 'dark')}>
        <li>
          <button
            className="page-nav-btn"
            onClick={() => onPageClick(currentPage - 1)}
            disabled={currentPage === 0}
            aria-label="Previous page"
          >
            <ChevronLeftIcon />
            <span>Previous</span>
          </button>
        </li>
        {getPageNumbers().map((page) => (
          <li key={page}>
            <button
              key={`page-number-${page}`}
              className="page-btn"
              onClick={() => onPageClick(page)}
              aria-current={page === currentPage ? 'page' : undefined}
              aria-label={`Page ${page + 1}`}
            >
              <span>{page + 1}</span>
            </button>
          </li>
        ))}
        {pages.length > 3 && currentPage !== totalPages - 1 && (
          <li className="flex items-center text-foreground p-2.5">
            <span>...</span>
          </li>
        )}
        <li>
          <button
            className="page-nav-btn"
            onClick={() => onPageClick(currentPage + 1)}
            disabled={currentPage === totalPages - 1}
            aria-label="Next page"
          >
            <span>Next</span>
            <ChevronRightIcon />
          </button>
        </li>
      </ul>
    </nav>
  )
}
