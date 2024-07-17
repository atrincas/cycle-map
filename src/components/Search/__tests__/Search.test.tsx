import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { Search } from '../Search'
import countries from '@/lib/countries.json'
import { beforeEach } from 'node:test'

describe('@components/Search', () => {
  let handleOnSearch: (query: string, filterCode?: string) => void

  beforeEach(() => {
    handleOnSearch = vi.fn()
  })

  it('should render a text input and combobox', () => {
    render(<Search comboBoxItems={countries.data} onSearch={handleOnSearch} />)

    const textInput = screen.getByPlaceholderText('Search network')
    // Not sure how shadcn combobox is working so currently use testid:
    const comboBox = screen.getByTestId('search-combo-box')

    expect(textInput).toBeInTheDocument()
    expect(comboBox).toBeInTheDocument()
  })

  it('should handle state internally and call onSearch when text input is submitted or a value in the combobox is selected', () => {
    render(<Search comboBoxItems={countries.data} onSearch={handleOnSearch} />)

    const textInput = screen.getByPlaceholderText('Search network')
    const comboBox = screen.getByTestId('search-combo-box')

    fireEvent.change(textInput, { target: { value: 'random query' } })
    fireEvent.submit(textInput)

    expect(handleOnSearch).toHaveBeenCalledWith('random query', undefined)

    fireEvent.change(comboBox, { target: { value: 'ES' } })

    expect(handleOnSearch).toHaveBeenCalledWith('random query', 'ES')
  })
})
