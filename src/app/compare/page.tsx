'use client';

import { useState, useEffect } from 'react';
import ComparisonTable from '@/components/compare/ComparisonTable';
import { Search, GitCompare, GraduationCap, Trash2 } from 'lucide-react';
import { College } from '@/types';

export default function ComparePage() {
  const [collegeA, setCollegeA] = useState<College | null>(null);
  const [collegeB, setCollegeB] = useState<College | null>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<College[]>([]);
  const [activeSlot, setActiveSlot] = useState<'A' | 'B' | null>(null);

  useEffect(() => {
    async function searchColleges() {
      if (searchQuery.trim().length < 2) {
        setSearchResults([]);
        return;
      }

      try {
        const res = await fetch(
          `/api/colleges?search=${encodeURIComponent(searchQuery)}&limit=5`
        );

        if (res.ok) {
          const data = await res.json();
          setSearchResults(data.colleges || []);
        }
      } catch (err) {
        console.error(err);
      }
    }

    const timer = setTimeout(searchColleges, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleSelectCollege = (college: College) => {
    if (activeSlot === 'A') {
      setCollegeA(college);
    } else {
      setCollegeB(college);
    }

    setActiveSlot(null);
    setSearchQuery('');
    setSearchResults([]);
  };

  const handleRemoveCollege = (slot: 'A' | 'B') => {
    if (slot === 'A') setCollegeA(null);
    if (slot === 'B') setCollegeB(null);
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <GitCompare className="h-8 w-8 text-blue-600" />
          <h1 className="text-4xl font-bold">Compare Colleges</h1>
        </div>

        <p className="text-gray-600">
          Compare fees, placements, ratings and locations side-by-side.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-white p-5 rounded-xl shadow border">
          <h3 className="font-semibold mb-3">College A</h3>

          {collegeA ? (
            <div className="flex justify-between items-center">
              <span>{collegeA.name}</span>

              <button
                onClick={() => handleRemoveCollege('A')}
                className="text-red-500"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setActiveSlot('A')}
              className="w-full py-3 rounded-lg bg-blue-600 text-white"
            >
              Select College
            </button>
          )}
        </div>

        <div className="bg-white p-5 rounded-xl shadow border">
          <h3 className="font-semibold mb-3">College B</h3>

          {collegeB ? (
            <div className="flex justify-between items-center">
              <span>{collegeB.name}</span>

              <button
                onClick={() => handleRemoveCollege('B')}
                className="text-red-500"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setActiveSlot('B')}
              className="w-full py-3 rounded-lg bg-blue-600 text-white"
            >
              Select College
            </button>
          )}
        </div>
      </div>

      {activeSlot && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl w-full max-w-lg">
            <div className="p-4 border-b">
              <input
                autoFocus
                type="text"
                placeholder="Search colleges..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full border rounded-lg px-4 py-2"
              />
            </div>

            <div className="max-h-80 overflow-y-auto p-2">
              {searchResults.map((college) => (
                <button
                  key={college.id}
                  onClick={() => handleSelectCollege(college)}
                  className="w-full text-left p-3 hover:bg-gray-100 rounded-lg flex justify-between"
                >
                  <div>
                    <p className="font-medium">{college.name}</p>
                    <p className="text-sm text-gray-500">
                      {college.location}
                    </p>
                  </div>

                  <GraduationCap className="h-5 w-5 text-blue-600" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <ComparisonTable
        collegeA={collegeA}
        collegeB={collegeB}
        onRemoveCollege={handleRemoveCollege}
      />
    </div>
  );
}