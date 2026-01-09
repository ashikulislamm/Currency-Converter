'use client';

import { useState } from 'react';
import { Globe, Menu, X } from 'lucide-react';

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const currencies = ['USD', 'EUR', 'BDT'];

  return (
    <nav className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex justify-between items-center">
        <a href="/" className="flex items-center cursor-pointer">
          <Globe className="h-8 w-8 text-blue-600 mr-2" />
          <span className="font-bold text-xl">Global<span className="text-blue-600">X</span>change</span>
        </a>

        {/* Desktop */}
        <div className="hidden md:flex space-x-6 items-center">
          <a href="/" className="text-slate-500 hover:text-blue-600">Converter</a>
          <div className="h-4 w-px bg-slate-300"></div>
          {currencies.map(c => (
            <a key={c} href={`/currency?code=${c}`} className="text-slate-500 hover:text-blue-600 text-sm font-medium">{c}</a>
          ))}
        </div>

        {/* Mobile */}
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X /> : <Menu />}
        </button>
      </div>
      
      {menuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 space-y-2">
          <a href="/" onClick={() => setMenuOpen(false)} className="block w-full text-left p-2 hover:bg-slate-100 rounded">Converter</a>
          {currencies.map(c => (
            <a key={c} href={`/currency?code=${c}`} onClick={() => setMenuOpen(false)} className="block w-full text-left p-2 hover:bg-slate-100 rounded">{c} Page</a>
          ))}
        </div>
      )}
    </nav>
  );
}
