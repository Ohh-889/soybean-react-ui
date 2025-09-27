'use client';

import { ArrowLeft, Home, Mail, RefreshCw } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: '1s' }}
        />
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: '0.5s' }}
        />
      </div>

      <div className="relative z-10 text-center max-w-2xl mx-auto">
        {/* Big 404 number */}
        <div className="relative mb-8">
          <h1 className="text-9xl md:text-[12rem] font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent animate-pulse">
            404
          </h1>
          <div
            className="absolute inset-0 text-9xl md:text-[12rem] font-bold text-purple-500/20 blur-sm animate-pulse"
            style={{ animationDelay: '0.3s' }}
          >
            404
          </div>
        </div>

        {/* Main heading */}
        <div className="mb-6 space-y-2">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 animate-bounce">Page not found</h2>
          <p className="text-lg md:text-xl text-slate-300 animate-fade-in">
            Sorry, the page you visited doesn't exist or has been moved.
          </p>
        </div>

        {/* Description */}
        <div className="mb-8 animate-pulse">
          <p className="text-slate-400 max-w-md mx-auto leading-relaxed">
            Don't worry, this happens. You can return to the home page or try searching for what you're looking for.
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link href="/">
            <button className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 font-medium">
              <Home className="w-4 h-4 mr-2" />
              Back to Home
            </button>
          </Link>
          <button
            className="inline-flex items-center px-6 py-3 border border-slate-600 text-slate-300 hover:text-white hover:border-slate-500 hover:bg-slate-800/50 transition-all duration-300 hover:scale-105 rounded-lg font-medium"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </button>

          <button
            className="inline-flex items-center px-6 py-3 border border-slate-600 text-slate-300 hover:text-white hover:border-slate-500 hover:bg-slate-800/50 transition-all duration-300 hover:scale-105 rounded-lg font-medium"
            onClick={() => window.location.reload()}
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Reload
          </button>
        </div>

        {/* Quick navigation */}
        <div className="animate-bounce">
          <h3 className="text-slate-400 text-sm uppercase tracking-wider mb-4 font-semibold">Common Pages</h3>
          <div className="flex flex-wrap justify-center gap-2">
            <Link href="/button">
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-slate-800/50 text-slate-300 hover:text-white hover:bg-slate-700/50 transition-all duration-300 text-sm border border-slate-700 hover:border-slate-600">
                Button Component
              </span>
            </Link>
            <Link href="/project">
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-slate-800/50 text-slate-300 hover:text-white hover:bg-slate-700/50 transition-all duration-300 text-sm border border-slate-700 hover:border-slate-600">
                Project Page
              </span>
            </Link>
            <Link href="/">
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-slate-800/50 text-slate-300 hover:text-white hover:bg-slate-700/50 transition-all duration-300 text-sm border border-slate-700 hover:border-slate-600">
                Docs Home
              </span>
            </Link>
          </div>
        </div>

        {/* Contact information */}
        <div className="mt-16 pt-8 border-t border-slate-700/50 animate-pulse">
          <p className="text-slate-500 text-sm">
            If the problem persists, please
            <a
              className="text-purple-400 hover:text-purple-300 transition-colors inline-flex items-center ml-1"
              href="mailto:support@example.com"
            >
              <Mail className="w-3 h-3 mr-1" />
              Contact us
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
