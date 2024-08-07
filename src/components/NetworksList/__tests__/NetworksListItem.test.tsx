import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { NetworksListItem } from '../NetworksListItem'
import mockNetworks from '@/__mocks__/networks.json'

describe('@components/NetworksList/NetworksListItem', () => {
  const mockItem = mockNetworks.networks[1]

  it('should be wrapped inside a section with role link', () => {
    render(
      <NetworksListItem
        id={mockItem.id}
        name={mockItem.name}
        company={mockItem.company}
        location={mockItem.location}
      />
    )
    expect(screen.getByRole('link')).toBeInTheDocument()
  })

  it('should render the correct name, location, overview of company names, and arrow icon', () => {
    render(
      <NetworksListItem
        id={mockItem.id}
        name={mockItem.name}
        company={mockItem.company}
        location={mockItem.location}
      />
    )

    const name = screen.getByRole('heading', { level: 2 })
    const location = screen.getByText('Siena, Italy')
    const companies = screen.getByText('Comunicare S.r.l.')
    const arrowIcon = screen.getByTestId('arrow-right')

    expect(name).toHaveTextContent(mockItem.name)
    expect(location).toBeInTheDocument()
    expect(companies).toBeInTheDocument()
    expect(arrowIcon).toContainHTML('<title>Arrow right</title>')
  })

  it('should render number of hidden company names if text is truncated', () => {
    const mockCompanies = ['Company name 1', 'Company name 2', 'Company name 3', 'Company name 4']

    render(
      <NetworksListItem
        id={mockItem.id}
        name={mockItem.name}
        company={mockCompanies}
        location={mockItem.location}
      />
    )

    const truncatedTextMessage = screen.getByText('+2')

    expect(truncatedTextMessage).toBeInTheDocument()
  })
})
