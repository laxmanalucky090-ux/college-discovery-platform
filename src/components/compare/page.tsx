'use client';

import { useState, useEffect } from 'react';
import ComparisonTable from '@/components/compare/ComparisonTable';
import { Search, GitCompare, GraduationCap, Trash2 } from 'lucide-react';
import { College } from '@/types';

export default function ComparePage() {
  // Slots for our selected colleges to compare
  const [collegeA, setCollegeA] = useState<College | null>(null);
  const [collegeB, setCollegeB] = useState<College | null>(null);

  // Search utility configurations
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<College[]>([]);
  const [activeSlot, setActiveSlot] = useState<'A' | 'B' | null>(null);

  // Fetch search results automatically as user types a college name
  useEffect(() => {
    async function searchColleges() {
      if (searchQuery.trim().length < 2) {
        setSearchResults([]);
        return;
      }
      try {
        const res = await fetch(`/api/colleges?search=${encodeURIComponent(searchQuery)}&limit=5`);
        if (res.ok) {
          const data = await res.json();
          setSearchResults(data.colleges || []);
        }
      } catch (err) {
        console.error('Error searching colleges for comparison:', err);
      }
    }

    const delayDebounce = setTimeout(() => {
      searchColleges();
    }, 300); // 300ms debounce to prevent hitting the DB on every single keystroke

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  // Handle assigning a selected college into a slot
  const handleSelectCollege = (college: College) => {
    if (activeSlot === 'A') {
      setCollegeA(college);
    } else if (activeSlot === 'B') {
      setCollegeB(college);
    }
    // Close and reset search module overlay
    setActiveSlot(null);
    setSearchQuery('');
    setSearchResults([]);
  };

  const handleRemoveCollege = (target: 'A' | 'B') => {
    if (target === 'A') setCollegeA(null);
    if (target === 'B') setCollegeB(null);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-2 py-4">
      
      {/* Upper Descriptive Heading Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <h1 className="text-3xl font-extrabold sm:text-4xl text-gray-900 tracking-tight flex items-center justify-center gap-3">
          <GitCompare className="h-8 w-8 text-blue-600" />
          Comparison Matrix Engine
        </h1>
        <p className="text-gray-500 text-sm sm:text-base">
          Select any two premium educational institutions to cross-examine their absolute fee charts, placement packages, and degree curriculum setups side-by-side.
        </p>
      </div>

      {/* Interactive Selection Controller Hub Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
        
        {/* Slot A Trigger */}
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center justify-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Primary College Slot A</span>
          {collegeA ? (
            <div className="flex items-center justify-between w-full bg-blue-50 border border-blue-100 p-3 rounded-lg">
              <span className="text-sm font-semibold text-blue-900 truncate pr-2">{collegeA.name}</span>
              <button onClick={() => handleRemoveCollege('A')} className="text-gray-400 hover:text-red-500 transition-colors">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setActiveSlot('A')}
              className="inline-flex items-center justify-center px-4 py-2 border border-dashed border-gray-300 rounded-lg text-sm font-medium text-blue-600 bg-gray-50 hover:bg-blue-50/80 w-full transition-all"
            >
              <Search className="h-4 w-4 mr-2" /> Search & Load College
            </button>
          )}
        </div>

        {/* Slot B Trigger */}
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center justify-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Secondary College Slot B</span>
          {collegeB ? (
            <div className="flex items-center justify-between w-full bg-blue-50 border border-blue-100 p-3 rounded-lg">
              <span className="text-sm font-semibold text-blue-900 truncate pr-2">{collegeB.name}</span>
              <button onClick={() => handleRemoveCollege('B')} className="text-gray-400 hover:text-red-500 transition-colors">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setActiveSlot('B')}
              className="inline-flex items-center justify-center px-4 py-2 border border-dashed border-gray-300 rounded-lg text-sm font-medium text-blue-600 bg-gray-50 hover:bg-blue-50/80 w-full transition-all"
            >
              <Search className="h-4 w-4 mr-2" /> Search & Load College
            </button>
          )}
        </div>

      </div>

      {/* Dynamic Modal Search Layer Popup Panel Overlay */}
      {activeSlot && (
        <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-50 flex items-start justify-center pt-24 px-4">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl border border-gray-100 overflow-hidden animate-slideUp">
            
            {/* Search Top Input Row */}
            <div className="p-4 border-b border-gray-100 flex items-center relative">
              <Search className="absolute left-7 text-gray-400 h-5 w-5" />
              <input
                type="text"
                autoFocus
                placeholder="Type college name (e.g., IIT Delhi, BITS)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-12 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
              />
              <button 
                onClick={() => { setActiveSlot(null); setSearchQuery(''); }}
                className="absolute right-7 text-xs font-semibold text-gray-400 hover:text-gray-600 transition-colors"
              >
                Cancel
              </button>
            </div>

            {/* Live Search List Selection Group */}
            <div className="max-h-64 overflow-y-auto p-2 divide-y divide-gray-50">
              {searchResults.length > 0 ? (
                searchResults.map((college) => (
                  <button
                    key={college.id}
                    onClick={() => handleSelectCollege(college)}
                    className="w-full text-left p-3 hover:bg-blue-50 rounded-lg flex items-center justify-between transition-colors group"
                  >
                    <div>
                      <p className="text-sm font-bold text-gray-800 group-hover:text-blue-700 transition-colors">{college.name}</p>
                      <p className="text-xs text-gray-400">{college.location}</p>
                    </div>
                    <GraduationCap className="h-4 w-4 text-gray-300 group-hover:text-blue-500 transition-colors" />
                  </button>
                ))
              ) : searchQuery.trim().length >= 2 ? (
                <p className="text-center text-sm text-gray-400 py-6">No matching institution records found.</p>
              ) : (
                <p className="text-center text-xs text-gray-400 py-6">Start typing to see matched database institutions dynamically...</p>
              )}
            </div>

          </div>
        </div>
      )}

      {/* Real-time Render Matrix Component */}
      <ComparisonTable 
        collegeA={collegeA} 
        collegeB={collegeB} 
        onRemoveCollege={handleRemoveCollege} 
      />

    </div>
  );
}