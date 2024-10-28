// src/components/layout/navbar.tsx
'use client';

import { React, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image'
import { useAuth } from '../../lib/auth/AuthContext';
import ProfileDropdown from './ProfileDropdown';

export default function Navbar() {
  const { user } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const profileButtonRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="bg-white/80 backdrop-blur-sm shadow-sm">
      <div className="max-w-[95%] mx-auto px-4">
        <div className="flex justify-between h-12 items-center">
          <Link href="/" className="font-bold text-xl flex items-center">
            <span>Vadim Castro</span>
          </Link>
          <div className="flex items-center">
            <Link href="/resume" className="hover:text-gray-600 transition-colors duration-200 px-6">
              Resume
            </Link>
            <Link href="/projects" className="hover:text-gray-600 transition-colors duration-200 px-6">
              Projects
            </Link>
            {user ? (
              <AdminMenu />
            ) : (
              <div className="relative">
                <button
                  ref={profileButtonRef}
                  onClick={toggleDropdown}
                  className="flex items-center hover:opacity-80 transition-opacity duration-200 pl-6"
                >
                  <div className="relative w-8 h-8 rounded-full overflow-hidden">
                    <Image
                      src="/images/profile.jpg"
                      alt="Profile"
                      fill
                      className="object-cover"
                    />
                  </div>
                </button>
                <ProfileDropdown
                  isOpen={isDropdownOpen}
                  onClose={() => setIsDropdownOpen(false)}
                  profileRef={profileButtonRef}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}