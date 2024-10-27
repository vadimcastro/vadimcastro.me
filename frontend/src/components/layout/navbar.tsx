// src/components/layout/navbar.tsx
'use client';

import Link from 'next/link';
import { LogIn } from 'lucide-react';
import { useAuth } from '../../lib/auth/AuthContext';
import AdminMenu from './AdminMenu';

export default function Navbar() {
  const { user } = useAuth();

  return (
    <nav className="bg-white/80 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between h-16 items-center">
          <Link href="/" className="font-bold text-xl flex items-center space-x-2">
            <span>Vadim Castro</span>
          </Link>
          <div className="flex items-center space-x-8">
            <Link href="/resume" className="hover:text-gray-600 transition-colors duration-200">
              Resume
            </Link>
            <Link href="/projects" className="hover:text-gray-600 transition-colors duration-200">
              Projects
            </Link>
            {user ? (
              <AdminMenu />
            ) : (
              <Link
                href="/login"
                className="flex items-center space-x-2 hover:text-gray-600 transition-colors duration-200"
              >
                <LogIn className="h-5 w-5" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}