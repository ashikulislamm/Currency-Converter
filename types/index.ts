
export type CurrencyCode = 'USD' | 'EUR' | 'BDT' | 'GBP' | 'JPY' | 'CAD' | 'AUD' | 'CNY';
export type CryptoCode = 'BTC' | 'ETH' | 'BNB' | 'SOL';

export interface Rates {
  [key: string]: number;
}

export interface CryptoRates {
  [key: string]: number;
}

export interface HistoricalPoint {
  date: string;
  value: number;
}

export interface CryptoHistoricalPoint {
  date: string;
  value: number;
  timestamp?: number;
}
