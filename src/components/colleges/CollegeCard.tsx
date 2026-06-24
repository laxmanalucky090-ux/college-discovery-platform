'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { MapPin, Star, IndianRupee, Briefcase, Heart, ArrowRight } from 'lucide-react';
import { College } from '@/types';

interface CollegeCardProps {
  college: College;
  initialSaved?: boolean;
}

export default function CollegeCard({ college, initialSaved = false }: CollegeCardProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const [isSaved, setIsSaved] = useState(initialSaved);
  const [isMutating, setIsMutating] = useState(false);

  const toggleSave = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!session) {
      router.push('/login');
      return;
    }
    setIsMutating(true);
    try {
      const response = await fetch('/api/saved', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ collegeId: college.id }),
      });
      if (response.ok) setIsSaved(!isSaved);
    } catch (error) {
      console.error('❌ Failed to toggle favorite status:', error);
    } finally {
      setIsMutating(false);
    }
  };

  const formattedFees = (college.fees / 100000).toFixed(1);

  return (
    <div className="group bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col overflow-hidden relative">
      <div className="h-2 bg-gradient-to-r from-blue-500 to-indigo-600" />
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start gap-4 mb-2">
          <h3 className="font-bold text-lg text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
            {college.name}
          </h3>
          <button
            onClick={toggleSave}
            disabled={isMutating}
            className={`p-2.5 rounded-xl border transition-all shadow-sm ${
              isSaved ? 'bg-red-50 border-red-200 text-red-500' : 'bg-gray-50 border-gray-200 text-gray-400 hover:text-red-500 hover:bg-red-50'
            }`}
          >
            <Heart className={`h-4 w-4 ${isSaved ? 'fill-red-500' : ''}`} />
          </button>
        </div>
        <div className="flex items-center space-x-4 mb-4 text-sm text-gray-500">
          <div className="flex items-center space-x-1">
            <MapPin className="h-4 w-4 text-gray-400" />
            <span>{college.location}</span>
          </div>
          <div className="flex items-center space-x-1 bg-amber-50 px-2 py-0.5 rounded-md text-amber-700 font-semibold text-xs border border-amber-100">
            <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
            <span>{college.rating.toFixed(1)}</span>
          </div>
        </div>
        <p className="text-gray-600 text-sm mb-6 line-clamp-3 flex-grow leading-relaxed">
          {college.overview}
        </p>
        <div className="grid grid-cols-2 gap-4 border-t border-gray-100 pt-4 mb-6">
          <div className="space-y-0.5">
            <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">Avg Fees</span>
            <div className="flex items-center text-gray-900 font-semibold">
              <IndianRupee className="h-3.5 w-3.5 mr-0.5 text-gray-500" />
              <span>₹{formattedFees}L / yr</span>
            </div>
          </div>
          <div className="space-y-0.5">
            <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">Avg Placement</span>
            <div className="flex items-center text-emerald-600 font-bold">
              <Briefcase className="h-3.5 w-3.5 mr-1 text-emerald-500" />
              <span>{college.placement.toFixed(1)} LPA</span>
            </div>
          </div>
        </div>
        <Link
          href={`/colleges/${college.id}`}
          className="w-full inline-flex items-center justify-center px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 bg-gray-50 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-200 group/btn shadow-sm"
        >
          <span>View Complete Details</span>
          <ArrowRight className="h-4 w-4 ml-2 transform group-hover/btn:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}