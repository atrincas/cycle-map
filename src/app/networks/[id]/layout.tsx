import Providers from './providers'

export default function DetailPageLayout({ children }: { children: React.ReactNode }) {
  return <Providers>{children}</Providers>
}
