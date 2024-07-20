import mapboxgl from 'mapbox-gl'
import { Station } from '../../types'

class CustomZoomControl implements mapboxgl.IControl {
  private map: mapboxgl.Map
  private container: HTMLDivElement

  constructor(map: mapboxgl.Map) {
    this.map = map
    this.container = document.createElement('div')
    this.container.className = 'cyclemap-zoom-control'
    this.container.innerHTML = `
      <button class="cyclemap-ctrl-zoom-in" type="button" aria-label="Zoom in" aria-disabled="false"><span class="cyclemap-ctrl-icon" aria-hidden="true" title="Zoom in"></span></button>
      <button class="cyclemap-ctrl-zoom-out" type="button" aria-label="Zoom out" aria-disabled="false"><span class="cyclemap-ctrl-icon" aria-hidden="true" title="Zoom out"></span></button>
    `

    const buttons = this.container.querySelectorAll('button')
    buttons[0].addEventListener('click', () => this.map.zoomIn())
    buttons[1].addEventListener('click', () => this.map.zoomOut())
  }

  onAdd() {
    return this.container
  }

  onRemove() {
    this.container.parentNode?.removeChild(this.container)
  }
}

function getCenterCoordinates(stations: Station[]): [number, number] {
  const latitudes = stations.map((station) => station.latitude)
  const longitudes = stations.map((station) => station.longitude)

  const minLat = Math.min(...latitudes)
  const maxLat = Math.max(...latitudes)
  const minLng = Math.min(...longitudes)
  const maxLng = Math.max(...longitudes)

  const centerLat = (minLat + maxLat) / 2
  const centerLng = (minLng + maxLng) / 2

  return [centerLng, centerLat]
}

export { CustomZoomControl, getCenterCoordinates }
