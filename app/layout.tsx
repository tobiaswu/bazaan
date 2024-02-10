'use client';

import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import { useEffect } from 'react';
import { initJuno } from '@junobuild/core-peer';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    (async () =>
      await initJuno({
        satelliteId: 'zqaj2-eqaaa-aaaal-adpdq-cai',
      }))();
  }, []);

  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
