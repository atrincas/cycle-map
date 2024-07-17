import { Network } from '../types'

const BASE_URL = 'http://api.citybik.es/v2/networks'

export async function getNetworks(): Promise<Network[]> {
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
export async function getNetworkStations(id: string) {
  try {
    const response = await fetch(`${BASE_URL}/${id}`)

    if (!response.ok) {
      throw new Error('Failed to fetch network stations')
    }

    return await response.json()
  } catch (err) {
    throw new Error('Failed to fetch network stations')
  }
}
