// src/app/dashboard/layout.tsx
import React from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession();
  
//   if (!session) {
//     redirect('/login');
//   }

  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 overflow-x-hidden overflow-y-auto">
        <div className="container mx-auto px-6 py-8">
          {children}
        </div>
      </main>
    </div>
  );
}
