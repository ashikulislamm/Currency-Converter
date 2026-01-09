"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Head from "next/head";
import { useCurrency } from "../../context/CurrencyContext";
import { HistoricalChart } from "../../components/HistoricalChart";
import { generateMockHistory, formatCurrency } from "../../lib/utils";
import { HistoricalPoint, CurrencyCode } from "../../types/index";
import { TrendingUp, Coins, ArrowLeft, Calendar } from "lucide-react";

type TimePeriod = 7 | 30 | 90;

const currencyNames: Record<CurrencyCode, string> = {
  USD: 'US Dollar',
  EUR: 'Euro',
  BDT: 'Bangladeshi Taka',
  GBP: 'British Pound',
  JPY: 'Japanese Yen',
  CAD: 'Canadian Dollar',
  AUD: 'Australian Dollar',
  CNY: 'Chinese Yuan',
};

export default function CurrencyDetailPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const code = searchParams.get("code") || "USD";
  const currencyCode = code as CurrencyCode;
  const currencyName = currencyNames[currencyCode] || currencyCode;
  const { convertFiat, supportedCurrencies } = useCurrency();
  const [history, setHistory] = useState<HistoricalPoint[]>([]);
  const [timePeriod, setTimePeriod] = useState<TimePeriod>(30);

  useEffect(() => {
    // Update document title dynamically
    document.title = `${currencyCode} Exchange Rates & Trends | GlobalXchange`;
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        `View ${currencyName} (${currencyCode}) live exchange rates, historical price charts, and currency conversions. Track ${currencyCode} against USD, EUR, and other major currencies.`
      );
    }
  }, [currencyCode, currencyName]);

  useEffect(() => {
    // Generate fresh mock history when currency or time period changes
    const baseVal = convertFiat(1, "USD", currencyCode);
    if (baseVal > 0) {
      setHistory(generateMockHistory(baseVal, timePeriod));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currencyCode, timePeriod]);

  return (
    <div className="space-y-6 md:space-y-8 animate-in fade-in duration-500">
      <button
        onClick={() => router.push("/")}
        className="flex items-center text-slate-500 hover:text-blue-600 transition-colors text-sm md:text-base"
      >
        <ArrowLeft className="mr-1 md:mr-2 h-3 w-3 md:h-4 md:w-4" /> Back to
        Dashboard
      </button>

      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
        <h1 className="text-3xl md:text-4xl font-bold">
          {currencyCode} Overview
        </h1>
        <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 w-fit">
          FIAT
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        <div className="lg:col-span-2 space-y-4 md:space-y-6">
          <div className="bg-white dark:bg-slate-800 p-4 md:p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
              <h3 className="text-base md:text-lg font-bold flex items-center">
                <TrendingUp className="mr-2 text-blue-600 h-5 w-5" /> Historical
                Trend
              </h3>

              {/* Time Period Selector */}
              <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-700 p-1 rounded-lg w-fit">
                {([7, 30, 90] as TimePeriod[]).map((period) => (
                  <button
                    key={period}
                    onClick={() => setTimePeriod(period)}
                    className={`px-4 md:px-3 py-1.5 md:py-1 text-sm font-medium rounded transition-all min-w-[50px] ${
                      timePeriod === period
                        ? "bg-blue-600 text-white shadow-sm"
                        : "text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"
                    }`}
                  >
                    {period}D
                  </button>
                ))}
              </div>
            </div>
            <div className="p-2 md:p-4 bg-slate-50 dark:bg-slate-900 rounded-xl -mx-2 md:mx-0">
              <HistoricalChart data={history} color="#2563eb" />
            </div>
            <p className="text-xs text-slate-500 mt-2 flex items-center">
              <Calendar className="h-3 w-3 mr-1" />
              Showing last {timePeriod} days of exchange rate data
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 md:p-6 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
              <p className="text-slate-500 text-xs md:text-sm mb-1">vs USD</p>
              <p className="text-xl md:text-2xl font-bold">
                {formatCurrency(
                  convertFiat(1, "USD", currencyCode),
                  currencyCode
                )}
              </p>
            </div>
            <div className="p-4 md:p-6 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
              <p className="text-slate-500 text-xs md:text-sm mb-1">vs EUR</p>
              <p className="text-xl md:text-2xl font-bold">
                {formatCurrency(
                  convertFiat(1, "EUR", currencyCode),
                  currencyCode
                )}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4 md:space-y-6">
          <div className="bg-white dark:bg-slate-800 p-4 md:p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold mb-4 text-base md:text-lg">
              Quick Conversions
            </h3>
            <div className="space-y-3">
              {supportedCurrencies
                .filter((c) => c !== code)
                .map((c) => (
                  <div
                    key={c}
                    className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-700 last:border-0"
                  >
                    <span className="text-slate-500 text-sm md:text-base">
                      1 {c}
                    </span>
                    <span className="font-mono font-bold text-sm md:text-base">
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
