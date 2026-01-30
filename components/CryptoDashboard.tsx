"use client";
import React, { useState } from "react";
import { useCurrency } from "../context/CurrencyContext";
import { CurrencySelector } from "./CurrencySelector";
import { safeFormat } from "../lib/utils";
import { CryptoCode, CurrencyCode } from "../types/index";
import { TrendingUp, ArrowRightLeft, Bitcoin, Layers, Hexagon, Flame } from "lucide-react";

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

  const cryptoIcons: Record<CryptoCode, { IconComponent: any; color: string }> = {
    BTC: { IconComponent: Bitcoin, color: "from-orange-400 to-orange-600" },
    ETH: { IconComponent: Hexagon, color: "from-blue-400 to-purple-600" },
    BNB: { IconComponent: Layers, color: "from-yellow-400 to-yellow-600" },
    SOL: { IconComponent: Flame, color: "from-purple-400 to-pink-600" },
  };

  return (
    <div className="space-y-6">
      {/* Ticker */}
      <div className="w-full bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 text-white overflow-hidden py-3 rounded-2xl shadow-lg border border-slate-700 dark:border-slate-700">
        <div className="flex animate-marquee gap-12 whitespace-nowrap">
          {/* Duplicate content twice for seamless infinite scroll */}
          {[...supportedCrypto, ...supportedCrypto].map((symbol, i) => (
            <div
              key={`${symbol}-${i}`}
              className="flex items-center space-x-3 px-4"
            >
              <span className="font-bold text-orange-400 text-lg">{symbol}</span>
              <span className="font-mono text-white font-semibold">
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

      <div className="space-y-6">
        {/* Crypto Converter */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center">
            <ArrowRightLeft className="mr-2 text-blue-600" /> Crypto Converter
          </h2>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-slate-500 dark:text-slate-400 mb-2 block font-medium">
                Crypto Amount
              </label>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="flex-1 p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border-2 border-slate-200 dark:border-slate-700 font-bold text-lg focus:border-blue-500 dark:focus:border-blue-500 outline-none transition-colors w-full"
                  placeholder="1.0"
                />
                <div className="w-full sm:w-32">
                  <CurrencySelector
                    value={selectedCrypto}
                    onChange={(v) => setSelectedCrypto(v as CryptoCode)}
                    options={supportedCrypto}
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="bg-slate-100 dark:bg-slate-700 rounded-full p-2">
                <span className="text-slate-500 dark:text-slate-400 text-xl">↓</span>
              </div>
            </div>
            <div>
              <label className="text-sm text-slate-500 dark:text-slate-400 mb-2 block font-medium">
                Fiat Value
              </label>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 p-4 bg-slate-100 dark:bg-slate-700 rounded-xl border-2 border-transparent font-bold text-lg text-slate-700 dark:text-slate-200 w-full break-all">
                  {totalValue.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </div>
                <div className="w-full sm:w-32">
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {supportedCrypto.map((code) => {
            const cryptoIcon = cryptoIcons[code];
            return (
              <a
                key={code}
                href={`/crypto?code=${code}`}
                className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 p-5 rounded-2xl border-2 border-slate-200 dark:border-slate-700 shadow-md hover:shadow-xl hover:border-blue-500 dark:hover:border-blue-500 transition-all cursor-pointer group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5 transition-all"></div>
                <div className="relative">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-2">
                      <div className={`w-10 h-10 bg-gradient-to-br ${cryptoIcon.color} rounded-full flex items-center justify-center text-white shadow-lg`}>
                        {React.createElement(cryptoIcon.IconComponent, { size: 20, strokeWidth: 2.5 })}
                      </div>
                      <span className="font-bold text-lg text-slate-700 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {code}
                      </span>
                    </div>
                    <TrendingUp className="text-green-500 h-5 w-5 group-hover:scale-110 transition-transform" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
                      ${(cryptoRates[code] || 0).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Live USD Price</p>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};
