import { describe, it, expect } from 'vitest'
import { fireEvent, queryHelpers, render, screen } from '@testing-library/react'
import { NetworksList } from '../NetworksList'
import mockNetworks from '@/__mocks__/networks.json'

describe('@components/NetworksList', () => {
  it('should render a list of NetworksListItems with the correct length', () => {
    render(<NetworksList networks={mockNetworks.networks} />)

    const items = screen.getAllByRole('link')
    expect(items).toHaveLength(mockNetworks.networks.length)
  })

  it('should filter the list based on search query and add query param to URL', () => {
    render(<NetworksList networks={mockNetworks.networks} />)

    const query = 'Cyclopolis'
    const textInput = screen.getByPlaceholderText('Search network')

    fireEvent.change(textInput, { target: { value: query } })
    fireEvent.submit(textInput)

    const items = screen.getAllByRole('link')
    expect(items).toHaveLength(10)
    expect(window.location.search).toEqual(`?query=${query}`)
  })

  it('should filter the list based on selected country from combobox and add query param to URL', () => {
    render(<NetworksList networks={mockNetworks.networks} />)

    const country = 'IT'
    const comboBox = screen.getByRole('combobox')

    fireEvent.click(comboBox)

    const optionsWrapper = screen.getByRole('group')
    const option = queryHelpers.queryAllByAttribute('data-value', optionsWrapper, country)[0]

    fireEvent.click(option)

    const items = screen.getAllByRole('link')
    expect(items).toHaveLength(35)
    expect(window.location.search).toEqual(`?country=${country}`)
  })
})
