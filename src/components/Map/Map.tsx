'use client'
import mapboxgl from 'mapbox-gl'
import { useEffect, useRef, useState } from 'react'
import { getBounds, getGeoJsonSource } from '@/lib/utils'
import { Network } from '@/types'
import mapStyle from './style.json'

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || ''

interface Props {
  networks: Network[]
}

export function Map({ networks }: Props) {
  const mapContainer = useRef(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const [lng, setLng] = useState(-71.363)
  const [lat, setLat] = useState(44.475)
  const [zoom, setZoom] = useState(2)

  useEffect(() => {
    map.current = new mapboxgl.Map({
      container: mapContainer.current!,
      style: mapStyle as any,
      center: [lng, lat],
      zoom: zoom,
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

      map.current?.fitBounds(getBounds(networks), {
        padding: { top: 20, right: 20, bottom: 20, left: 20 }
      })
    })
  }, [])

  return (
    <div className="relative">
      <div ref={mapContainer} className="absolute top-0 bottom-0 w-full"></div>
    </div>
  )
}
