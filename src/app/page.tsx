import { getNetworks } from '@/lib/cityBikeApi'
import { NetworksList } from '@/components/NetworksList'
import { Map } from '@/components/Map'
import { HomeHeader } from '@/components/Header/HomeHeader'
import { NetworkProvider } from '../lib/context/networkContext'

export default async function Home() {
  const networks = await getNetworks()

  return (
    <NetworkProvider intitialValue={networks}>
      <main className="grid grid-cols-[551px_auto] w-screen h-screen">
        <aside className="relative flex flex-col gap-4 h-full overflow-y-scroll p-10">
          <HomeHeader />
          <NetworksList />
        </aside>
        {/* <Map /> */}
      </main>
    </NetworkProvider>
  )
}
