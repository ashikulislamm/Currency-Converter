"use client";
import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { CryptoHistoricalPoint } from "../types/index";

interface CryptoChartProps {
  data: CryptoHistoricalPoint[];
  priceChange: number;
}

export const CryptoChart: React.FC<CryptoChartProps> = ({
  data,
  priceChange,
}) => {
  const isPositive = priceChange >= 0;
  const strokeColor = isPositive ? "#10b981" : "#ef4444";
  const fillColor = isPositive ? "#10b98120" : "#ef444420";

  return (
    <ResponsiveContainer width="100%" height={400}>
      <AreaChart
        data={data}
        margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={strokeColor} stopOpacity={0.3} />
            <stop offset="95%" stopColor={strokeColor} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.2} />
        <XAxis
          dataKey="date"
          stroke="#64748b"
          style={{ fontSize: "12px" }}
          tick={{ fill: "#64748b" }}
        />
        <YAxis
          stroke="#64748b"
          style={{ fontSize: "12px" }}
          tick={{ fill: "#64748b" }}
          domain={["auto", "auto"]}
          tickFormatter={(value) => `$${value.toLocaleString()}`}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "#1e293b",
            border: "1px solid #334155",
            borderRadius: "8px",
            color: "#fff",
          }}
          formatter={(value: any) => {
            if (value === undefined || value === null) return ["N/A", "Price"];
            return [
              `$${parseFloat(value).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}`,
              "Price",
            ];
          }}
          labelStyle={{ color: "#94a3b8" }}
        />
        <Area
          type="monotone"
          dataKey="value"
          stroke={strokeColor}
          strokeWidth={2}
          fillOpacity={1}
          fill="url(#colorValue)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};
