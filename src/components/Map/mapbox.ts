// mapInstance.ts
import mapboxgl from 'mapbox-gl'
import { Station } from '../../types'
import { getGeoJsonSource, getGeoJsonSourceFromStations } from '@/lib/utils'

class Mapbox {
  private map: mapboxgl.Map | null = null

  createMapInstance(options: mapboxgl.MapOptions) {
    this.map = new mapboxgl.Map(options)
  }

  getMapInstance() {
    return this.map
  }

  updateNetworksDataSource(networks: any[]) {
    if (!this.map) return

    const source = this.map.getSource('networks') as mapboxgl.GeoJSONSource

    if (source) {
      source.setData(getGeoJsonSource(networks))
    } else {
      this.map.addSource('networks', {
        type: 'geojson',
        data: getGeoJsonSource(networks)
      })
    }
  }

  updateStationsDataSource(stations: Station[]) {
    if (!this.map) return

    const source = this.map.getSource('stations') as mapboxgl.GeoJSONSource

    if (source) {
      source.setData(getGeoJsonSourceFromStations(stations))
    } else {
      this.map.addSource('stations', {
        type: 'geojson',
        data: getGeoJsonSourceFromStations(stations)
      })
    }
  }
}

export const mapbox = new Mapbox()
