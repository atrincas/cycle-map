import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { fireEvent, queryHelpers, render, screen } from '@testing-library/react'
import { NetworksList } from '../NetworksList'
import mockNetworks from '@/__mocks__/networks.json'

const pushMock = vi.fn()

describe('@components/NetworksList', () => {
  beforeEach(() => {
    vi.mock('next/navigation', () => ({
      useRouter: () => ({
        push: pushMock
      })
    }))
  })

  afterEach(() => {
    pushMock.mockClear()
  })

  it('should render a list of NetworksListItems with the correct length', () => {
    render(<NetworksList networks={mockNetworks.networks} />)

    const items = screen.getAllByRole('link')
    expect(items).toHaveLength(mockNetworks.networks.length)
  })

  it('should update the query param in the URL', () => {
    render(<NetworksList networks={mockNetworks.networks} />)

    const search = 'Cyclopolis'
    const textInput = screen.getByPlaceholderText('Search network')

    fireEvent.change(textInput, { target: { value: search } })
    fireEvent.submit(textInput)

    expect(pushMock).toHaveBeenCalledOnce()
    expect(pushMock).toHaveBeenCalledWith(`/?search=${search}`)
  })

  it('should update the query param in the URL based on selected country from combobox', () => {
    render(<NetworksList networks={mockNetworks.networks} />)

    const country = 'IT'
    const comboBox = screen.getByRole('combobox')

    fireEvent.click(comboBox)

    const optionsWrapper = screen.getByRole('group')
    const option = queryHelpers.queryAllByAttribute('data-value', optionsWrapper, country)[0]

    fireEvent.click(option)

    expect(pushMock).toHaveBeenCalledOnce()
    expect(pushMock).toHaveBeenCalledWith(`/?country=${country}`)
  })
})
