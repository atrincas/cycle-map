import mockData from '@/__mocks__/networkStations.json'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { BicycleStationsList } from '../BicycleStationsList'

describe('@components/BicycleStationsList', () => {
  it('should render the correct values for the headers', () => {
    render(<BicycleStationsList data={mockData.network.stations} />)

    expect(screen.getByText('station name')).toBeDefined()
    expect(screen.getByText('free bikes')).toBeDefined()
    expect(screen.getByText('empty slots')).toBeDefined()
  })

  it('should render the correct rows', () => {
    render(<BicycleStationsList data={mockData.network.stations} />)

    const rows = screen.getAllByRole('row')
    expect(rows).toHaveLength(mockData.network.stations.length + 1) // +1 for header row
  })
})
