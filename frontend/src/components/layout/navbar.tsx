// src/components/layout/navbar.tsx
'use client';

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '../../lib/auth/AuthContext';
import ProfileDropdown from './ProfileDropdown';
import AdminMenu from './AdminMenu';
import { trackInteraction } from '../../lib/api/analytics';

export default function Navbar() {
  const { user } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const profileButtonRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="w-full bg-white/80 backdrop-blur-md shadow-xs border-b border-gray-200/80 sticky top-0 z-50">
      <div className="w-full max-w-[92%] mx-auto">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link 
              href="/" 
              className="font-heading font-bold text-xl md:text-2xl text-gray-900 tracking-tight hover:text-emerald-600 transition-colors leading-none"
            >
              Vadim Castro
            </Link>
          </div>
          <div className="flex items-center gap-6 md:gap-8">
            <Link 
              href="/projects" 
              className="text-sm md:text-base font-medium text-gray-700 hover:text-emerald-600 transition-colors"
              onClick={() => trackInteraction('project_click', 'navbar')}
            >
              Projects
            </Link>
            <Link 
              href="/resume" 
              className="text-sm md:text-base font-medium text-gray-700 hover:text-emerald-600 transition-colors"
              onClick={() => trackInteraction('resume_view', 'navbar')}
            >
              Resume
            </Link>
            {user ? (
              <AdminMenu />
            ) : (
              <div className="relative">
                <button
                  ref={profileButtonRef}
                  onClick={toggleDropdown}
                  className="flex items-center hover:opacity-80 transition-opacity duration-200"
                  aria-label="Account Menu"
                >
                  <div className="relative w-9 h-9 md:w-10 md:h-10 rounded-full overflow-hidden border-2 border-emerald-500/30 shadow-xs">
                    <Image
                      src="/images/profile.jpg"
                      alt="Profile"
                      fill
                      sizes="40px"
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