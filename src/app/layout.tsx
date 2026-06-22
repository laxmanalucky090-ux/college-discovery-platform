import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from '@/components/layout/Navbar';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'College Discovery Platform',
  description: 'Production-ready platform to list, search, and compare colleges.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 text-gray-900 antialiased min-h-screen flex flex-col`}>
          <Navbar />
          <main className="flex-grow container mx-auto px-4 py-8 max-w-7xl">
            {children}
          </main>
          <footer className="border-t bg-white py-6 text-center text-sm text-gray-500">
            © 2026 College Discovery Platform. All rights reserved.
          </footer>
      </body>
    </html>
  );
}