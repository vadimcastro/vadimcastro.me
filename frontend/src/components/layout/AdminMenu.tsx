// src/components/layout/AdminMenu.tsx
'use client';

import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { useAuth } from '../../lib/auth/AuthContext';
import Image from 'next/image';
import Link from 'next/link';

interface AdminInfo {
  name: string;
  role: string;
  initials: string;
}

export default function AdminMenu() {
  const { user, logout } = useAuth();

  // Only render for authenticated admin user
  if (!user?.is_superuser) {
    return null;
  }

  // Get admin info from environment variables with fallbacks
  const adminInfo: AdminInfo = {
    name: process.env.NEXT_PUBLIC_ADMIN_NAME || 'Vadim Castro',
    role: process.env.NEXT_PUBLIC_ADMIN_ROLE || 'Administrator',
    initials: process.env.NEXT_PUBLIC_ADMIN_INITIALS || 'VC'
  };

  return (
    <Menu as="div" className="relative ml-1 sm:ml-2 md:ml-3">
      <div>
        <Menu.Button className="relative flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-mint-500 focus:ring-offset-2">
          <span className="sr-only">Open admin menu</span>
          <div className="h-8 w-8 sm:h-9 sm:w-9 rounded-full overflow-hidden ring-2 ring-mint-500">
            <Image
              src="/images/profile.jpg"  // Updated path
              alt={adminInfo.name}
              width={32}
              height={32}
              className="h-full w-full object-cover"
              priority  // Added priority loading
              unoptimized  // Added to bypass image optimization if needed
            />
          </div>
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 sm:w-56 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-4 py-3">
            <p className="text-sm font-medium text-gray-900">{adminInfo.name}</p>
            <p className="text-xs font-medium text-gray-500">{adminInfo.role}</p>
          </div>
          
          <div className="border-t border-gray-200">
            <Menu.Item>
              {({ active }) => (
                <Link
                  href="/vadim"
                  className={`${
                    active ? 'bg-gray-100' : ''
                  } block px-4 py-2 text-sm text-gray-700`}
                >
                  Dashboard
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={logout}
                  className={`${
                    active ? 'bg-gray-100' : ''
                  } block w-full px-4 py-2 text-left text-sm text-gray-700`}
                >
                  Sign out
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}