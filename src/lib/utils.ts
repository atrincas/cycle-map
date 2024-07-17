import countriesMap from '@/lib/data/countriesMap.json'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getCountryName(code: string) {
  const name = countriesMap[code as keyof typeof countriesMap]

  if (!name) {
    console.warn('Unhandled country code:', code)
    return ''
  }

  return name
}

export function getAdditionalCompaniesCount(company: string[]): number | null {
  // This is currently a rough estimate:
  const maxChars = 26

  // Checks if only first company name is going to be visible
  if (company.length > 1 && company[0].length > maxChars) return company.length - 1

  // 2 company names are going to be (partly) visible, so minus 2
  if (company.length > 1) return company.length - 2

  // company length should be 0 or 1 at this point
  return null
}
