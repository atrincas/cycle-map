import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { fireEvent, queryHelpers, render, screen } from '@testing-library/react'
import { NetworksList } from '../NetworksList'
import mockNetworks from '@/__mocks__/networks.json'
import { NetworkContext } from '@/lib/context/networkContext'
import { networkContext } from '@/__mocks__/networkContext.mock'

const pushMock = vi.fn()

describe('@components/NetworksList', () => {
  beforeEach(() => {
    vi.mock('next/navigation', () => {
      return {
        useRouter: () => ({
          push: pushMock
        }),
        useSearchParams: () => ({
          get: vi.fn()
        })
      }
    })
  })

  afterEach(() => {
    pushMock.mockClear()
  })

  it('should render a list of NetworksListItems with the correct length', () => {
    render(
      <NetworkContext.Provider value={networkContext}>
        <NetworksList />
      </NetworkContext.Provider>
    )

    const items = screen.getAllByRole('link')
    expect(items).toHaveLength(mockNetworks.networks.length)
  })

  it('should update the query param in the URL', () => {
    render(
      <NetworkContext.Provider value={networkContext}>
        <NetworksList />
      </NetworkContext.Provider>
    )

    const search = 'Cyclopolis'
    const textInput = screen.getByPlaceholderText('Search network')

    fireEvent.change(textInput, { target: { value: search } })
    fireEvent.submit(textInput)

    expect(pushMock).toHaveBeenCalledOnce()
    expect(pushMock).toHaveBeenCalledWith(`/?search=${search}`)
  })

  it('should update the query param in the URL based on selected country from combobox', () => {
    render(
      <NetworkContext.Provider value={networkContext}>
        <NetworksList />
      </NetworkContext.Provider>
    )

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
