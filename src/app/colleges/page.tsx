'use client';

import { useState, useEffect, useCallback } from 'react';
import SearchBar from '@/components/colleges/SearchBar';
import CollegeCard from '@/components/colleges/CollegeCard';
import Pagination from '@/components/colleges/Pagination';
import { CollegeCardSkeleton } from '@/components/ui/Skeleton';
import { Search, GraduationCap } from 'lucide-react';
import { College } from '@/types';

export default function CollegesPage() {
  // State management for search filtering query matrix parameters
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  
  // Data load metrics
  const [colleges, setColleges] = useState<College[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  // Debounced search trigger reset
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, locationFilter]);

  // Unified API fetching execution logic hook wrapper
  const fetchColleges = useCallback(async () => {
    setIsLoading(true);
    try {
      const url = `/api/colleges?search=${encodeURIComponent(searchQuery)}&location=${encodeURIComponent(locationFilter)}&page=${currentPage}&limit=6`;
      const response = await fetch(url);
      
      if (response.ok) {
        const data = await response.json();
        setColleges(data.colleges || []);
        setTotalPages(data.pagination?.totalPages || 1);
      }
    } catch (error) {
      console.error('❌ Failed fetching college catalog rows matrix:', error);
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery, locationFilter, currentPage]);

  // Execute database query load parameters whenever filters shuffle indexes
  useEffect(() => {
    fetchColleges();
  }, [fetchColleges]);

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-2">
      
      {/* Dynamic Upper Hero Content Section */}
      <div className="text-center max-w-2xl mx-auto space-y-3 pt-4">
        <h1 className="text-3xl font-extrabold sm:text-4xl text-gray-900 tracking-tight">
          Discover Your Dream College
        </h1>
        <p className="text-gray-500 text-sm sm:text-base">
          Filter through premier institutions based on locations, actual curriculum courses, real fee values, and verified career placement milestones.
        </p>
      </div>

      {/* Interactive Operational Filters Section Toolbar UI */}
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        locationFilter={locationFilter}
        setLocationFilter={setLocationFilter}
      />

      {/* Core Dynamic Listing Node Layer Render Output */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <CollegeCardSkeleton key={index} />
          ))}
        </div>
      ) : colleges.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn">
            {colleges.map((college) => (
              <CollegeCard key={college.id} college={college} />
            ))}
          </div>

          {/* Unified Pagination Layout Navigator Row */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </>
      ) : (
        /* Empty Parameter Query Match Alert Board Graphic Element */
        <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center max-w-md mx-auto shadow-sm space-y-4">
          <div className="mx-auto h-12 w-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
            <Search className="h-6 w-6 stroke-[1.5]" />
          </div>
          <div className="space-y-1">
            <h3 className="font-bold text-gray-900 text-base">No Colleges Discovered</h3>
            <p className="text-sm text-gray-500">
              We couldn't match any institutions matching "{searchQuery || locationFilter}". Try widening your search filters.
            </p>
          </div>
          <button
            onClick={() => { setSearchQuery(''); setLocationFilter(''); }}
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100 transition-colors"
          >
            Clear Search Filters
          </button>
        </div>
      )}
    </div>
  );
}