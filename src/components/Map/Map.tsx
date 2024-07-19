'use client'
import { NetworkContext } from '@/lib/context/networkContext'
import { getBounds, getGeoJsonSource, getGeoJsonSourceFromStations } from '@/lib/utils'
import mapboxgl from 'mapbox-gl'
import { useContext, useEffect, useRef } from 'react'
import mapStyle from './style.json'
import { Station } from '../../types'

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || ''

export function Map() {
  const { networks } = useContext(NetworkContext)
  const mapContainer = useRef(null)
  const map = useRef<mapboxgl.Map | null>(null)

  useEffect(() => {
    map.current = new mapboxgl.Map({
      container: mapContainer.current!,
      style: mapStyle as any,
      center: [-71.363, 44.475],
      zoom: 2,
      projection: {
        name: 'mercator',
        center: [0, 30],
        parallels: [30, 30]
      }
    })

    map.current?.on('load', function () {
      if (!map.current?.getSource('networks')) {
        map.current?.addSource('networks', getGeoJsonSource(networks))
      }

      if (!map.current?.getLayer('networks')) {
        map.current?.addLayer({
          id: 'networks',
          type: 'circle',
          source: 'networks',
          paint: {
            'circle-radius': 4,
            'circle-stroke-width': 1,
            'circle-color': 'hsla(19, 88%, 61%, 0.6)',
            'circle-stroke-color': 'hsla(19, 88%, 61%, 1)'
          }
        })
      }
    })
  }, [])

  useEffect(() => {
    if (!map.current || networks.length === 0) return

    map.current?.fitBounds(getBounds(networks), {
      padding: { top: 20, right: 20, bottom: 20, left: 20 }
    })
  }, [networks])

  return (
    <div className="relative">
      <div ref={mapContainer} className="absolute top-0 bottom-0 w-full"></div>
    </div>
  )
}

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

interface StationsMapProps {
  stations: Station[]
}

export function StationsMap({ stations }: StationsMapProps) {
  const mapContainer = useRef(null)
  const map = useRef<mapboxgl.Map | null>(null)

  useEffect(() => {
    map.current = new mapboxgl.Map({
      container: mapContainer.current!,
      style: mapStyle as any,
      center: getCenterCoordinates(stations),
      zoom: 9,
      projection: {
        name: 'mercator',
        center: [0, 30],
        parallels: [30, 30]
      }
    })

    map.current?.on('load', function () {
      if (!map.current?.getSource('networks')) {
        map.current?.addSource('networks', getGeoJsonSourceFromStations(stations))
      }

      if (!map.current?.getLayer('networks')) {
        map.current?.addLayer({
          id: 'networks',
          type: 'circle',
          source: 'networks',
          paint: {
            'circle-radius': 4,
            'circle-stroke-width': 1,
            'circle-color': 'hsla(19, 88%, 61%, 0.6)',
            'circle-stroke-color': 'hsla(19, 88%, 61%, 1)'
          }
        })
      }

      map.current?.on('click', 'networks', (e) => {
        const coordinates = e.features[0].geometry.coordinates.slice()
        const description = e.features[0].properties.description

        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360
        }

        new mapboxgl.Popup().setLngLat(coordinates).setHTML(description).addTo(map.current!)
      })

      map.current?.on('mouseenter', 'networks', () => {
        map.current?.getCanvas().style.setProperty('cursor', 'pointer')
      })

      map.current?.on('mouseleave', 'networks', () => {
        map.current?.getCanvas().style.setProperty('cursor', '')
      })

      let zoomControl = new CustomZoomControl(map.current!)
      map.current?.addControl(zoomControl, 'top-right')
    })

    return () => map.current?.remove()
  }, [])

  useEffect(() => {
    if (!map.current || stations.length === 0) return

    const padding = 40
    map.current?.fitBounds(getBounds(stations), {
      padding: { top: padding, right: padding, bottom: padding, left: padding }
    })
  }, [stations])

  return (
    <div className="relative">
      <div ref={mapContainer} className="absolute top-0 bottom-0 w-full"></div>
    </div>
  )
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
