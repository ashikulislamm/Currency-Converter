"use client";
import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useCurrency } from "../../context/CurrencyContext";
import { fetchCryptoHistoricalData } from "../../lib/utils";
import { CryptoHistoricalPoint, CryptoCode, CurrencyCode } from "../../types/index";
import { ArrowLeft, TrendingUp, TrendingDown, ArrowRightLeft, ExternalLink } from "lucide-react";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { CryptoChart } from "../../components/CryptoChart";
import { CurrencySelector } from "../../components/CurrencySelector";

type TimePeriod = "1D" | "1W" | "1M" | "3M" | "6M" | "1Y" | "Max";

const cryptoNames: Record<
  CryptoCode,
  {
    name: string;
    icon: string;
    website: string;
    explorer: string;
    community: string;
    marketCap: string;
    rank: number;
    volume: string;
  }
> = {
  BTC: {
    name: "Bitcoin",
    icon: "₿",
    website: "https://bitcoin.org",
    explorer: "https://blockchain.com/explorer",
    community: "https://bitcointalk.org",
    marketCap: "$1,758,115,770,872.00",
    rank: 1,
    volume: "$21,258,739,637.00",
  },
  ETH: {
    name: "Ethereum",
    icon: "Ξ",
    website: "https://ethereum.org",
    explorer: "https://etherscan.io",
    community: "https://reddit.com/r/ethereum",
    marketCap: "$428,967,234,521.00",
    rank: 2,
    volume: "$15,432,891,234.00",
  },
  BNB: {
    name: "Binance Coin",
    icon: "BNB",
    website: "https://binance.com",
    explorer: "https://bscscan.com",
    community: "https://reddit.com/r/binance",
    marketCap: "$89,234,567,890.00",
    rank: 4,
    volume: "$1,876,543,210.00",
  },
  SOL: {
    name: "Solana",
    icon: "SOL",
    website: "https://solana.com",
    explorer: "https://solscan.io",
    community: "https://reddit.com/r/solana",
    marketCap: "$67,890,123,456.00",
    rank: 5,
    volume: "$2,345,678,901.00",
  },
};

function CryptoDetailContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const code = (searchParams.get("code") || "BTC") as CryptoCode;
  const cryptoInfo = cryptoNames[code] || cryptoNames.BTC;
  const { cryptoRates, convertFiat, supportedCurrencies } = useCurrency();
  const [history, setHistory] = useState<CryptoHistoricalPoint[]>([]);
  const [timePeriod, setTimePeriod] = useState<TimePeriod>("1D");
  const [isLoading, setIsLoading] = useState(true);
  const [priceChange24h, setPriceChange24h] = useState(0);
  const [priceChange30d, setPriceChange30d] = useState(0);
  const [cryptoAmount, setCryptoAmount] = useState("10");
  const [selectedFiat, setSelectedFiat] = useState<CurrencyCode>("USD");

  const currentPrice = cryptoRates[code] || 0;
  const cryptoInFiat = convertFiat(currentPrice, "USD", selectedFiat);
  const totalValue = parseFloat(cryptoAmount) * cryptoInFiat;

  useEffect(() => {
    document.title = `${code} Live Price & Chart | GlobalXchange`;
  }, [code]);

  useEffect(() => {
    const loadHistoricalData = async () => {
      setIsLoading(true);
      try {
        const data = await fetchCryptoHistoricalData(code, timePeriod);
        setHistory(data);

        // Calculate price changes
        if (data.length >= 2) {
          const oldPrice = data[0].value;
          const newPrice = data[data.length - 1].value;
          const change = ((newPrice - oldPrice) / oldPrice) * 100;
          
          if (timePeriod === "1D") {
            setPriceChange24h(change);
          } else if (timePeriod === "1M") {
            setPriceChange30d(change);
          }
        }
      } catch (error) {
        console.error("Failed to load crypto historical data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadHistoricalData();
  }, [code, timePeriod]);

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <button
          onClick={() => router.push("/")}
          className="flex items-center text-slate-400 hover:text-white transition-colors mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
        </button>

        {/* Crypto Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-2xl font-bold">
              {cryptoInfo.icon}
            </div>
            <h1 className="text-3xl font-bold">{cryptoInfo.name}</h1>
          </div>
          <div className="flex items-baseline gap-3 mb-2">
            <span className="text-5xl font-bold">
              ${currentPrice.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
            <span
              className={`flex items-center gap-1 text-lg ${
                priceChange24h >= 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              {priceChange24h.toFixed(2)}% ↗ ({timePeriod})
            </span>
          </div>
          <div className="flex gap-6 text-sm">
            <div>
              <span className="text-slate-400">Today</span>
              <div className={`font-semibold ${priceChange24h >= 0 ? "text-green-500" : "text-red-500"}`}>
                {priceChange24h.toFixed(1)}% ↗
              </div>
            </div>
            <div>
              <span className="text-slate-400">30 Days</span>
              <div className={`font-semibold ${priceChange30d >= 0 ? "text-green-500" : "text-red-500"}`}>
                {priceChange30d.toFixed(1)}% ↗
              </div>
            </div>
            <div>
              <span className="text-slate-400">Price Change (24h)</span>
              <div className="font-semibold text-green-500">
                ${(currentPrice * (priceChange24h / 100)).toFixed(2)}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Chart */}
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
              <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
                <h3 className="text-lg font-bold">Trend Overview</h3>

                {/* Time Period Selector */}
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1 bg-slate-800 p-1 rounded-lg">
                    {(["1D", "1W", "1M", "3M", "6M", "1Y", "Max"] as TimePeriod[]).map(
                      (period) => (
                        <button
                          key={period}
                          onClick={() => setTimePeriod(period)}
                          className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                            timePeriod === period
                              ? "bg-green-500 text-white"
                              : "text-slate-400 hover:text-white"
                          }`}
                        >
                          {period}
                        </button>
                      )
                    )}
                  </div>
                  <div className="flex items-center gap-1 bg-slate-800 p-1 rounded-lg">
                    <button className="px-3 py-1.5 rounded text-sm font-medium bg-green-500 text-white">
                      1D
                    </button>
                    <button className="px-3 py-1.5 rounded text-sm font-medium text-slate-400 hover:text-white">
                      1m
                    </button>
                  </div>
                </div>
              </div>

              {isLoading ? (
                <div className="h-96 flex items-center justify-center">
                  <LoadingSpinner />
                </div>
              ) : history.length > 0 ? (
                <CryptoChart data={history} priceChange={priceChange24h} />
              ) : (
                <div className="h-96 flex items-center justify-center text-slate-500">
                  No Data Available
                </div>
              )}
            </div>

            {/* Recent Trades */}
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
              <h3 className="text-lg font-bold mb-4">Recent Trades</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-slate-400 text-sm border-b border-slate-800">
                      <th className="text-left py-3 px-2">Price</th>
                      <th className="text-left py-3 px-2">Amount</th>
                      <th className="text-left py-3 px-2">Value</th>
                      <th className="text-left py-3 px-2">Buy/Sell</th>
                      <th className="text-left py-3 px-2">Time</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {[...Array(10)].map((_, i) => {
                      const isBuy = Math.random() > 0.5;
                      const price = currentPrice + (Math.random() - 0.5) * 100;
                      const amount = Math.random() * 0.5;
                      return (
                        <tr key={i} className="border-b border-slate-800/50 hover:bg-slate-800/30">
                          <td className="py-2 px-2">${price.toFixed(2)}</td>
                          <td className="py-2 px-2">{amount.toFixed(6)}</td>
                          <td className="py-2 px-2">${(price * amount).toFixed(2)}</td>
                          <td className={`py-2 px-2 ${isBuy ? "text-green-500" : "text-red-500"}`}>
                            {isBuy ? "Buy" : "Sell"}
                          </td>
                          <td className="py-2 px-2 text-slate-400">
                            {new Date(Date.now() - i * 60000).toLocaleTimeString()}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Crypto Converter */}
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
              <h3 className="text-lg font-bold mb-4 flex items-center">
                <ArrowRightLeft className="mr-2 h-5 w-5" /> {code} Converter
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex gap-2 bg-slate-800 p-3 rounded-xl items-center">
                    <input
                      type="number"
                      value={cryptoAmount}
                      onChange={(e) => setCryptoAmount(e.target.value)}
                      className="flex-1 bg-transparent text-white font-semibold outline-none"
                    />
                    <span className="text-orange-500 font-bold">{code}</span>
                  </div>
                </div>
                <div className="flex justify-center text-slate-500">↓</div>
                <div>
                  <div className="flex gap-2 items-center">
                    <div className="flex-1 bg-slate-800 p-3 rounded-xl text-white font-semibold">
                      {totalValue.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </div>
                    <div className="w-24">
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

            {/* Coin Details */}
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
              <h3 className="text-lg font-bold mb-4">Coin Details</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-800 p-3 rounded-xl">
                    <div className="text-slate-400 text-xs mb-1">Market Cap</div>
                    <div className="font-semibold text-sm">{cryptoInfo.marketCap}</div>
                  </div>
                  <div className="bg-slate-800 p-3 rounded-xl">
                    <div className="text-slate-400 text-xs mb-1">Market Cap Rank</div>
                    <div className="font-semibold text-sm">#{cryptoInfo.rank}</div>
                  </div>
                </div>

                <div className="bg-slate-800 p-3 rounded-xl">
                  <div className="text-slate-400 text-xs mb-1">Total Volume</div>
                  <div className="font-semibold text-sm">{cryptoInfo.volume}</div>
                </div>

                <div className="bg-slate-800 p-3 rounded-xl">
                  <div className="text-slate-400 text-xs mb-1">Website</div>
                  <a
                    href={cryptoInfo.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1"
                  >
                    Homepage <ExternalLink className="h-3 w-3" />
                  </a>
                </div>

                <div className="bg-slate-800 p-3 rounded-xl">
                  <div className="text-slate-400 text-xs mb-1">Explorer</div>
                  <a
                    href={cryptoInfo.explorer}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1"
                  >
                    Explorer <ExternalLink className="h-3 w-3" />
                  </a>
                </div>

                <div className="bg-slate-800 p-3 rounded-xl">
                  <div className="text-slate-400 text-xs mb-1">Community</div>
                  <a
                    href={cryptoInfo.community}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1"
                  >
                    Community <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CryptoDetailPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-950 flex items-center justify-center">
          <LoadingSpinner />
        </div>
      }
    >
      <CryptoDetailContent />
    </Suspense>
  );
}
