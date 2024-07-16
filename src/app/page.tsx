import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <main className="flex flex-col justify-center items-center gap-20 p-10">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Hello, world!
      </h1>
      <Button>Click me</Button>
    </main>
  )
}
