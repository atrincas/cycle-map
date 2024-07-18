import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Header } from '../Header'
import stations from '@/__mocks__/networkStations.json'
import { getCountryName } from '@/lib/utils'

describe('@components/Header', () => {
  const { name, company, location } = stations.network

  it('should render a back button link that will point to the homepage', () => {
    render(<Header name={name} company={company} location={location} />)

    expect(screen.getByRole('link')).toHaveAttribute('href', '/')
  })

  it('should render the correct name, companies and location', () => {
    render(<Header name={name} company={company} location={location} />)

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(name)
    expect(screen.getByText(company.join(', '))).toBeInTheDocument()
    expect(screen.getByText(`${location.city}, ${getCountryName(location.country)}`))
  })
})
