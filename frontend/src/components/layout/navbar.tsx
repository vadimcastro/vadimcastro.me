// src/components/layout/navbar.tsx
import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between h-16 items-center">
          <Link href="/" className="font-bold text-xl">
            Vadim Castro
          </Link>
          <div className="space-x-8">
            <Link href="/projects" className="hover:text-gray-600">Projects</Link>
            <Link href="/cloud" className="hover:text-gray-600">Cloud</Link>
            <Link href="/catalog" className="hover:text-gray-600">Catalog</Link>
          </div>
        </div>
      </div>
    </nav>
  )
}