'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { GraduationCap, BookOpen, GitCompare, Heart, LogOut, User } from 'lucide-react';

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm backdrop-blur-md bg-opacity-95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo Brand */}
          <Link href="/" className="flex items-center space-x-2 group">
            <GraduationCap className="h-8 w-8 text-blue-600 group-hover:scale-105 transition-transform" />
            <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              EduCampus
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-1 sm:space-x-4">
            <Link href="/colleges" className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors">
              <BookOpen className="h-4 w-4" />
              <span className="hidden sm:inline">Browse</span>
            </Link>

            <Link href="/compare" className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors">
              <GitCompare className="h-4 w-4" />
              <span className="hidden sm:inline">Compare</span>
            </Link>

            {session ? (
              <>
                <Link href="/saved" className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors">
                  <Heart className="h-4 w-4 text-red-500 fill-red-500" />
                  <span className="hidden sm:inline">Saved</span>
                </Link>
                
                <div className="h-5 w-[1px] bg-gray-200 mx-2 hidden sm:block" />

                <div className="flex items-center space-x-3 pl-2">
                  <div className="flex items-center space-x-1 text-sm font-medium text-gray-600">
                    <User className="h-4 w-4 text-gray-400" />
                    <span className="max-w-[100px] truncate hidden md:inline">{session.user?.name}</span>
                  </div>
                  <button
                    onClick={() => signOut({ callbackUrl: '/' })}
                    className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-white bg-red-500 hover:bg-red-600 shadow-sm transition-all"
                  >
                    <LogOut className="h-4 w-4" />
                    <span className="hidden sm:inline">Logout</span>
                  </button>
                </div>
              </>
            ) : (
              <Link
                href="/login"
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition-all transform hover:-translate-y-0.5"
              >
                Sign In
              </Link>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
}