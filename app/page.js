import Link from 'next/link'
import Nav from './components/Nav'

export default function Home() {
  return (
    <div className="space-y-6 px-8 py-8 text-slate-950">
      <Nav/>
      <h1 className="text-3xl text-white font-bold">Welcome to TCR</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link href="/team" className="p-6 bg-blue-100 rounded-lg hover:bg-blue-200 transition">
          <h2 className="text-xl font-semibold">Manage Team</h2>
          <p>Add, edit, or view team</p>
        </Link>
        <Link href="/clients" className="p-6 bg-green-100 rounded-lg hover:bg-green-200 transition">
          <h2 className="text-xl font-semibold">Manage Clients</h2>
          <p>Add, edit, or view clients</p>
        </Link>
        <Link href="/tasks" className="p-6 bg-yellow-100 rounded-lg hover:bg-yellow-200 transition">
          <h2 className="text-xl font-semibold">Manage Tasks</h2>
          <p>Create, assign, or view tasks</p>
        </Link>
      </div>
    </div>
  )
}