'use client';

import { Sidebar } from '@/components/Sidebar';
import { AuthProvider } from '@/context/AuthProvider';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <div className="flex">
        <Sidebar />
        {children}
      </div>
    </AuthProvider>
  );
}
