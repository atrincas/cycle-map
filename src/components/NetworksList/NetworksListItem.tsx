import { getAdditionalCompaniesCount, getCountryName } from '@/lib/utils'
import { Location } from '@/types'
import Link from 'next/link'
import { Briefcase as BriefcaseIcon, MapPin as MapPinIcon } from 'lucide-react'

interface Props {
  id: string
  name: string
  company: string[]
  location: Location
}

export function NetworksListItem({ id, name, company, location }: Props) {
  const additionalCompaniesCount = getAdditionalCompaniesCount(company)

  return (
    <Link href={`/${id}`} legacyBehavior>
      <article
        role="link"
        tabIndex={0}
        className="relative block px-4 py-2 rounded-[2px] border-b border-toreabay-100 hover:bg-toreabay-100 transition-colors cursor-pointer group"
      >
        <h2 className="font-bold text-xl leading-7 text-toreabay-800 mb-1">{name}</h2>
        <p className="flex items-center gap-2 mb-2">
          <span className="flex justify-center items-center bg-toreabay-50 w-6 h-6 rounded-s">
            <MapPinIcon className="w-4 h-4 text-grenadier-400" />
          </span>
          <span className="text-sm leading-7 text-muted-foreground">
            {location.city}, {getCountryName(location.country)}
          </span>
        </p>
        <p className="flex items-center gap-2">
          <span className="flex justify-center items-center bg-toreabay-50 w-6 h-6 rounded-s">
            <BriefcaseIcon className="w-4 h-4 text-grenadier-400" />
          </span>
          <span className="text-sm leading-7 text-muted-foreground whitespace-nowrap overflow-hidden text-ellipsis max-w-[236px]">
            {company.join(', ')}
          </span>
          {additionalCompaniesCount && (
            <span className="border border-grenadier-400 text-grenadier-400 text-sm rounded-[2px] px-1.5 py-1">
              +{additionalCompaniesCount}
            </span>
          )}
        </p>
        <div className="absolute h-10 bottom-2 right-2 text-grenadier-500 flex items-center gap-1 rounded-[43px] px-4 py-1 overflow-hidden">
          <div className="absolute inset-0 bg-white rounded-[43px] translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></div>
          <div className="opacity-0 translate-x-full group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-out relative">
            Details
          </div>
          <svg
            data-testid="arrow-right"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="relative transition-transform duration-500 ease-out group-hover:-translate-x-1"
          >
            <title>Arrow right</title>
            <path
              d="M4.16659 10L15.8333 10M15.8333 10L9.99992 4.16668M15.8333 10L9.99992 15.8333"
              stroke="#F0581F"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </article>
    </Link>
  )
}
