
import React from 'react';
import { HistoricalPoint } from '../types/index';

interface Props {
  data: HistoricalPoint[];
  color?: string;
}

export const HistoricalChart: React.FC<Props> = ({ data, color = "#10b981" }) => {
  if (!data || data.length === 0) return <div className="h-48 flex items-center justify-center text-gray-400">No Data</div>;

  const width = 100;
  const height = 40;
  const padding = 2;

  const minVal = Math.min(...data.map(d => d.value));
  const maxVal = Math.max(...data.map(d => d.value));
  const range = maxVal - minVal || 1;

  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * (width - padding * 2) + padding;
    const normalizedVal = (d.value - minVal) / range;
    const y = height - (normalizedVal * (height - padding * 2) + padding);
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="w-full h-64 relative group cursor-crosshair">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible drop-shadow-sm">
        <defs>
          <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.2" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        <polygon points={`${padding},${height} ${points} ${width-padding},${height}`} fill="url(#chartGradient)" />
        <polyline fill="none" stroke={color} strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" points={points} />
      </svg>
      <div className="absolute bottom-0 left-0 text-xs text-gray-400 font-mono">{data[0].date}</div>
      <div className="absolute bottom-0 right-0 text-xs text-gray-400 font-mono">{data[data.length - 1].date}</div>
      <div className="absolute top-2 left-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur px-2 py-1 rounded shadow text-xs font-medium">
        High: {maxVal.toFixed(4)} <br/> Low: {minVal.toFixed(4)}
      </div>
    </div>
  );
};
