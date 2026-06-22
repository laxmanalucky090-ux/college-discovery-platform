'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { GraduationCap, Lock, Mail, User, AlertCircle, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  
  // State configuration to handle switching between Login and Sign-Up modes
  const [isSignUp, setIsSignUp] = useState(false);
  
  // Form input bindings
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Feedback states
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (isSignUp) {
        // --- SIGN UP PATHWAY ---
        const res = await fetch('/api/auth/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, password }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || 'An unexpected registration error occurred.');
        }

        // Auto-login user immediately following successful database entry
        const loginResult = await signIn('credentials', {
          redirect: false,
          email,
          password,
        });

        if (loginResult?.error) {
          throw new Error('Account created, but automatic sign-in failed. Please login manually.');
        }

        router.push('/colleges');
        router.refresh();
      } else {
        // --- SIGN IN PATHWAY ---
        const result = await signIn('credentials', {
          redirect: false,
          email,
          password,
        });

        if (result?.error) {
          throw new Error(result.error || 'Invalid credentials. Please try again.');
        }

        router.push('/colleges');
        router.refresh();
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-8">
      <div className="bg-white border border-gray-200 rounded-2xl shadow-xl w-full max-w-md overflow-hidden transition-all duration-300">
        
        {/* Upper Visual Accent Banner */}
        <div className="h-2 bg-gradient-to-r from-blue-600 to-indigo-600" />

        <div className="p-8 space-y-6">
          
          {/* Brand Logo and Title Context */}
          <div className="text-center space-y-2">
            <div className="inline-flex h-12 w-12 rounded-xl bg-blue-50 items-center justify-center text-blue-600 mb-2">
              <GraduationCap className="h-6 w-6 stroke-[1.5]" />
            </div>
            <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">
              {isSignUp ? 'Create your Student Account' : 'Welcome back to EduCampus'}
            </h2>
            <p className="text-sm text-gray-500">
              {isSignUp ? 'Sign up to build lists and write campus reviews' : 'Sign in to access saved colleges and favorites'}
            </p>
          </div>

          {/* Unified Error Alert Box */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-3.5 rounded-xl text-sm flex items-start space-x-2.5 animate-shake">
              <AlertCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Interactive Form Matrix */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Dynamic Name Input (Sign Up Only) */}
            {isSignUp && (
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wide">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    required
                    placeholder="Enter full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                  />
                </div>
              </div>
            )}

            {/* Email Field Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wide">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="email"
                  required
                  placeholder="student@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                />
              </div>
            </div>

            {/* Password Field Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wide">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                />
              </div>
            </div>

            {/* Form Submit Execution Trigger Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full inline-flex items-center justify-center px-4 py-2.5 mt-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md transition-all duration-150 disabled:opacity-60 disabled:cursor-not-allowed group"
            >
              <span>{isLoading ? 'Verifying Secure Records...' : isSignUp ? 'Complete Registration' : 'Secure Authorization'}</span>
              {!isLoading && <ArrowRight className="h-4 w-4 ml-2 transform group-hover:translate-x-0.5 transition-transform" />}
            </button>
          </form>

          {/* Core Interactive Switch Layout Action */}
          <div className="border-t border-gray-100 pt-4 text-center">
            <button
              onClick={() => {
                setIsSignUp(!isSignUp);
                setError('');
              }}
              className="text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors"
            >
              {isSignUp ? 'Already have a profile? Sign In here' : "Don't have an account? Sign Up instantly"}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}