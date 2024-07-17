export interface FetchNetworksResponse {
  networks: Network[]
}

export interface Network {
  company: string[]
  href: string
  id: string
  location: Location
  name: string
  source?: string
  gbfs_href?: string
  ebikes?: boolean
  license?: License
}

export interface Location {
  city: string
  country: string
  latitude: number
  longitude: number
}

export interface License {
  name: string
  url: string
}

export interface FetchNetworkStationsResponse {
  network: NetworkWithStations
}

export interface NetworkWithStations {
  company: string[]
  href: string
  id: string
  location: Location
  name: string
  source: string
  stations: Station[]
}

export interface Station {
  empty_slots: number
  extra: Extra
  free_bikes: number
  id: string
  latitude: number
  longitude: number
  name: string
  timestamp: string
}

export interface Extra {
  number: number
  reviews: number
  score: number
  status: string
  uid: string
}

export interface ComboboxItem {
  name: string
  code: string
}
