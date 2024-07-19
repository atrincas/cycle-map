'use client'

import { BicycleStationsList } from '@/components/BicycleStationsList/BicycleStationsList'
import { Header } from '@/components/Header/Header'
import { getNetworkStations } from '@/lib/cityBikeApi'
import { useQuery } from '@tanstack/react-query'

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

  if (isError || !data) {
    // TODO: This should be done in a more nicer way
    return <div>Error occurred while fetching network data.</div>
  }

  return (
    <main>
      <Header name={data.name} company={data.company} location={data.location} />
      <BicycleStationsList data={data.stations} />
    </main>
  )
}
