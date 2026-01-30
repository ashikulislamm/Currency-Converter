"use client";

import Image from "next/image";
import { CurrencyConverter } from "../components/CurrencyConverter";
import { CryptoDashboard } from "../components/CryptoDashboard";
import { TrendingCoins } from "../components/TrendingCoins";
import { TrendingUp } from "lucide-react";
import { useCurrency } from "../context/CurrencyContext";

export default function Home() {
  const { supportedCurrencies, convertFiat, baseCurrency } = useCurrency();
  return (
    <div className="space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
          Currency & <span className="text-blue-600">Crypto</span> Hub
        </h1>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Instant fiat conversions and real-time cryptocurrency tracking in one
          professional dashboard.
        </p>
      </div>

      <CurrencyConverter />

      <div className="my-16 border-t border-slate-200 dark:border-slate-800"></div>

      <div className="space-y-8">
        <h2 className="text-3xl font-bold flex items-center text-slate-900 dark:text-white">
          <TrendingUp className="mr-3 text-blue-600 h-8 w-8" /> Market Dashboard
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Crypto Dashboard - Takes up 2 columns */}
          <div className="lg:col-span-2">
            <CryptoDashboard />
          </div>

          {/* Trending Coins - Takes up 1 column */}
          <div className="lg:col-span-1">
            <TrendingCoins />
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12\">
        {supportedCurrencies.slice(0, 4).map(
          (c) =>
            c !== baseCurrency && (
              <div
                key={c}
                className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-900 p-5 rounded-2xl border-2 border-slate-200 dark:border-slate-700 text-center shadow-md hover:shadow-lg transition-all\"
              >
                <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mb-1\">
                  1 {baseCurrency} =
                </div>
                <div className="font-bold text-xl text-slate-900 dark:text-white\">
                  {convertFiat(1, baseCurrency, c).toFixed(3)}
                </div>
                <div className="text-sm text-blue-600 dark:text-blue-400 font-semibold mt-1\">
                  {c}
                </div>
              </div>
            ),
        )}
      </div>
    </div>
  );
}
