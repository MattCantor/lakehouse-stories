import Link from "next/link"

const navigation = [
  { name: 'Table of Contents', href: '/toc' },
  { name: 'Characters', href: '#' },
  { name: 'Mr. Finnigan\'s Diary', href: '#' },
]

export default function Navbar() {

  return (
    <header className="bg-black">
      <nav className="mx-auto flex items-center justify-between p-4 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href="./" className="text-sm font-semibold leading-6 text-slate-200">
            The Lakehouse Stories
          </Link>
        </div>

        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <Link key={item.name} href={item.href} className="text-sm font-semibold leading-6 text-slate-200">
              {item.name}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  )
}
