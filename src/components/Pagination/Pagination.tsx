interface Props {
  pages: number[]
  currentPage: number
  onPageClick: (page: number) => void
}

export function Pagination({ pages, currentPage, onPageClick }: Props) {
  return (
    <nav aria-label="Pagination">
      <ul>
        <li>
          <button
            onClick={() => onPageClick(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Previous page"
          >
            Previous
          </button>
        </li>
        {pages.map((page) => (
          <li key={page}>
            <button
              onClick={() => onPageClick(page)}
              aria-current={page === currentPage ? 'page' : undefined}
              aria-label={`Page ${page}`}
            >
              {page}
            </button>
          </li>
        ))}
        <li>
          <button
            onClick={() => onPageClick(currentPage + 1)}
            disabled={currentPage === pages[pages.length - 1]}
            aria-label="Next page"
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  )
}
