// src/components/layout/navbar.tsx
'use client';

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image'
import { useAuth } from '../../lib/auth/AuthContext';
import ProfileDropdown from './ProfileDropdown';
import AdminMenu from './AdminMenu';

export default function Navbar() {
  const { user } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const profileButtonRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="bg-white/60 md:bg-white/80 backdrop-blur-sm shadow-none md:shadow-sm border-b border-gray-50">
      <div className="max-w-[95%] mx-auto px-2 sm:px-4">
        <div className="flex justify-between h-14 sm:h-12 items-center">
          <Link href="/" className="font-bold text-lg sm:text-xl flex items-center gap-2">
            <span>Vadim Castro</span>
            <span className="md:hidden bg-blue-100 text-blue-600 text-xs px-1.5 py-0.5 rounded-full font-normal">
              m
            </span>
          </Link>
          <div className="flex items-center">
            <Link href="/resume" className="hover:text-gray-600 transition-colors duration-200 px-2 sm:px-4 md:px-6 text-sm sm:text-base">
              Resume
            </Link>
            <Link href="/projects" className="hover:text-gray-600 transition-colors duration-200 px-2 sm:px-4 md:px-6 text-sm sm:text-base">
              Projects
            </Link>
            {user ? (
              <AdminMenu />
            ) : (
              <div className="relative">
                <button
                  ref={profileButtonRef}
                  onClick={toggleDropdown}
                  className="flex items-center hover:opacity-80 transition-opacity duration-200 pl-2 sm:pl-4 md:pl-6"
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