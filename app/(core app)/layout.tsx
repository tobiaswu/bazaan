'use client';

import { Sidebar } from '@/components/Sidebar';
import { AuthProvider } from '@/context/AuthProvider';

export default function CoreAppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 overflow-auto px-8 py-4">{children}</div>
      </div>
    </AuthProvider>
  );
}
