"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { CurrencyCode, CryptoCode, Rates, CryptoRates } from "../types/index";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface CurrencyContextType {
  rates: Rates;
  cryptoRates: CryptoRates;
  loading: boolean;
  baseCurrency: CurrencyCode;
  targetCurrency: CurrencyCode;
  setBaseCurrency: (code: CurrencyCode) => void;
  setTargetCurrency: (code: CurrencyCode) => void;
  convertFiat: (amount: number, from: string, to: string) => number;
  lastUpdated: Date | null;
  supportedCurrencies: CurrencyCode[];
  supportedCrypto: CryptoCode[];
}

const CurrencyContext = createContext<CurrencyContextType>(
  {} as CurrencyContextType
);

export const SUPPORTED_CURRENCIES: CurrencyCode[] = [
  "USD",
  "EUR",
  "BDT",
  "GBP",
  "JPY",
  "CAD",
  "AUD",
  "CNY",
];
export const SUPPORTED_CRYPTO: CryptoCode[] = ["BTC", "ETH", "BNB", "SOL"];

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [rates, setRates] = useState<Rates>({});
  const [cryptoRates, setCryptoRates] = useState<CryptoRates>({});
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const [baseCurrency, setBaseCurrency] = useLocalStorage<CurrencyCode>(
    "baseCurrency",
    "USD"
  );
  const [targetCurrency, setTargetCurrency] = useLocalStorage<CurrencyCode>(
    "targetCurrency",
    "BDT"
  );

  // Fetch Fiat
  const fetchRates = async () => {
    try {
      const res = await fetch("https://open.er-api.com/v6/latest/USD");
      const data = await res.json();
      if (data && data.rates) {
        setRates(data.rates);
        setLastUpdated(new Date());
        setLoading(false);
      }
    } catch (err) {
      console.error("Failed to fetch rates", err);
    }
  };

  useEffect(() => {
    fetchRates();
    const interval = setInterval(fetchRates, 60000);
    return () => clearInterval(interval);
  }, []);

  // Fetch Crypto
  useEffect(() => {
    const streams = SUPPORTED_CRYPTO.map(
      (c) => `${c.toLowerCase()}usdt@trade`
    ).join("/");
    const ws = new WebSocket(
      `wss://stream.binance.com:9443/stream?streams=${streams}`
    );

    ws.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        if (message.data?.s && message.data?.p) {
          const symbol = message.data.s.replace("USDT", "");
          const price = parseFloat(message.data.p);
          setCryptoRates((prev) => ({ ...prev, [symbol]: price }));
        }
      } catch (e) {
        /* ignore */
      }
    };
    return () => ws.close();
  }, []);

  const convertFiat = useCallback(
    (amount: number, from: string, to: string) => {
      if (!rates[from] || !rates[to]) return 0;
      const rate = (1 / rates[from]) * rates[to];
      return amount * rate;
    },
    [rates]
  );

  return (
    <CurrencyContext.Provider
      value={{
        rates,
        cryptoRates,
        loading,
        baseCurrency,
        targetCurrency,
        setBaseCurrency,
        setTargetCurrency,
        convertFiat,
        lastUpdated,
        supportedCurrencies: SUPPORTED_CURRENCIES,
        supportedCrypto: SUPPORTED_CRYPTO,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => useContext(CurrencyContext);
