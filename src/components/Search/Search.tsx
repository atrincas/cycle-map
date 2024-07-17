import { ComboboxItem } from '../../types'

interface Props {
  comboBoxItems: ComboboxItem[]
  defaultQuery?: string
  defaultQountry?: string
  onSearch: (query: string, filterCode?: string) => void
}

export function Search(props: Props) {
  return <div>Search Component</div>
}
