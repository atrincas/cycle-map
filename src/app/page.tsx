import { getNetworks } from '@/lib/cityBikeApi'
import { NetworksList } from '@/components/NetworksList'
import { Map } from '@/components/Map'
import { HomeHeader } from '@/components/Header/HomeHeader'

export default async function Home() {
  const networks = await getNetworks()

  return (
    <main className="grid grid-cols-[551px_auto] w-screen h-screen">
      <aside className="relative h-full overflow-y-scroll">
        <HomeHeader />
        <NetworksList networks={networks} />
      </aside>
      <Map networks={networks} />
    </main>
  )
}
