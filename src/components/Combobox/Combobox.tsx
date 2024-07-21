'use client'

import { Check, MapPin as MapPinIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useState } from 'react'
import { ComboboxItem } from '../../types'

interface Props {
  items: ComboboxItem[]
  placeholder?: string
  searchPlaceholder?: string
  defaultvalue?: string
  onSelect: (value: string) => void
}

export function Combobox({ items, placeholder, defaultvalue, searchPlaceholder, onSelect }: Props) {
  const [open, setOpen] = useState<boolean>(false)
  const [value, setValue] = useState<string>(defaultvalue || '')

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between rounded-full text-secondary-foreground h-12 py-2 px-4 overflow-hidden"
        >
          <MapPinIcon className="h-4 w-4 shrink-0 " />
          {value ? items.find((item) => item.value === value)?.label : placeholder || ''}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command
          filter={(value, search) => {
            const label = items.find((item) => item.value === value)?.label.toLowerCase()

            if (value.toLowerCase().includes(search)) return 1
            if (label && label.includes(search)) return 1

            return 0
          }}
        >
          <CommandInput placeholder={searchPlaceholder} />
          <CommandEmpty>Nohting found.</CommandEmpty>
          <CommandGroup>
            <CommandList>
              {items.map((item) => (
                <CommandItem
                  key={item.value}
                  value={item.value}
                  onSelect={(currentValue) => {
                    const nextValue = currentValue === value ? '' : currentValue
                    setValue(nextValue)
                    onSelect(nextValue)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      value === item.value ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                  {item.label}
                </CommandItem>
              ))}
            </CommandList>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
