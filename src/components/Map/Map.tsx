'use client'
import { NetworkContext } from '@/lib/context/networkContext'
import { getBounds, getGeoJsonSource } from '@/lib/utils'
import mapboxgl from 'mapbox-gl'
import { useContext, useEffect, useRef } from 'react'
import mapStyle from './style.json'

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
