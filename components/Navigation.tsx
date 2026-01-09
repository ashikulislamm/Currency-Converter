'use client';

import { useState, useEffect, useRef } from 'react';
import { Globe, Menu, X, ChevronDown } from 'lucide-react';
import Logo from '@/public/exchange.png';

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [currenciesOpen, setCurrenciesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const currencies = [
    { code: 'USD', name: 'US Dollar' },
    { code: 'EUR', name: 'Euro' },
    { code: 'BDT', name: 'Bangladeshi Taka' },
    { code: 'GBP', name: 'British Pound' },
    { code: 'JPY', name: 'Japanese Yen' },
    { code: 'CAD', name: 'Canadian Dollar' },
    { code: 'AUD', name: 'Australian Dollar' },
    { code: 'CNY', name: 'Chinese Yuan' }
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setCurrenciesOpen(false);
      }
    };

    if (currenciesOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [currenciesOpen]);

  return (
    <nav className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex justify-between items-center">
        <a href="/" className="flex items-center cursor-pointer">
          <img src={Logo.src} alt="GlobalXchange Logo" className="h-8 w-8 text-blue-600 mr-2" />
          <span className="font-bold text-xl">Global<span className="text-blue-600">X</span>change</span>
        </a>

        {/* Desktop */}
        <div className="hidden md:flex space-x-6 items-center">
          <a href="/" className="text-slate-500 hover:text-blue-600 transition-colors">Converter</a>
          <div className="h-4 w-px bg-slate-300"></div>
          
          {/* Currencies Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button 
              onClick={() => setCurrenciesOpen(!currenciesOpen)}
              className="flex items-center text-slate-500 hover:text-blue-600 transition-colors"
            >
              Currencies <ChevronDown className="ml-1 h-4 w-4" />
            </button>
            
            {currenciesOpen && (
              <div className="absolute top-full right-0 mt-2 w-56 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 py-2 z-50">
                {currencies.map(c => (
                  <a 
                    key={c.code} 
                    href={`/currency?code=${c.code}`}
                    onClick={() => setCurrenciesOpen(false)}
                    className="flex items-center justify-between px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                  >
                    <span className="text-sm font-medium">{c.name}</span>
                    <span className="text-xs text-slate-500 font-mono">{c.code}</span>
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Mobile */}
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X /> : <Menu />}
        </button>
      </div>
      
      {menuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 space-y-2">
          <a href="/" onClick={() => setMenuOpen(false)} className="block w-full text-left p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded">Converter</a>
          
          <div className="border-t border-slate-200 dark:border-slate-700 pt-2 mt-2">
            <p className="text-xs text-slate-500 px-2 mb-2 font-semibold">CURRENCIES</p>
            {currencies.map(c => (
              <a 
                key={c.code} 
                href={`/currency?code=${c.code}`} 
                onClick={() => setMenuOpen(false)} 
                className="flex items-center justify-between p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded"
              >
                <span className="text-sm">{c.name}</span>
                <span className="text-xs text-slate-500 font-mono">{c.code}</span>
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
