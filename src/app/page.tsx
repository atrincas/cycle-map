import { getNetworks } from '@/lib/cityBikeApi'
import { NetworkProvider } from '@/lib/context/networkContext'
import { MainView } from './mainView'

export default async function Home() {
  const networks = await getNetworks()

  return (
    <NetworkProvider intitialValue={networks}>
      <MainView />
    </NetworkProvider>
  )
}
