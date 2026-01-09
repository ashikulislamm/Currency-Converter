"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useCurrency } from "../../context/CurrencyContext";
import { HistoricalChart } from "../../components/HistoricalChart";
import { generateMockHistory, formatCurrency } from "../../lib/utils";
import { HistoricalPoint, CurrencyCode } from "../../types/index";
import { TrendingUp, Coins, ArrowLeft } from "lucide-react";

export default function CurrencyDetailPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const code = searchParams.get("code") || "USD";
  const currencyCode = code as CurrencyCode;
  const { convertFiat, supportedCurrencies } = useCurrency();
  const [history, setHistory] = useState<HistoricalPoint[]>([]);

  useEffect(() => {
    // Generate fresh mock history when currency changes
    const baseVal = convertFiat(1, "USD", currencyCode);
    if (baseVal > 0) {
      setHistory(generateMockHistory(baseVal));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currencyCode]);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <button
        onClick={() => router.push("/")}
        className="flex items-center text-slate-500 hover:text-blue-600 transition-colors"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
      </button>

      <div className="flex items-center space-x-4">
        <h1 className="text-4xl font-bold">{currencyCode} Overview</h1>
        <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">
          FIAT
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
            <h3 className="text-lg font-bold mb-4 flex items-center">
              <TrendingUp className="mr-2 text-blue-600" /> 30 Day Trend
            </h3>
            <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl">
              <HistoricalChart data={history} color="#2563eb" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-6 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
              <p className="text-slate-500 mb-1">vs USD</p>
              <p className="text-2xl font-bold">
                {formatCurrency(
                  convertFiat(1, "USD", currencyCode),
                  currencyCode
                )}
              </p>
            </div>
            <div className="p-6 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
              <p className="text-slate-500 mb-1">vs EUR</p>
              <p className="text-2xl font-bold">
                {formatCurrency(
                  convertFiat(1, "EUR", currencyCode),
                  currencyCode
                )}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold mb-4">Quick Conversions</h3>
            <div className="space-y-3">
              {supportedCurrencies
                .filter((c) => c !== code)
                .map((c) => (
                  <div
                    key={c}
                    className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-700 last:border-0"
                  >
                    <span className="text-slate-500">1 {c}</span>
                    <span className="font-mono font-bold">
                      {convertFiat(1, c, currencyCode).toFixed(4)}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
