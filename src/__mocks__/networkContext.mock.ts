import { vi } from 'vitest'
import data from './networks.json'

export const networkContext = {
  allNetworks: data.networks,
  networks: data.networks,
  setNetworks: vi.fn()
}
