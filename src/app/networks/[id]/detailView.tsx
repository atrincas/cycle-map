'use client'

import { BicycleStationsList } from '@/components/BicycleStationsList/BicycleStationsList'
import { Header } from '@/components/Header/Header'
import { StationsMap } from '@/components/Map'
import { getNetworkStations } from '@/lib/cityBikeApi'
import { useQuery } from '@tanstack/react-query'
import { useRef } from 'react'
import { useScrollToTop } from '@/lib/hooks'

interface Props {
  id: string
}

export default function DetailView({ id }: Props) {
  const { data, isError } = useQuery({
    queryKey: ['network', id],
    queryFn: () => getNetworkStations(id),
    refetchInterval: 1000 * 60 * 5, // every 5 minutes
    refetchIntervalInBackground: true
  })
  const asideRef = useRef<HTMLElement>(null)
  const { scrollToTop } = useScrollToTop(asideRef)

  if (isError || !data) {
    // TODO: This should be done in a more nicer way
    return <div>Error occurred while fetching network data.</div>
  }

  return (
    <main className="grid grid-cols-[551px_auto] w-screen h-screen">
      <aside
        ref={asideRef}
        className="relative flex flex-col gap-4 h-full bg-toreabay-800 text-white overflow-y-scroll scroll-smooth"
      >
        <Header name={data.name} company={data.company} location={data.location} />
        <BicycleStationsList data={data.stations} onPaginationChange={scrollToTop} />
      </aside>
      <StationsMap stations={data.stations} />
    </main>
  )
}
