import { Location } from '@/types'

interface Props {
  name: string
  location: Location
  company: string[]
}

export function Header(props: Props) {
  return <div>Header Component</div>
}
