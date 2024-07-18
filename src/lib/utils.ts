import countriesMap from '@/lib/data/countriesMap.json'
import { Network } from '@/types'
import { type ClassValue, clsx } from 'clsx'
import Fuse from 'fuse.js'
import { LngLatBounds, SourceSpecification } from 'mapbox-gl'
import { twMerge } from 'tailwind-merge'
import mapboxgl from 'mapbox-gl'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getCountryName(code: string) {
  const name = countriesMap[code as keyof typeof countriesMap]

  if (!name) {
    console.warn('Unhandled country code:', code)
    return ''
  }

  return name
}

export function getAdditionalCompaniesCount(company: string[]): number | null {
  // This is currently a rough estimate:
  const maxChars = 26

  // Checks if only first company name is going to be visible
  if (company.length > 1 && company[0].length > maxChars) return company.length - 1

  // 2 company names are going to be (partly) visible, so minus 2
  if (company.length > 1) return company.length - 2

  // company length should be 0 or 1 at this point
  return null
}

export function filterNetworksBySearchQuery(networks: Network[], query: string): Network[] {
  if (!query) return networks

  const fuse = new Fuse(networks, {
    keys: ['name', 'company'],
    threshold: 0.4,
    includeScore: true
  })

  return fuse.search(query).map((result) => result.item)
}

export function getBounds(networks: Network[]): LngLatBounds {
  const coordinatesArr = networks.map((n) => ({
    lng: n.location.longitude,
    lat: n.location.latitude
  }))

  return coordinatesArr.reduce(function (bounds, coord) {
    return bounds.extend(coord)
  }, new mapboxgl.LngLatBounds(coordinatesArr[0], coordinatesArr[0]))
}

export function getGeoJsonSource(networks: Network[]): SourceSpecification {
  return {
    type: 'geojson',
    data: {
      type: 'FeatureCollection',
      features: networks.map((n) => ({
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [n.location.longitude, n.location.latitude]
        }
      }))
    }
  }
}
