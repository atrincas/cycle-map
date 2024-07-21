import { vi } from 'vitest'
import data from './networks.json'

export const networkContext = {
  allNetworks: data.networks,
  networks: data.networks,
  currentPage: 1,
  setCurrentPage: vi.fn(),
  setNetworks: vi.fn()
}
