'use client'
import React, { useState } from 'react';
import { ArrowRightLeft, Activity } from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';
import { LoadingSpinner } from './LoadingSpinner';
import { CurrencySelector } from './CurrencySelector';
import { safeFormat } from '../lib/utils';
import { CurrencyCode } from '../types/index';

export const CurrencyConverter = () => {
  const { 
    baseCurrency, setBaseCurrency, 
    targetCurrency, setTargetCurrency, 
    convertFiat, supportedCurrencies, loading, lastUpdated 
  } = useCurrency();

  const [localAmount, setLocalAmount] = useState<string>('1');
  const [isBaseSource, setIsBaseSource] = useState(true);

  const handleSwap = () => {
    const temp = baseCurrency;
    setBaseCurrency(targetCurrency);
    setTargetCurrency(temp);
  };

  let baseVal = '';
  let targetVal = '';

  if (isBaseSource) {
    baseVal = localAmount;
    const num = parseFloat(localAmount);
    targetVal = !isNaN(num) ? safeFormat(convertFiat(num, baseCurrency, targetCurrency)) : '';
  } else {
    targetVal = localAmount;
    const num = parseFloat(localAmount);
    baseVal = !isNaN(num) ? safeFormat(convertFiat(num, targetCurrency, baseCurrency)) : '';
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 md:p-10 border border-slate-100 dark:border-slate-700 relative overflow-hidden">
      {loading && <LoadingSpinner />}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-6 items-end">
        
        {/* FROM */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-500">Amount</label>
          <div className="relative">
             <input 
              type="number" 
              value={baseVal}
              onChange={(e) => { setLocalAmount(e.target.value); setIsBaseSource(true); }}
              placeholder="0.00"
              className="block w-full px-4 py-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xl font-bold focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
          </div>
          <CurrencySelector 
            value={baseCurrency} 
            onChange={(v) => setBaseCurrency(v as CurrencyCode)} 
            options={supportedCurrencies} 
          />
        </div>

        {/* SWAP */}
        <div className="flex justify-center md:pb-3">
          <button onClick={handleSwap} className="p-3 rounded-full bg-blue-50 dark:bg-slate-700 text-blue-600 dark:text-blue-400 hover:bg-blue-100 hover:scale-110 transition-all shadow-sm border border-blue-100">
            <ArrowRightLeft className="h-6 w-6" />
          </button>
        </div>

        {/* TO */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-500">Converted To</label>
          <div className="relative">
            <input 
              type="number" 
              value={targetVal}
              onChange={(e) => { setLocalAmount(e.target.value); setIsBaseSource(false); }}
              placeholder="0.00"
              className="block w-full px-4 py-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xl font-bold focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
          </div>
          <CurrencySelector 
            value={targetCurrency} 
            onChange={(v) => setTargetCurrency(v as CurrencyCode)} 
            options={supportedCurrencies} 
          />
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-700 flex justify-between items-center text-sm text-slate-500">
        <p>1 {baseCurrency} = {convertFiat(1, baseCurrency, targetCurrency).toFixed(4)} {targetCurrency}</p>
        <p className="flex items-center"><Activity className="h-4 w-4 mr-1" /> Updated {lastUpdated?.toLocaleTimeString()}</p>
      </div>
    </div>
  );
};
