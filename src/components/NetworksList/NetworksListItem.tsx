import { getAdditionalCompaniesCount, getCountryName } from '@/lib/utils'
import { Location } from '@/types'
import Link from 'next/link'

interface Props {
  id: string
  name: string
  company: string[]
  location: Location
}

export function NetworksListItem({ id, name, company, location }: Props) {
  const additionalCompaniesCount = getAdditionalCompaniesCount(company)

  return (
    <Link href={`/${id}`}>
      <h2>{name}</h2>
      <p>
        {location.city}, {getCountryName(location.country)}
      </p>
      <p>{company.join(', ')}</p>
      <div>
        <svg
          data-testid="arrow-right"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
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

      {additionalCompaniesCount && <div>+{additionalCompaniesCount}</div>}
    </Link>
  )
}
