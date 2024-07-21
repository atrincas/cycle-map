import { getCountryName } from '@/lib/utils'
import { Location } from '@/types'
import {
  ArrowLeft as ArrowLeftIcon,
  BriefcaseBusiness as BriefcaseBusinessIcon,
  MapPin as MapPinIcon
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import bicycles from '@/assets/bicycles.jpeg'

interface Props {
  name: string
  location: Location
  company: string[]
}

export function Header({ name, location, company }: Props) {
  return (
    <header className="relative py-8 px-10">
      <div className="absolute top-0 left-0 w-full h-full z-10 bg-gradient-to-t from-toreabay-800 to-transparent"></div>
      <Image
        alt="Bicycles"
        src={bicycles}
        quality={100}
        fill
        sizes="100vw"
        style={{
          objectFit: 'cover'
        }}
      />
      <div className="relative flex flex-col items-start z-20">
        <Link
          className="flex items-center bg-white w-10 h-10 rounded-full py-1 px-2 mb-10"
          href="/"
        >
          <span>
            <ArrowLeftIcon className="text-grenadier-400" />
          </span>
        </Link>
        <h1 className="font-bold text-3xl leading-8 mb-2">{name}</h1>
        <div className="text-toreabay-100 text-base">
          <p className="flex items-center gap-2 mb-2">
            <MapPinIcon className="w-4 h-4 shrink-0" />
            <span className="text-sm leading-7">
              {location.city}, {getCountryName(location.country)}
            </span>
          </p>
          <p className="flex items-center gap-2">
            <BriefcaseBusinessIcon strokeWidth={1} className="w-4 h-4 shrink-0" />
            <span className="leading-5">{company.join(', ')}</span>
          </p>
        </div>
      </div>
    </header>
  )
}
