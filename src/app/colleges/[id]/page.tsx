'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { MapPin, DollarSign, Star, Briefcase, BookOpen, ArrowLeft } from 'lucide-react';

export default function CollegeDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [college, setCollege] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/colleges/${id}`)
      .then(res => res.json())
      .then(data => { setCollege(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!college) return <div className="min-h-screen flex items-center justify-center">College not found</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <button onClick={() => router.back()} className="flex items-center text-blue-600 mb-6 hover:underline">
        <ArrowLeft className="h-4 w-4 mr-1" /> Back
      </button>
      <div className="bg-white rounded-2xl shadow-md p-8 space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{college.name}</h1>
          <div className="flex items-center gap-2 text-gray-500 mt-2">
            <MapPin className="h-4 w-4" />
            <span>{college.location}</span>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-blue-50 rounded-xl p-4 text-center">
            <DollarSign className="h-6 w-6 text-blue-600 mx-auto mb-1" />
            <p className="text-sm text-gray-500">Annual Fees</p>
            <p className="font-bold text-gray-800">₹{college.fees.toLocaleString()}</p>
          </div>
          <div className="bg-green-50 rounded-xl p-4 text-center">
            <Briefcase className="h-6 w-6 text-green-600 mx-auto mb-1" />
            <p className="text-sm text-gray-500">Avg Placement</p>
            <p className="font-bold text-gray-800">{college.placement} LPA</p>
          </div>
          <div className="bg-yellow-50 rounded-xl p-4 text-center">
            <Star className="h-6 w-6 text-yellow-500 mx-auto mb-1" />
            <p className="text-sm text-gray-500">Rating</p>
            <p className="font-bold text-gray-800">{college.rating}/5</p>
          </div>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Overview</h2>
          <p className="text-gray-600 leading-relaxed">{college.overview}</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-blue-600" /> Courses Offered
          </h2>
          <div className="flex flex-wrap gap-2">
            {college.courses.map((course: string, i: number) => (
              <span key={i} className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                {course}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}