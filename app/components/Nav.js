import Link from 'next/link'
// import src from './logo-tcr.png'

export default function Nav() {
  return (
            <nav className="container mx-auto flex justify-between items-center text-yellow-400">
              <Link href="/" className="text-2xl font-bold"><img className="w-[10vh] sm:w-[15vh] md:w-[10vh] lg:w-[10vh] xl:w-[15vh]" src="/logo-tcr.png"></img></Link>
              <div className="space-x-4">
                <Link href="/team">Team</Link>
                <Link href="/clients">Clients</Link>
                <Link href="/tasks">Tasks</Link>
              </div>
            </nav>
  )
}