'use client';

import { Check, X, MapPin, Star, IndianRupee, Briefcase, GraduationCap } from 'lucide-react';
import { College } from '@/types';

interface ComparisonTableProps {
  collegeA: College | null;
  collegeB: College | null;
  onRemoveCollege: (target: 'A' | 'B') => void;
}

export default function ComparisonTable({ collegeA, collegeB, onRemoveCollege }: ComparisonTableProps) {
  
  // Clean formatting wrappers
  const formatFees = (fees: number | undefined) => 
    fees ? `₹${(fees / 100000).toFixed(1)} Lakhs / year` : '—';
  
  const formatPlacement = (placement: number | undefined) => 
    placement ? `${placement.toFixed(1)} LPA Avg Package` : '—';

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden max-w-5xl mx-auto">
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200">
            <th className="p-4 sm:p-6 text-sm font-semibold text-gray-500 uppercase tracking-wider w-1/3">Features Criteria</th>
            
            {/* College Slot A Header */}
            <th className="p-4 sm:p-6 w-1/3 border-l border-gray-200 relative group">
              {collegeA ? (
                <div>
                  <button
                    onClick={() => onRemoveCollege('A')}
                    className="absolute top-4 right-4 p-1 rounded-full bg-gray-100 text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors"
                    title="Remove item"
                  >
                    <X className="h-4 w-4" />
                  </button>
                  <h4 className="font-bold text-base text-gray-900 pr-6 line-clamp-2">{collegeA.name}</h4>
                  <p className="text-sm text-gray-500 flex items-center mt-1">
                    <MapPin className="h-3.5 w-3.5 mr-1" /> {collegeA.location}
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-4 text-center text-gray-400">
                  <GraduationCap className="h-8 w-8 mb-2 stroke-1 text-gray-300" />
                  <span className="text-xs font-medium">Select first college above</span>
                </div>
              )}
            </th>

            {/* College Slot B Header */}
            <th className="p-4 sm:p-6 w-1/3 border-l border-gray-200 relative group">
              {collegeB ? (
                <div>
                  <button
                    onClick={() => onRemoveCollege('B')}
                    className="absolute top-4 right-4 p-1 rounded-full bg-gray-100 text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors"
                    title="Remove item"
                  >
                    <X className="h-4 w-4" />
                  </button>
                  <h4 className="font-bold text-base text-gray-900 pr-6 line-clamp-2">{collegeB.name}</h4>
                  <p className="text-sm text-gray-500 flex items-center mt-1">
                    <MapPin className="h-3.5 w-3.5 mr-1" /> {collegeB.location}
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-4 text-center text-gray-400">
                  <GraduationCap className="h-8 w-8 mb-2 stroke-1 text-gray-300" />
                  <span className="text-xs font-medium">Select second college above</span>
                </div>
              )}
            </th>
          </tr>
        </thead>
        
        <tbody className="divide-y divide-gray-200 text-sm">
          {/* Row 1: Rating Row */}
          <tr>
            <td className="p-4 sm:p-6 font-medium text-gray-700 bg-gray-50/50">Overall Rating</td>
            <td className="p-4 sm:p-6 border-l border-gray-200">
              {collegeA ? (
                <div className="flex items-center text-amber-600 font-bold">
                  <Star className="h-4 w-4 mr-1 fill-amber-400 text-amber-400" />
                  {collegeA.rating.toFixed(1)} / 5.0
                </div>
              ) : '—'}
            </td>
            <td className="p-4 sm:p-6 border-l border-gray-200">
              {collegeB ? (
                <div className="flex items-center text-amber-600 font-bold">
                  <Star className="h-4 w-4 mr-1 fill-amber-400 text-amber-400" />
                  {collegeB.rating.toFixed(1)} / 5.0
                </div>
              ) : '—'}
            </td>
          </tr>

          {/* Row 2: Fees Matrix Row */}
          <tr>
            <td className="p-4 sm:p-6 font-medium text-gray-700 bg-gray-50/50">Annual Fees Structure</td>
            <td className="p-4 sm:p-6 border-l border-gray-200 font-semibold text-gray-900">
              {collegeA ? (
                <div className="flex items-center">
                  <IndianRupee className="h-4 w-4 mr-1 text-gray-400" />
                  {formatFees(collegeA.fees)}
                </div>
              ) : '—'}
            </td>
            <td className="p-4 sm:p-6 border-l border-gray-200 font-semibold text-gray-900">
              {collegeB ? (
                <div className="flex items-center">
                  <IndianRupee className="h-4 w-4 mr-1 text-gray-400" />
                  {formatFees(collegeB.fees)}
                </div>
              ) : '—'}
            </td>
          </tr>

          {/* Row 3: Placements Metrics Row */}
          <tr>
            <td className="p-4 sm:p-6 font-medium text-gray-700 bg-gray-50/50">Average Placements</td>
            <td className="p-4 sm:p-6 border-l border-gray-200 font-bold text-emerald-600">
              {collegeA ? (
                <div className="flex items-center">
                  <Briefcase className="h-4 w-4 mr-1 text-emerald-500" />
                  {formatPlacement(collegeA.placement)}
                </div>
              ) : '—'}
            </td>
            <td className="p-4 sm:p-6 border-l border-gray-200 font-bold text-emerald-600">
              {collegeB ? (
                <div className="flex items-center">
                  <Briefcase className="h-4 w-4 mr-1 text-emerald-500" />
                  {formatPlacement(collegeB.placement)}
                </div>
              ) : '—'}
            </td>
          </tr>

          {/* Row 4: Core Programs Available Row */}
          <tr>
            <td className="p-4 sm:p-6 font-medium text-gray-700 bg-gray-50/50">Courses Offered</td>
            <td className="p-4 sm:p-6 border-l border-gray-200 vertical-align-top">
              {collegeA ? (
                <div className="flex flex-wrap gap-1.5">
                  {collegeA.courses.map((course, idx) => (
                    <span key={idx} className="bg-blue-50 text-blue-700 text-xs px-2.5 py-1 rounded-md border border-blue-100 font-medium">
                      {course}
                    </span>
                  ))}
                </div>
              ) : '—'}
            </td>
            <td className="p-4 sm:p-6 border-l border-gray-200 vertical-align-top">
              {collegeB ? (
                <div className="flex flex-wrap gap-1.5">
                  {collegeB.courses.map((course, idx) => (
                    <span key={idx} className="bg-blue-50 text-blue-700 text-xs px-2.5 py-1 rounded-md border border-blue-100 font-medium">
                      {course}
                    </span>
                  ))}
                </div>
              ) : '—'}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}