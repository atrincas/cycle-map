import { afterEach, describe, expect, it, vi } from 'vitest'
import { fireEvent, queryHelpers, render, screen } from '@testing-library/react'
import { Search } from '../Search'
import countries from '@/lib/data/countries.json'
import { beforeEach } from 'node:test'

describe('@components/Search', () => {
  let handleOnSearch: (query: string, filterCode?: string) => void

  beforeEach(() => {
    handleOnSearch = vi.fn()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should render a text input and combobox', () => {
    render(<Search comboBoxItems={countries.data} onSearch={handleOnSearch} />)

    const textInput = screen.getByPlaceholderText('Search network')
    const comboBox = screen.getByRole('combobox')

    expect(textInput).toBeInTheDocument()
    expect(comboBox).toBeInTheDocument()
  })

  it('should set default query and default country if passed as props', () => {
    handleOnSearch = vi.fn()

    render(
      <Search
        comboBoxItems={countries.data}
        onSearch={handleOnSearch}
        defaultQuery="foo"
        defaultFilterValue="ES"
      />
    )

    const textInput = screen.getByPlaceholderText('Search network')
    fireEvent.submit(textInput)

    expect(handleOnSearch).toHaveBeenCalledWith('foo', 'ES')
  })

  it('should handle state internally and call onSearch when text input is submitted or a value in the combobox is selected', () => {
    render(<Search comboBoxItems={countries.data} onSearch={handleOnSearch} />)

    const textInput = screen.getByPlaceholderText('Search network')
    const comboBox = screen.getByRole('combobox')

    fireEvent.change(textInput, { target: { value: 'random query' } })
    fireEvent.submit(textInput)

    expect(handleOnSearch).toHaveBeenCalledWith('random query', undefined)

    fireEvent.click(comboBox)

    const optionsWrapper = screen.getByRole('group')
    const option = queryHelpers.queryAllByAttribute('data-value', optionsWrapper, 'ES')[0]

    fireEvent.click(option)

    expect(handleOnSearch).toHaveBeenCalledWith('random query', 'ES')
  })
})
