import * as React from 'react'
import { cn } from '@/lib/utils'
import { Search as SearchIcon } from 'lucide-react'
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <div
        className={cn(
          'flex h-12 items-center rounded-full border border-input bg-white pl-3 text-sm ring-offset-background focus-within:ring-1 focus-within:ring-ring focus-within:ring-offset-2',
          className
        )}
      >
        <SearchIcon className="h-6 w-6 text-toreabay-800" />
        <input
          {...props}
          type="search"
          ref={ref}
          className="w-full rounded-full p-2  placeholder:text-toreabay-600 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
        />
      </div>
    )
  }
)
Input.displayName = 'Input'

export { Input }
