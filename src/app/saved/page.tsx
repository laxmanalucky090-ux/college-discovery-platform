'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import CollegeCard from '@/components/colleges/CollegeCard';
import { CollegeCardSkeleton } from '@/components/ui/Skeleton';
import { Heart, GraduationCap, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { College } from '@/types';

export default function SavedCollegesPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  const [savedColleges, setSavedColleges] = useState<College[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Security Check: Redirect unauthenticated guests away instantly
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  // Load favorites directly from the database API
  useEffect(() => {
    async function loadSavedColleges() {
      if (status !== 'authenticated') return;
      
      try {
        const response = await fetch('/api/saved');
        if (response.ok) {
          const data = await response.json();
          setSavedColleges(data.colleges || []);
        }
      } catch (error) {
        console.error('❌ Failed fetching user favorites list rows:', error);
      } finally {
        setIsLoading(false);
      }
    }

    loadSavedColleges();
  }, [status]);

  if (status === 'loading' || isLoading) {
    return (
      <div className="space-y-6 max-w-7xl mx-auto px-2 pt-4">
        <div className="h-8 w-48 bg-gray-200 rounded animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, idx) => (
            <CollegeCardSkeleton key={idx} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-2 py-4">
      
      {/* Page Header */}
      <div className="space-y-2 border-b border-gray-100 pb-5">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight flex items-center gap-2.5">
          <Heart className="h-7 w-7 text-red-500 fill-red-500" />
          Your Shortlisted Colleges
        </h1>
        <p className="text-gray-500 text-sm">
          Review and monitor the selection parameters of your favorite academic paths.
        </p>
      </div>

      {/* Grid List View Output */}
      {savedColleges.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn">
          {savedColleges.map((college) => (
            <CollegeCard 
              key={college.id} 
              college={college} 
              initialSaved={true} 
            />
          ))}
        </div>
      ) : (
        /* Empty Favorites Placeholder Board */
        <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center max-w-md mx-auto shadow-sm space-y-5">
          <div className="mx-auto h-12 w-12 rounded-xl bg-red-50 flex items-center justify-center text-red-500">
            <Heart className="h-6 w-6 stroke-[1.5]" />
          </div>
          <div className="space-y-1">
            <h3 className="font-bold text-gray-900 text-base">Shortlist is Empty</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              You haven't saved any institutions to your profile yet. Browse the catalog to add options here.
            </p>
          </div>
          <Link
            href="/colleges"
            className="w-full inline-flex items-center justify-center px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold shadow-sm transition-all group"
          >
            <span>Explore Colleges</span>
            <ArrowRight className="h-4 w-4 ml-2 transform group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      )}
    </div>
  );
}