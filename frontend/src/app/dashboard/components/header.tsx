// src/app/dashboard/components/header.tsx
import { useAuth } from '../../../lib/auth/AuthContext';
import { Menu, Bell } from 'lucide-react';
import { useState } from 'react';

export function DashboardHeader() {
  const { user, logout } = useAuth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <header className="bg-white shadow">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <button className="px-4 text-gray-500 md:hidden">
              <Menu className="h-6 w-6" />
            </button>
          </div>
          <div className="flex items-center">
            <button className="p-2 text-gray-400 hover:text-gray-500">
              <Bell className="h-6 w-6" />
            </button>
            <div className="ml-3 relative">
              <div>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center max-w-xs rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-mint-500"
                >
                  <span className="sr-only">Open user menu</span>
                  <div className="h-8 w-8 rounded-full bg-mint-500 flex items-center justify-center text-white">
                    {user?.name?.[0] || 'U'}
                  </div>
                </button>
              </div>
              {isProfileOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div className="py-1">
                    <button
                      onClick={logout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}