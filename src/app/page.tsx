import Link from 'next/link';
import { GraduationCap, Search, GitCompare, ArrowRight, ShieldCheck, Database, Award } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="space-y-20 py-4 sm:py-10 max-w-7xl mx-auto">
      
      {/* 1. Hero Content Zone */}
      <section className="text-center max-w-4xl mx-auto space-y-6 pt-6">
        <div className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full text-blue-700 text-xs font-semibold tracking-wide uppercase">
          <Award className="h-3.5 w-3.5" />
          <span>Next-Generation Academic Planner</span>
        </div>
        
        <h1 className="text-4xl sm:text-6xl font-extrabold text-gray-900 tracking-tight leading-none">
          Find Your Perfect University <br />
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            With Clear Analytics
          </span>
        </h1>
        
        <p className="text-gray-500 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          Instantly filter through premier institutions across major academic sectors. Evaluate real-time program fees, verified campus placements, and student reviews.
        </p>

        {/* Action Triggers */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
          <Link
            href="/colleges"
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-semibold rounded-xl text-white bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/20 hover:shadow-blue-600/30 transition-all transform hover:-translate-y-0.5 group"
          >
            Explore Colleges
            <ArrowRight className="h-5 w-5 ml-2 transform group-hover:translate-x-0.5 transition-transform" />
          </Link>
          <Link
            href="/compare"
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border border-gray-200 text-base font-semibold rounded-xl text-gray-700 bg-white hover:bg-gray-50 shadow-sm transition-all border-solid"
          >
            <GitCompare className="h-5 w-5 mr-2 text-gray-400" />
            Compare Side-by-Side
          </Link>
        </div>
      </section>

      {/* 2. Key Operational Module Columns */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        
        {/* Module A Card Link */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="h-10 w-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
              <Search className="h-5 w-5" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Dynamic Search Catalog</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              Query deep structural database lists instantly. Refine records by geographical location tags, course specializations, or budget considerations effortlessly.
            </p>
          </div>
          <Link href="/colleges" className="text-sm font-bold text-blue-600 hover:text-blue-700 inline-flex items-center group pt-2">
            Launch Catalog Search <ArrowRight className="h-4 w-4 ml-1 transform group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Module B Card Link */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="h-10 w-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
              <GitCompare className="h-5 w-5" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Comparison Matrix Hub</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              Load multiple institutions onto a single synchronized grid view. Cross-examine tuition rates and annual placement numbers side-by-side.
            </p>
          </div>
          <Link href="/compare" className="text-sm font-bold text-indigo-600 hover:text-indigo-700 inline-flex items-center group pt-2">
            Open Matrix Tool <ArrowRight className="h-4 w-4 ml-1 transform group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

      </section>

      {/* 3. Engineering Core Indicators Banner */}
      <section className="bg-gray-900 text-gray-100 rounded-3xl p-8 sm:p-12 max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 shadow-inner">
        <div className="space-y-2 max-w-md">
          <h4 className="text-xl font-bold tracking-tight text-white">Full-Stack Architecture Check</h4>
          <p className="text-gray-400 text-sm leading-relaxed">
            This platform runs on Next.js 15, verified by a Prisma ORM connection layer feeding live data directly from your PostgreSQL instance.
          </p>
        </div>
        <div className="flex flex-wrap gap-4 sm:gap-6 text-xs font-mono text-gray-300">
          <div className="flex items-center space-x-2 bg-gray-800 border border-gray-700 px-3 py-2 rounded-xl">
            <Database className="h-4 w-4 text-blue-400" />
            <span>PostgreSQL Connected</span>
          </div>
          <div className="flex items-center space-x-2 bg-gray-800 border border-gray-700 px-3 py-2 rounded-xl">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span>NextAuth Secure</span>
          </div>
        </div>
      </section>

    </div>
  );
}