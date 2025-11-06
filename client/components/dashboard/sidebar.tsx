'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X, BarChart3, Users, FileText, CheckSquare, MessageSquare, Settings, LogOut, Home, TrendingUp } from 'lucide-react';
import { useAuth } from '@/lib/hooks/useAuth';

interface NavLink {
  href: string;
  label: string;
  icon: React.ReactNode;
  roles?: ('admin' | 'client')[];
}

export function Sidebar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const adminLinks: NavLink[] = [
    { href: '/dashboard/admin/overview', label: 'Overview', icon: <Home className="w-5 h-5" />, roles: ['admin'] },
    { href: '/dashboard/admin/clients', label: 'Clients', icon: <Users className="w-5 h-5" />, roles: ['admin'] },
    { href: '/dashboard/admin/content', label: 'Content', icon: <FileText className="w-5 h-5" />, roles: ['admin'] },
    { href: '/dashboard/admin/tasks', label: 'Tasks', icon: <CheckSquare className="w-5 h-5" />, roles: ['admin'] },
    { href: '/dashboard/admin/invoices', label: 'Invoices', icon: <BarChart3 className="w-5 h-5" />, roles: ['admin'] },
    { href: '/dashboard/admin/analytics', label: 'Analytics', icon: <TrendingUp className="w-5 h-5" />, roles: ['admin'] },
    { href: '/dashboard/admin/messages', label: 'Messages', icon: <MessageSquare className="w-5 h-5" />, roles: ['admin'] },
    { href: '/dashboard/admin/settings', label: 'Settings', icon: <Settings className="w-5 h-5" />, roles: ['admin'] },
  ];

  const clientLinks: NavLink[] = [
    { href: '/dashboard/client/overview', label: 'Overview', icon: <Home className="w-5 h-5" />, roles: ['client'] },
    { href: '/dashboard/client/content', label: 'My Content', icon: <FileText className="w-5 h-5" />, roles: ['client'] },
    { href: '/dashboard/client/tasks', label: 'My Tasks', icon: <CheckSquare className="w-5 h-5" />, roles: ['client'] },
    { href: '/dashboard/client/analytics', label: 'Analytics', icon: <TrendingUp className="w-5 h-5" />, roles: ['client'] },
    { href: '/dashboard/client/billing', label: 'Billing', icon: <BarChart3 className="w-5 h-5" />, roles: ['client'] },
    { href: '/dashboard/client/messages', label: 'Messages', icon: <MessageSquare className="w-5 h-5" />, roles: ['client'] },
    { href: '/dashboard/client/social-accounts', label: 'Social Accounts', icon: <Users className="w-5 h-5" />, roles: ['client'] },
    { href: '/dashboard/client/settings', label: 'Settings', icon: <Settings className="w-5 h-5" />, roles: ['client'] },
  ];

  const links = user?.role === 'admin' ? adminLinks : clientLinks;

  const isActive = (href: string) => {
    return pathname?.startsWith(href);
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-white p-2 rounded-lg shadow-lg"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen w-64 bg-gray-900 text-white transform transition-transform duration-300 z-40 md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6">
          <h1 className="text-2xl font-bold">Montrose</h1>
          <p className="text-gray-400 text-sm mt-1">{user?.role === 'admin' ? 'Admin Panel' : 'Client Portal'}</p>
        </div>

        <nav className="px-4 py-6 space-y-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                isActive(link.href)
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800'
              }`}
            >
              {link.icon}
              <span className="text-sm font-medium">{link.label}</span>
            </Link>
          ))}
        </nav>

        {/* Logout Button */}
        <div className="absolute bottom-6 left-4 right-4">
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
