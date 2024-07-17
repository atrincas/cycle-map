import { getNetworks } from '@/lib/cityBikeApi'
import { NetworksList } from '@/components/NetworksList'

export default async function Home() {
  const networks = await getNetworks()

  return (
    <main>
      <NetworksList networks={networks} />
    </main>
  )
}
