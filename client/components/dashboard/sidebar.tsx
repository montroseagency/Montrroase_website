'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X, BarChart3, Users, FileText, CheckSquare, MessageSquare, Settings, LogOut, Home, TrendingUp, Image, Globe, GraduationCap, Wallet as WalletIcon, HelpCircle, ChevronDown, ChevronRight, DollarSign } from 'lucide-react';
import { useAuth } from '@/lib/hooks/useAuth';

interface SubLink {
  href: string;
  label: string;
}

interface NavLink {
  href: string;
  label: string;
  icon: React.ReactNode;
  roles?: ('admin' | 'client' | 'agent')[];
  subLinks?: SubLink[];
}

export function Sidebar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState<string[]>([]);

  const adminLinks: NavLink[] = [
    { href: '/dashboard/admin/overview', label: 'Overview', icon: <Home className="w-5 h-5" />, roles: ['admin'] },
    { href: '/dashboard/admin/clients', label: 'Clients', icon: <Users className="w-5 h-5" />, roles: ['admin'] },
    { href: '/dashboard/admin/agents', label: 'Agents', icon: <Users className="w-5 h-5" />, roles: ['admin'] },
    { href: '/dashboard/admin/content', label: 'Content', icon: <FileText className="w-5 h-5" />, roles: ['admin'] },
    { href: '/dashboard/admin/tasks', label: 'Tasks', icon: <CheckSquare className="w-5 h-5" />, roles: ['admin'] },
    { href: '/dashboard/admin/invoices', label: 'Invoices', icon: <BarChart3 className="w-5 h-5" />, roles: ['admin'] },
    { href: '/dashboard/admin/analytics', label: 'Analytics', icon: <TrendingUp className="w-5 h-5" />, roles: ['admin'] },
    { href: '/dashboard/admin/messages', label: 'Messages', icon: <MessageSquare className="w-5 h-5" />, roles: ['admin'] },
    { href: '/dashboard/admin/settings', label: 'Settings', icon: <Settings className="w-5 h-5" />, roles: ['admin'] },
  ];

  const clientLinks: NavLink[] = [
    {
      href: '/dashboard/client',
      label: 'Dashboard',
      icon: <Home className="w-5 h-5" />,
      roles: ['client']
    },
    {
      href: '/dashboard/client/marketing',
      label: 'Marketing',
      icon: <TrendingUp className="w-5 h-5" />,
      roles: ['client'],
      subLinks: [
        { href: '/dashboard/client/marketing/content', label: 'Content' },
        { href: '/dashboard/client/marketing/tasks', label: 'Tasks' },
        { href: '/dashboard/client/marketing/analytics', label: 'Analytics' },
        { href: '/dashboard/client/marketing/social-accounts', label: 'Social Accounts' },
      ]
    },
    {
      href: '/dashboard/client/website-builder',
      label: 'Website Builder',
      icon: <Globe className="w-5 h-5" />,
      roles: ['client']
    },
    {
      href: '/dashboard/client/courses',
      label: 'Courses',
      icon: <GraduationCap className="w-5 h-5" />,
      roles: ['client']
    },
    {
      href: '/dashboard/client/support',
      label: 'Support',
      icon: <HelpCircle className="w-5 h-5" />,
      roles: ['client']
    },
    {
      href: '/dashboard/client/settings',
      label: 'Settings',
      icon: <Settings className="w-5 h-5" />,
      roles: ['client'],
      subLinks: [
        { href: '/dashboard/client/settings/profile', label: 'Profile' },
        { href: '/dashboard/client/settings/billing', label: 'Billing & Wallet' },
      ]
    },
  ];

  const agentLinks: NavLink[] = [
    {
      href: '/dashboard/agent',
      label: 'Dashboard',
      icon: <Home className="w-5 h-5" />,
      roles: ['agent']
    },
    {
      href: '/dashboard/agent/clients',
      label: 'My Clients',
      icon: <Users className="w-5 h-5" />,
      roles: ['agent']
    },
    {
      href: '/dashboard/agent/tasks',
      label: 'Tasks',
      icon: <CheckSquare className="w-5 h-5" />,
      roles: ['agent']
    },
    {
      href: '/dashboard/agent/content',
      label: 'Content',
      icon: <FileText className="w-5 h-5" />,
      roles: ['agent']
    },
    {
      href: '/dashboard/agent/messages',
      label: 'Messages',
      icon: <MessageSquare className="w-5 h-5" />,
      roles: ['agent']
    },
    {
      href: '/dashboard/agent/settings',
      label: 'Settings',
      icon: <Settings className="w-5 h-5" />,
      roles: ['agent'],
      subLinks: [
        { href: '/dashboard/agent/settings/profile', label: 'Profile' },
      ]
    },
  ];

  const links = user?.role === 'admin' ? adminLinks : user?.role === 'agent' ? agentLinks : clientLinks;

  const isActive = (href: string) => {
    return pathname === href || pathname?.startsWith(href + '/');
  };

  const toggleSection = (href: string) => {
    setExpandedSections(prev =>
      prev.includes(href)
        ? prev.filter(item => item !== href)
        : [...prev, href]
    );
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
          <p className="text-gray-400 text-sm mt-1">
            {user?.role === 'admin' ? 'Admin Panel' : user?.role === 'agent' ? 'Agent Dashboard' : 'Client Portal'}
          </p>
        </div>

        <nav className="px-4 py-6 space-y-1">
          {links.map((link) => (
            <div key={link.href}>
              {link.subLinks ? (
                // Expandable section
                <div>
                  <button
                    onClick={() => toggleSection(link.href)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
                      pathname?.startsWith(link.href)
                        ? 'bg-purple-600 text-white'
                        : 'text-gray-300 hover:bg-gray-800'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      {link.icon}
                      <span className="text-sm font-medium">{link.label}</span>
                    </div>
                    {expandedSections.includes(link.href) ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </button>

                  {expandedSections.includes(link.href) && (
                    <div className="ml-4 mt-1 space-y-1">
                      {link.subLinks.map((subLink) => (
                        <Link
                          key={subLink.href}
                          href={subLink.href}
                          onClick={() => setIsOpen(false)}
                          className={`block px-4 py-2 rounded-lg text-sm transition-colors ${
                            pathname === subLink.href
                              ? 'bg-purple-500 text-white'
                              : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'
                          }`}
                        >
                          {subLink.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                // Regular link
                <Link
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
              )}
            </div>
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
