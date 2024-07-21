import { ChevronLeft as ChevronLeftIcon, ChevronRight as ChevronRightIcon } from 'lucide-react'

interface Props {
  pages: number[]
  currentPage: number
  onPageClick: (page: number) => void
}

export function Pagination({ pages, currentPage, onPageClick }: Props) {
  const totalPages = pages.length
  const getPageNumbers = () => {
    if (totalPages <= 3) {
      return pages
    }

    if (currentPage <= 3) {
      return [1, 2, 3]
    }

    if (currentPage === totalPages) {
      return [currentPage - 2, currentPage - 1, currentPage]
    }

    return [currentPage - 1, currentPage, currentPage + 1]
  }

  return (
    <nav aria-label="Pagination">
      <ul className="flex items-center gap-1">
        <li>
          <button
            className="flex items-center gap-1 text-foreground text-sm font-semibold rounded py-2 px-4 hover:bg-toreabay-50"
            onClick={() => onPageClick(currentPage - 1)}
            disabled={currentPage === 1}
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
              aria-label={`Page ${page}`}
            >
              <span>{page}</span>
            </button>
          </li>
        ))}
        {currentPage !== totalPages && (
          <li className="flex items-center text-foreground p-2.5">
            <span>...</span>
          </li>
        )}
        <li>
          <button
            className="flex items-center gap-1 text-foreground text-sm font-semibold rounded py-2 px-4 hover:bg-toreabay-50"
            onClick={() => onPageClick(currentPage + 1)}
            disabled={currentPage === totalPages}
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
