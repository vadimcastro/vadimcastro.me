// src/components/layout/navbar.tsx
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  return (
    <nav className="bg-white/80 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between h-16 items-center">
          <Link href="/" className="font-bold text-xl flex items-center space-x-2">
            <span>Vadim Castro</span>
          </Link>
          <div className="flex items-center space-x-8">
            <Link href="/resume" className="hover:text-gray-600 transition-colors duration-200">Resume</Link>
            <Link href="/projects" className="hover:text-gray-600 transition-colors duration-200">Projects</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}