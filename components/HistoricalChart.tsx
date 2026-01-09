
'use client';

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { HistoricalPoint } from '../types/index';

interface Props {
  data: HistoricalPoint[];
  color?: string;
}

export const HistoricalChart: React.FC<Props> = ({ data, color = "#2563eb" }) => {
  if (!data || data.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-slate-400">
        <div className="text-center">
          <p className="text-lg">No Data Available</p>
          <p className="text-sm">Loading chart data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.3}/>
              <stop offset="95%" stopColor={color} stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.5} />
          <XAxis 
            dataKey="date" 
            tick={{ fill: '#94a3b8', fontSize: 12 }}
            tickLine={{ stroke: '#e2e8f0' }}
          />
          <YAxis 
            tick={{ fill: '#94a3b8', fontSize: 12 }}
            tickLine={{ stroke: '#e2e8f0' }}
            domain={['auto', 'auto']}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: '#1e293b',
              border: 'none',
              borderRadius: '8px',
              color: '#fff'
            }}
            formatter={(value: number) => [value.toFixed(4), 'Rate']}
          />
          <Area 
            type="monotone" 
            dataKey="value" 
            stroke={color} 
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorValue)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
