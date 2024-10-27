// src/components/layout/AdminMenu.tsx
'use client';

import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { useAuth } from '../../lib/auth/AuthContext';
import Image from 'next/image';
import Link from 'next/link';
import { ADMIN_INFO } from '../../lib/auth/constants';

export default function AdminMenu() {
  const { user, logout } = useAuth();

  // Only render for authenticated admin user
  if (!user?.is_superuser) {
    return null;
  }

  return (
    <Menu as="div" className="relative ml-3">
      <div>
        <Menu.Button className="relative flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-mint-500 focus:ring-offset-2">
          <span className="sr-only">Open admin menu</span>
          <div className="h-9 w-9 rounded-full overflow-hidden">
            {ADMIN_INFO.avatar ? (
              <Image
                src={ADMIN_INFO.avatar}
                alt={ADMIN_INFO.name}
                width={36}
                height={36}
                className="h-full w-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
            ) : (
              <div className="h-full w-full rounded-full bg-mint-500 flex items-center justify-center text-white font-medium">
                {ADMIN_INFO.initials}
              </div>
            )}
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
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-4 py-3">
            <p className="text-sm font-medium text-gray-900">{ADMIN_INFO.name}</p>
            <p className="text-xs font-medium text-gray-500">{ADMIN_INFO.role}</p>
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