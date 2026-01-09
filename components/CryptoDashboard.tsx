"use client";
import React, { useState } from "react";
import { useCurrency } from "../context/CurrencyContext";
import { CurrencySelector } from "./CurrencySelector";
import { safeFormat } from "../lib/utils";
import { CryptoCode, CurrencyCode } from "../types/index";
import { TrendingUp, ArrowRightLeft } from "lucide-react";

export const CryptoDashboard = () => {
  const {
    cryptoRates,
    supportedCrypto,
    rates,
    convertFiat,
    supportedCurrencies,
  } = useCurrency();

  // Crypto Converter State
  const [amount, setAmount] = useState("1");
  const [selectedCrypto, setSelectedCrypto] = useState<CryptoCode>("BTC");
  const [selectedFiat, setSelectedFiat] = useState<CurrencyCode>("USD");

  const cryptoPriceInUSD = cryptoRates[selectedCrypto] || 0;
  // Convert crypto USD value to target Fiat
  const cryptoInFiat = convertFiat(cryptoPriceInUSD, "USD", selectedFiat);
  const totalValue = parseFloat(amount) * cryptoInFiat;

  return (
    <div className="space-y-8">
      {/* Ticker */}
      <div className="w-full bg-slate-900 text-white overflow-hidden py-2 rounded-xl shadow-lg border border-slate-800">
        <div className="flex animate-marquee gap-8 whitespace-nowrap">
          {/* Duplicate content twice for seamless infinite scroll */}
          {[...supportedCrypto, ...supportedCrypto].map((symbol, i) => (
            <div
              key={`${symbol}-${i}`}
              className="flex items-center space-x-2 px-4"
            >
              <span className="font-bold text-yellow-500">{symbol}</span>
              <span className="font-mono">
                $
                {(cryptoRates[symbol] || 0).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Crypto Converter */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center">
            <ArrowRightLeft className="mr-2 text-blue-600" /> Crypto Converter
          </h2>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-slate-500 mb-1 block">
                Crypto Amount
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 font-bold"
                />
                <div className="w-1/3">
                  <CurrencySelector
                    value={selectedCrypto}
                    onChange={(v) => setSelectedCrypto(v as CryptoCode)}
                    options={supportedCrypto}
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-center text-slate-400">↓</div>
            <div>
              <label className="text-sm text-slate-500 mb-1 block">
                Fiat Value
              </label>
              <div className="flex gap-2">
                <div className="w-full p-3 bg-slate-100 dark:bg-slate-700 rounded-xl border border-transparent font-bold text-slate-500">
                  {safeFormat(totalValue)}
                </div>
                <div className="w-1/3">
                  <CurrencySelector
                    value={selectedFiat}
                    onChange={(v) => setSelectedFiat(v as CurrencyCode)}
                    options={supportedCurrencies}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Live Prices Cards */}
        <div className="grid grid-cols-2 gap-4">
          {supportedCrypto.map((code) => (
            <div
              key={code}
              className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-between"
            >
              <div className="flex justify-between items-start">
                <span className="font-bold text-slate-700 dark:text-slate-300">
                  {code}
                </span>
                <TrendingUp className="text-green-500 h-4 w-4" />
              </div>
              <div className="mt-4">
                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                  ${(cryptoRates[code] || 0).toLocaleString()}
                </p>
                <p className="text-xs text-slate-500">Live USD Price</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
