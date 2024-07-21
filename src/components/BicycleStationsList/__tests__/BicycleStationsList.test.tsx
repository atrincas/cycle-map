import mockData from '@/__mocks__/networkStations.json'
import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { BicycleStationsList } from '../BicycleStationsList'
import { STATIONS_PAGE_SIZE } from '@/lib/constants'

describe('@components/BicycleStationsList', () => {
  it('should render the correct values for the headers', () => {
    render(<BicycleStationsList data={mockData.network.stations} onPaginationChange={vi.fn()} />)

    expect(screen.getByText('station name')).toBeDefined()
    expect(screen.getByText('free bikes')).toBeDefined()
    expect(screen.getByText('empty slots')).toBeDefined()
  })

  it('should render the correct rows', () => {
    render(<BicycleStationsList data={mockData.network.stations} onPaginationChange={vi.fn()} />)

    const rows = screen.getAllByRole('row')
    expect(rows).toHaveLength(STATIONS_PAGE_SIZE + 1) // +1 for header row
  })
})
