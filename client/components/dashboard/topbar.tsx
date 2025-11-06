'use client';

import { useAuth } from '@/lib/hooks/useAuth';
import { Bell, User, ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

export function Topbar() {
  const { user } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const userFullName = `${user?.first_name || ''} ${user?.last_name || ''}`.trim();
  const userInitials = `${user?.first_name?.charAt(0) || ''}${user?.last_name?.charAt(0) || ''}`.toUpperCase();

  return (
    <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 md:ml-64 sticky top-0 z-30">
      {/* Left side - Title */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900">Dashboard</h2>
      </div>

      {/* Right side - Notifications and Profile */}
      <div className="flex items-center space-x-6">
        {/* Notifications */}
        <button className="relative text-gray-600 hover:text-gray-900 transition-colors">
          <Bell className="w-6 h-6" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* Profile Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 transition-colors"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white font-semibold text-sm">
              {userInitials}
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-sm font-medium">{userFullName || 'User'}</p>
              <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <p className="text-sm font-medium text-gray-900">{userFullName || 'User'}</p>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>
              <nav className="p-2">
                <Link
                  href={user?.role === 'admin' ? '/dashboard/admin/settings' : '/dashboard/client/settings'}
                  className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded transition-colors"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  <User className="w-4 h-4" />
                  <span>Settings</span>
                </Link>
              </nav>
              <div className="p-2 border-t border-gray-200">
                <button
                  onClick={() => setIsDropdownOpen(false)}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded transition-colors"
                >
                  Sign out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
