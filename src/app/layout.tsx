import type { Metadata } from 'next'
import { Poppins as FontSans } from 'next/font/google'
import { cn } from '@/lib/utils'
import 'mapbox-gl/dist/mapbox-gl.css'
import './globals.css'

const fontSans = FontSans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
})

export const metadata: Metadata = {
  title: 'CycleMap',
  description: 'Discover bike networks'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={cn('bg-background font-sans antialiased', fontSans.variable)}>
        {children}
      </body>
    </html>
  )
}
