// src/components/dashboard/Sidebar.tsx
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HomeIcon, CurrencyDollarIcon, ClipboardDocumentListIcon, ShoppingBagIcon, Cog6ToothIcon, CogIcon } from '@heroicons/react/24/outline';

const navItems = [
  { name: 'Tableau de bord', href: '/dashboard', icon: HomeIcon },
  { name: 'Transactions', href: '/dashboard/transactions', icon: CurrencyDollarIcon },
  { name: 'Missions', href: '/dashboard/missions', icon: ClipboardDocumentListIcon },
  { name: 'Articles', href: '/dashboard/items', icon: ShoppingBagIcon },
  { name: 'Paramètres', href: '/dashboard/settings', icon: CogIcon },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col w-64 shadow-lg">
      <div className="flex items-center justify-center h-20 shadow-md">
        <h1 className="text-3xl font-bold text-primary">Cashome</h1>
      </div>
      <nav className="flex-grow">
        <ul className="flex flex-col py-4">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link href={item.href}>
                <span className={`flex items-center px-6 py-2 mt-1 hover:text-primary ${
                  pathname === item.href ? 'text-secondary ' : ''
                }`}>
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.name}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}