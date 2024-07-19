import { describe, it, expect, vi } from 'vitest'
import { FetchNetworksResponse, FetchNetworkStationsResponse } from '@/types'
import mockNetworks from '@/__mocks__/networks.json'
import mockNetworkStations from '@/__mocks__/networkStations.json'
import { getNetworks, getNetworkStations } from '../cityBikeApi'
import { removeNumberingFromStationNames } from '../utils'

describe('cityBikeApi/getNetworks', () => {
  const apiEndpoint = 'http://api.citybik.es/v2/networks'

  it('should return an array of networks if fetch is successful', async () => {
    const mockResponse: FetchNetworksResponse = mockNetworks
    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse)
    })

    const data = await getNetworks()

    expect(data).toEqual(mockResponse.networks)
    expect(global.fetch).toHaveBeenCalledTimes(1)
    expect(global.fetch).toHaveBeenCalledWith(apiEndpoint)
  })

  it('should trow an error if fetch failed', async () => {
    const errorMessage = 'Failed to fetch networks'

    global.fetch = vi.fn().mockRejectedValueOnce(new Error(errorMessage))

    await expect(getNetworks()).rejects.toThrowError(errorMessage)
    expect(global.fetch).toHaveBeenCalledTimes(1)
    expect(global.fetch).toHaveBeenCalledWith(apiEndpoint)
  })
})

describe('cityBikeApi/getNetworkStations', () => {
  const apiEndpoint = 'http://api.citybik.es/v2/networks/bicincitta-siena'

  it('should return the correct response if fetch is successful', async () => {
    const mockApiResponse = mockNetworkStations
    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockApiResponse)
    })

    const data = await getNetworkStations('bicincitta-siena')

    expect(data).toEqual(removeNumberingFromStationNames(mockApiResponse.network))
    expect(global.fetch).toHaveBeenCalledTimes(1)
    expect(global.fetch).toHaveBeenCalledWith(apiEndpoint)
  })

  it('should throw an error if fetch failed', async () => {
    const errorMessage = 'Failed to fetch network stations'

    global.fetch = vi.fn().mockRejectedValueOnce(new Error(errorMessage))

    await expect(getNetworkStations('bicincitta-siena')).rejects.toThrowError(errorMessage)
    expect(global.fetch).toHaveBeenCalledTimes(1)
    expect(global.fetch).toHaveBeenCalledWith(apiEndpoint)
  })
})
