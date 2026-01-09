'use client';

import Image from "next/image";
import { CurrencyConverter } from "../components/CurrencyConverter";
import { CryptoDashboard } from "../components/CryptoDashboard";
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

      <div className="my-12 border-t border-slate-200 dark:border-slate-800"></div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold flex items-center">
          <TrendingUp className="mr-2 text-blue-600" /> Market Dashboard
        </h2>
        <CryptoDashboard />
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        {supportedCurrencies.slice(0, 4).map(
          (c) =>
            c !== baseCurrency && (
              <div
                key={c}
                className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700 text-center"
              >
                <div className="text-sm text-slate-500">1 {baseCurrency} =</div>
                <div className="font-bold text-lg">
                  {convertFiat(1, baseCurrency, c).toFixed(3)} {c}
                </div>
              </div>
            )
        )}
      </div>
    </div>
  );
}
