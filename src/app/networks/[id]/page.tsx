import { BicycleStationsList } from '@/components/BicycleStationsList/BicycleStationsList'
import data from '@/__mocks__/networkStations.json'
export default function NetworkPage() {
  return (
    <main>
      <BicycleStationsList data={data.network.stations} />
    </main>
  )
}
