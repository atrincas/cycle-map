import { getCountryName } from '@/lib/utils'
import { Location } from '@/types'
import { Briefcase as BriefcaseIcon, MapPin as MapPinIcon } from 'lucide-react'
import Link from 'next/link'

interface Props {
  name: string
  location: Location
  company: string[]
}

export function Header({ name, location, company }: Props) {
  return (
    <header>
      <Link href="/"></Link>
      <h1>{name}</h1>
      <p className="flex items-center gap-2 mb-2">
        <MapPinIcon className="w-4 h-4" />
        <span className="text-sm leading-7 text-muted-foreground">
          {location.city}, {getCountryName(location.country)}
        </span>
      </p>
      <p className="flex items-center gap-2">
        <BriefcaseIcon className="w-4 h-4" />
        <span>{company.join(', ')}</span>
      </p>
    </header>
  )
}
