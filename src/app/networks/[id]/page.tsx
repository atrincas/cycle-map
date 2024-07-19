import { getNetworkStations } from '@/lib/cityBikeApi'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import DetailView from './detailView'

interface DetailPageProps {
  params: {
    id: string
  }
}

export default async function DetailPage({ params }: DetailPageProps) {
  const { id } = params
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['network', id],
    queryFn: () => getNetworkStations(id)
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DetailView id={id} />
    </HydrationBoundary>
  )
}
