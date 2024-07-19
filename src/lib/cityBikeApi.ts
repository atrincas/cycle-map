import { FetchNetworkStationsResponse, Network } from '@/types'
import mockNetworks from '@/__mocks__/networks.json'
import mocknetworkStations from '@/__mocks__/networkStations.json'

const BASE_URL = 'http://api.citybik.es/v2/networks'

export async function getNetworks(): Promise<Network[]> {
  if (process.env.NODE_ENV === 'development') return mockNetworks.networks

  try {
    const response = await fetch(BASE_URL)

    if (!response.ok) {
      throw new Error('Failed to fetch networks')
    }

    const data = await response.json()

    return data.networks
  } catch (err) {
    throw new Error('Failed to fetch networks')
  }
}
export async function getNetworkStations(id: string): Promise<FetchNetworkStationsResponse> {
  // if (process.env.NODE_ENV === 'development') return mocknetworkStations.network

  try {
    const response = await fetch(`${BASE_URL}/${id}`)

    if (!response.ok) {
      throw new Error('Failed to fetch network stations')
    }

    const data = await response.json()

    return data.network
  } catch (err) {
    throw new Error('Failed to fetch network stations')
  }
}
