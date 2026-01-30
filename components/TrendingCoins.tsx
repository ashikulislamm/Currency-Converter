"use client";
import React, { useEffect, useState, useRef } from "react";
import { useCurrency } from "../context/CurrencyContext";
import { TrendingUp, TrendingDown, Bitcoin, Layers, Hexagon, Flame } from "lucide-react";
import { CryptoCode } from "../types/index";

interface TrendingCoin {
  code: CryptoCode;
  name: string;
  price: number;
  change24h: number;
  icon: string;
}

interface TrendingCoinsProps {
  currentCrypto?: CryptoCode;
}

export const TrendingCoins: React.FC<TrendingCoinsProps> = ({
  currentCrypto,
}) => {
  const { cryptoRates, supportedCrypto } = useCurrency();
  const [trendingCoins, setTrendingCoins] = useState<TrendingCoin[]>([]);
  const updateIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const cryptoInfo: Record<CryptoCode, { name: string; icon: string; IconComponent: any; color: string }> = {
    BTC: { name: "Bitcoin", icon: "₿", IconComponent: Bitcoin, color: "from-orange-400 to-orange-600" },
    ETH: { name: "Ethereum", icon: "Ξ", IconComponent: Hexagon, color: "from-blue-400 to-purple-600" },
    BNB: { name: "Binance Coin", icon: "BNB", IconComponent: Layers, color: "from-yellow-400 to-yellow-600" },
    SOL: { name: "Solana", icon: "SOL", IconComponent: Flame, color: "from-purple-400 to-pink-600" },
  };

  useEffect(() => {
    const updateTrendingCoins = () => {
      // Simulate 24h price changes (in production, fetch from real API)
      const coins: TrendingCoin[] = supportedCrypto.map((code) => {
        const info = cryptoInfo[code];
        const price = cryptoRates[code] || 0;
        // Generate realistic-looking price changes
        const change24h = (Math.random() * 20 - 5).toFixed(1);

        return {
          code,
          name: info.name,
          price,
          change24h: parseFloat(change24h),
          icon: info.icon,
        };
      });

      // Sort by absolute change (most volatile first)
      coins.sort((a, b) => Math.abs(b.change24h) - Math.abs(a.change24h));
      setTrendingCoins(coins);
    };

    // Initial update
    updateTrendingCoins();

    // Update every 5 seconds for a more stable view
    updateIntervalRef.current = setInterval(updateTrendingCoins, 5000);

    return () => {
      if (updateIntervalRef.current) {
        clearInterval(updateIntervalRef.current);
      }
    };
  }, [supportedCrypto]); // Removed cryptoRates to prevent constant re-initialization

  return (
    <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 p-6 rounded-2xl border-2 border-slate-200 dark:border-slate-700 shadow-lg sticky top-6">
      <h2 className="text-xl font-bold mb-6 text-slate-900 dark:text-white flex items-center">
        <TrendingUp className="mr-2 h-6 w-6 text-blue-600" />
        Trending Coins
      </h2>

      <div className="space-y-2">
        {/* Header */}
        <div className="grid grid-cols-3 gap-2 text-xs text-slate-500 dark:text-slate-400 font-semibold pb-3 border-b-2 border-slate-200 dark:border-slate-700">
          <span>Name</span>
          <span className="text-right">24h Change</span>
          <span className="text-right">Price</span>
        </div>

        {/* Coins List */}
        <div className="space-y-2 pt-2">
          {trendingCoins.map((coin) => (
            <a
              key={coin.code}
              href={`/crypto?code=${coin.code}`}
              className={`grid grid-cols-3 gap-2 items-center py-4 px-3 rounded-xl transition-all ${
                coin.code === currentCrypto
                  ? "bg-blue-100 dark:bg-blue-900/30 border-2 border-blue-500 dark:border-blue-500 shadow-md"
                  : "hover:bg-white dark:hover:bg-slate-800 border-2 border-transparent hover:border-slate-200 dark:hover:border-slate-700 hover:shadow-md"
              }`}
            >
              {/* Name */}
              <div className="flex items-center gap-2">
                <div className={`w-9 h-9 bg-gradient-to-br ${cryptoInfo[coin.code].color} rounded-full flex items-center justify-center text-white shadow-md`}>
                  {React.createElement(cryptoInfo[coin.code].IconComponent, { size: 20, strokeWidth: 2.5 })}
                </div>
                <div>
                  <div className="font-bold text-sm text-slate-900 dark:text-white">{coin.name}</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">{coin.code}</div>
                </div>
              </div>

              {/* 24h Change */}
              <div
                className={`text-right flex items-center justify-end gap-1 ${
                  coin.change24h >= 0 ? "text-green-500" : "text-red-500"
                }`}
              >
                {coin.change24h >= 0 ? (
                  <TrendingUp className="h-3 w-3" />
                ) : (
                  <TrendingDown className="h-3 w-3" />
                )}
                <span className="text-sm font-semibold">
                  {coin.change24h >= 0 ? "+" : ""}
                  {coin.change24h}%
                </span>
              </div>

              {/* Price */}
              <div className="text-right text-sm font-semibold">
                ${coin.price.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Info Footer */}
      <div className="mt-6 pt-4 border-t-2 border-slate-200 dark:border-slate-700 text-xs text-slate-500 dark:text-slate-400">
        <p className="flex items-center gap-2">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          Real-time crypto prices from Binance
        </p>
      </div>
    </div>
  );
};
