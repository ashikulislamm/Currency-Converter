import React from "react";
import { ChevronDown } from "lucide-react";
import { CurrencyCode } from "../types/index";

const FLAGS: Record<string, string> = {
  USD: "🇺🇸",
  EUR: "🇪🇺",
  BDT: "🇧🇩",
  GBP: "🇬🇧",
  JPY: "🇯🇵",
  CAD: "🇨🇦",
  AUD: "🇦🇺",
  CNY: "🇨🇳",
  BTC: "₿",
  ETH: "Ξ",
  BNB: "🟡",
  SOL: "🟣",
};

interface Props {
  value: string;
  onChange: (val: string) => void;
  options: string[];
}

export const CurrencySelector: React.FC<Props> = ({
  value,
  onChange,
  options,
}) => {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="block w-full pl-4 pr-10 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold text-slate-700 dark:text-slate-200 cursor-pointer shadow-sm hover:border-slate-300"
      >
        {options.map((c) => (
          <option key={c} value={c}>
            {FLAGS[c] || "🏳️"} {c}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
    </div>
  );
};
