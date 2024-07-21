import { beforeEach, describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { Pagination } from '../Pagination'

describe('@components/Pagination', () => {
  let handleOnpageClick: (page: number) => void
  const pages = [0, 1, 2, 3, 4, 5]

  beforeEach(() => {
    handleOnpageClick = vi.fn()
  })

  it('should render the correct buttons', () => {
    render(<Pagination pages={pages} currentPage={pages[1]} onPageClick={handleOnpageClick} />)

    const pageButtons = screen.getAllByRole('button', { name: /Page \d+/i })
    expect(screen.getByRole('button', { name: 'Previous page' })).toHaveTextContent('Previous')
    expect(screen.getByRole('button', { name: 'Next page' })).toHaveTextContent('Next')
    expect(pageButtons).toHaveLength(3)
  })

  it('should call onPageClick when a button is clicked', () => {
    render(<Pagination pages={pages} currentPage={pages[1]} onPageClick={handleOnpageClick} />)

    const pageIndex = 2
    const button = screen.getByRole('button', { name: `Page ${pageIndex + 1}` })

    fireEvent.click(button)

    expect(handleOnpageClick).toHaveBeenCalledWith(pageIndex)
  })
})
