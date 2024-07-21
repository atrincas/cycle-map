'use client'

import { useRef } from 'react'
import { useScrollToTop } from '@/lib/hooks'
import { HomeHeader } from '../components/Header/HomeHeader'
import { NetworksList } from '../components/NetworksList'
import { Map } from '../components/Map'

export function MainView() {
  const asideRef = useRef<HTMLElement>(null)
  const { scrollToTop } = useScrollToTop(asideRef)

  return (
    <main className="grid grid-cols-[551px_auto] w-screen h-screen">
      <aside ref={asideRef} className="relative flex flex-col gap-4 h-full overflow-y-scroll p-10">
        <HomeHeader />
        <NetworksList onPaginationChange={scrollToTop} />
      </aside>
      <Map />
    </main>
  )
}
