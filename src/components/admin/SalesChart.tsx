import React, { useState } from 'react';
import { PeriodSalesData, ChartDataPoint } from '../../data/salesData';
import { TrendingUp, Calendar, BarChart3, Droplets, ShoppingBag, ArrowUpRight, DollarSign } from 'lucide-react';

interface SalesChartProps {
  weeklyData: PeriodSalesData;
  monthlyData: PeriodSalesData;
  yearlyData: PeriodSalesData;
  selectedPeriod: 'weekly' | 'monthly' | 'yearly';
  onSelectPeriod: (period: 'weekly' | 'monthly' | 'yearly') => void;
}

export const SalesChart: React.FC<SalesChartProps> = ({
  weeklyData,
  monthlyData,
  yearlyData,
  selectedPeriod,
  onSelectPeriod,
}) => {
  const [metric, setMetric] = useState<'revenue' | 'liters' | 'orders'>('revenue');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const currentData: PeriodSalesData =
    selectedPeriod === 'weekly'
      ? weeklyData
      : selectedPeriod === 'monthly'
      ? monthlyData
      : yearlyData;

  const points = currentData.dataPoints;

  // Determine max value for SVG scaling
  const getVal = (p: ChartDataPoint) => {
    if (metric === 'revenue') return p.revenueNgn;
    if (metric === 'liters') return p.liters;
    return p.ordersCount;
  };

  const values = points.map(getVal);
  const maxValue = Math.max(...values, 1);

  const formatMetricVal = (val: number) => {
    if (metric === 'revenue') return `₦${val.toLocaleString()}`;
    if (metric === 'liters') return `${val.toLocaleString()} L`;
    return `${val.toLocaleString()} orders`;
  };

  // SVG dimensions
  const chartHeight = 240;
  const paddingX = 40;
  const paddingY = 30;
  const chartWidth = 720;
  const usableWidth = chartWidth - paddingX * 2;
  const usableHeight = chartHeight - paddingY * 2;

  // Calculate coordinates for bars and line
  const coords = points.map((p, idx) => {
    const x = paddingX + (idx / Math.max(points.length - 1, 1)) * usableWidth;
    const barX = paddingX + (idx + 0.15) * (usableWidth / points.length);
    const barWidth = Math.max(14, (usableWidth / points.length) * 0.65);
    const val = getVal(p);
    const yRatio = val / maxValue;
    const y = chartHeight - paddingY - yRatio * usableHeight;
    const barHeight = Math.max(4, yRatio * usableHeight);
    return { x, barX, barWidth, y, barHeight, val, point: p };
  });

  // Generate SVG path for line
  const linePath = coords.reduce((acc, curr, i) => {
    return i === 0 ? `M ${curr.barX + curr.barWidth / 2} ${curr.y}` : `${acc} L ${curr.barX + curr.barWidth / 2} ${curr.y}`;
  }, '');

  return (
    <div className="bg-white rounded-3xl border border-[#E8DFD5] p-6 sm:p-8 shadow-xs space-y-8">
      
      {/* Top Header Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[#F0EBE1]">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#B85D0D] mb-1">
            <BarChart3 className="w-4 h-4" />
            <span>Sales Record & Growth Tracker</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#153823]">
            {currentData.title}
          </h2>
          <p className="text-xs sm:text-sm text-[#6B6154] mt-1">
            {currentData.subtitle}
          </p>
        </div>

        {/* Structure Selector (Weekly / Monthly / Yearly) & Metric Selector */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Period Toggle */}
          <div className="inline-flex p-1 bg-[#FAF7F2] rounded-2xl border border-[#E0D7CC]">
            {(
              [
                { id: 'weekly', label: 'Weekly' },
                { id: 'monthly', label: 'Monthly' },
                { id: 'yearly', label: 'Yearly' },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                onClick={() => onSelectPeriod(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedPeriod === tab.id
                    ? 'bg-[#153823] text-white shadow-xs'
                    : 'text-[#5C554B] hover:text-[#153823] hover:bg-[#F0EBE1]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Metric Toggle */}
          <div className="inline-flex p-1 bg-[#FAF7F2] rounded-2xl border border-[#E0D7CC]">
            {(
              [
                { id: 'revenue', label: 'Revenue (₦)' },
                { id: 'liters', label: 'Liters (L)' },
                { id: 'orders', label: 'Orders' },
              ] as const
            ).map((m) => (
              <button
                key={m.id}
                onClick={() => setMetric(m.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  metric === m.id
                    ? 'bg-[#E07A1E] text-white shadow-xs'
                    : 'text-[#6B6154] hover:text-[#153823]'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Revenue */}
        <div className="bg-[#FAF7F2] p-4 sm:p-5 rounded-2xl border border-[#E8DFD5] space-y-1">
          <div className="flex items-center justify-between text-xs text-[#6B6154]">
            <span className="font-semibold uppercase tracking-wider text-[10px]">Total Revenue</span>
            <span className="p-1.5 rounded-lg bg-[#153823]/10 text-[#153823]">
              <DollarSign className="w-3.5 h-3.5" />
            </span>
          </div>
          <p className="font-serif text-xl sm:text-2xl font-bold text-[#153823] tabular-nums">
            ₦{currentData.totalRevenueNgn.toLocaleString()}
          </p>
          <div className="flex items-center gap-1 text-[11px] text-emerald-700 font-semibold pt-1">
            <TrendingUp className="w-3 h-3" />
            <span>+{currentData.growthRatePercent}% vs prev period</span>
          </div>
        </div>

        {/* Liters Bottled & Sold */}
        <div className="bg-[#FAF7F2] p-4 sm:p-5 rounded-2xl border border-[#E8DFD5] space-y-1">
          <div className="flex items-center justify-between text-xs text-[#6B6154]">
            <span className="font-semibold uppercase tracking-wider text-[10px]">Volume Sold</span>
            <span className="p-1.5 rounded-lg bg-[#E07A1E]/15 text-[#E07A1E]">
              <Droplets className="w-3.5 h-3.5" />
            </span>
          </div>
          <p className="font-serif text-xl sm:text-2xl font-bold text-[#153823] tabular-nums">
            {currentData.totalLiters.toLocaleString()} <span className="text-sm font-sans font-normal text-[#6B6154]">Litres</span>
          </p>
          <p className="text-[11px] text-[#6B6154] pt-1">
            Pure unadulterated virgin oil
          </p>
        </div>

        {/* Total Orders */}
        <div className="bg-[#FAF7F2] p-4 sm:p-5 rounded-2xl border border-[#E8DFD5] space-y-1">
          <div className="flex items-center justify-between text-xs text-[#6B6154]">
            <span className="font-semibold uppercase tracking-wider text-[10px]">Total Orders</span>
            <span className="p-1.5 rounded-lg bg-[#153823]/10 text-[#153823]">
              <ShoppingBag className="w-3.5 h-3.5" />
            </span>
          </div>
          <p className="font-serif text-xl sm:text-2xl font-bold text-[#153823] tabular-nums">
            {currentData.totalOrders.toLocaleString()}
          </p>
          <p className="text-[11px] text-emerald-700 font-semibold pt-1">
            100% fulfillment rate
          </p>
        </div>

        {/* Average Order Value (AOV) */}
        <div className="bg-[#FAF7F2] p-4 sm:p-5 rounded-2xl border border-[#E8DFD5] space-y-1">
          <div className="flex items-center justify-between text-xs text-[#6B6154]">
            <span className="font-semibold uppercase tracking-wider text-[10px]">Avg Order Value</span>
            <span className="p-1.5 rounded-lg bg-[#B85D0D]/15 text-[#B85D0D]">
              <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </div>
          <p className="font-serif text-xl sm:text-2xl font-bold text-[#153823] tabular-nums">
            ₦{currentData.averageOrderValueNgn.toLocaleString()}
          </p>
          <p className="text-[11px] text-[#6B6154] pt-1">
            Household & wholesale mix
          </p>
        </div>
      </div>

      {/* Visual SVG Chart Display */}
      <div className="relative bg-[#FAF7F2] rounded-3xl border border-[#E8DFD5] p-4 sm:p-6 overflow-hidden">
        
        {/* Subtle grid lines & axes */}
        <div className="absolute inset-x-6 top-8 bottom-12 flex flex-col justify-between pointer-events-none opacity-40">
          <div className="border-b border-dashed border-[#D5C6B5]" />
          <div className="border-b border-dashed border-[#D5C6B5]" />
          <div className="border-b border-dashed border-[#D5C6B5]" />
          <div className="border-b border-[#C4B29E]" />
        </div>

        {/* Responsive SVG Container */}
        <div className="w-full overflow-x-auto">
          <svg
            viewBox={`0 0 ${chartWidth} ${chartHeight}`}
            className="w-full h-64 min-w-[500px] overflow-visible"
          >
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#153823" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#25653F" stopOpacity="0.75" />
              </linearGradient>
              <linearGradient id="barGradientHover" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#E07A1E" stopOpacity="1" />
                <stop offset="100%" stopColor="#B85D0D" stopOpacity="0.85" />
              </linearGradient>
              <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#E07A1E" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#E07A1E" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Bars */}
            {coords.map((item, idx) => {
              const isHovered = hoveredIndex === idx;
              return (
                <g
                  key={idx}
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="cursor-pointer transition-all duration-200"
                >
                  <rect
                    x={item.barX}
                    y={chartHeight - paddingY - item.barHeight}
                    width={item.barWidth}
                    height={item.barHeight}
                    rx={6}
                    fill={isHovered ? 'url(#barGradientHover)' : 'url(#barGradient)'}
                    className="transition-all duration-300"
                  />
                  {/* Active highlight top cap */}
                  <rect
                    x={item.barX}
                    y={chartHeight - paddingY - item.barHeight}
                    width={item.barWidth}
                    height={3}
                    rx={1.5}
                    fill="#FDF0E1"
                    opacity={0.8}
                  />
                </g>
              );
            })}

            {/* Connecting Trend Line */}
            {coords.length > 1 && (
              <path
                d={linePath}
                fill="none"
                stroke="#E07A1E"
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="opacity-80"
              />
            )}

            {/* Data Point Dots on the trend line */}
            {coords.map((item, idx) => {
              const isHovered = hoveredIndex === idx;
              const dotX = item.barX + item.barWidth / 2;
              return (
                <circle
                  key={`dot-${idx}`}
                  cx={dotX}
                  cy={item.y}
                  r={isHovered ? 6 : 4}
                  fill={isHovered ? '#E07A1E' : '#FFFFFF'}
                  stroke="#153823"
                  strokeWidth={2}
                  className="transition-all duration-200"
                />
              );
            })}

            {/* X Axis Labels */}
            {coords.map((item, idx) => {
              const labelX = item.barX + item.barWidth / 2;
              const isHovered = hoveredIndex === idx;
              return (
                <g key={`lbl-${idx}`}>
                  <text
                    x={labelX}
                    y={chartHeight - 8}
                    textAnchor="middle"
                    className={`text-[11px] font-bold ${
                      isHovered ? 'fill-[#153823]' : 'fill-[#6B6154]'
                    }`}
                  >
                    {item.point.label}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Floating Tooltip card */}
        {hoveredIndex !== null && coords[hoveredIndex] && (
          <div className="mt-4 p-3.5 bg-white rounded-2xl border border-[#E07A1E]/50 shadow-lg flex flex-wrap items-center justify-between gap-4 animate-in fade-in duration-150">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#B85D0D] block">
                {coords[hoveredIndex].point.label} {coords[hoveredIndex].point.subLabel ? `· ${coords[hoveredIndex].point.subLabel}` : ''}
              </span>
              <span className="font-serif text-lg font-bold text-[#153823]">
                {formatMetricVal(coords[hoveredIndex].val)}
              </span>
            </div>
            <div className="flex items-center gap-4 text-xs text-[#6B6154]">
              <div>
                <span className="block text-[10px] uppercase font-semibold text-[#8C8274]">Revenue</span>
                <span className="font-bold text-[#153823]">₦{coords[hoveredIndex].point.revenueNgn.toLocaleString()}</span>
              </div>
              <div className="h-6 w-px bg-[#E8DFD5]" />
              <div>
                <span className="block text-[10px] uppercase font-semibold text-[#8C8274]">Volume</span>
                <span className="font-bold text-[#153823]">{coords[hoveredIndex].point.liters.toLocaleString()} Litres</span>
              </div>
              <div className="h-6 w-px bg-[#E8DFD5]" />
              <div>
                <span className="block text-[10px] uppercase font-semibold text-[#8C8274]">Orders</span>
                <span className="font-bold text-[#153823]">{coords[hoveredIndex].point.ordersCount}</span>
              </div>
              {coords[hoveredIndex].point.growthPercent !== undefined && (
                <>
                  <div className="h-6 w-px bg-[#E8DFD5]" />
                  <div>
                    <span className="block text-[10px] uppercase font-semibold text-[#8C8274]">Trend</span>
                    <span className={`font-bold ${coords[hoveredIndex].point.growthPercent! >= 0 ? 'text-emerald-700' : 'text-rose-600'}`}>
                      {coords[hoveredIndex].point.growthPercent! >= 0 ? '+' : ''}{coords[hoveredIndex].point.growthPercent}%
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Breakdown Data Table for the active timeframe */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#153823]">
            {selectedPeriod.toUpperCase()} Breakdown Log
          </h3>
          <span className="text-xs text-[#6B6154]">
            {points.length} reporting intervals
          </span>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-[#E8DFD5]">
          <table className="w-full text-left text-xs text-[#241F17]">
            <thead className="bg-[#FAF7F2] text-[11px] font-bold uppercase tracking-wider text-[#6B6154] border-b border-[#E8DFD5]">
              <tr>
                <th className="py-3 px-4">Period / Date</th>
                <th className="py-3 px-4">Sales Revenue (₦)</th>
                <th className="py-3 px-4">Volume (Litres)</th>
                <th className="py-3 px-4">Orders</th>
                <th className="py-3 px-4">Avg / Order</th>
                <th className="py-3 px-4 text-right">Growth Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0EBE1] bg-white">
              {points.map((pt, i) => {
                const avg = Math.round(pt.revenueNgn / Math.max(pt.ordersCount, 1));
                return (
                  <tr
                    key={i}
                    onMouseEnter={() => setHoveredIndex(i)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    className={`hover:bg-[#FAF7F2] transition-colors cursor-pointer ${
                      hoveredIndex === i ? 'bg-[#FFF8F0]' : ''
                    }`}
                  >
                    <td className="py-3 px-4 font-bold text-[#153823]">
                      <span>{pt.label}</span>
                      {pt.subLabel && (
                        <span className="block text-[10px] font-normal text-[#8C8274]">
                          {pt.subLabel}
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 font-semibold text-[#153823] tabular-nums">
                      ₦{pt.revenueNgn.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-[#5C554B] tabular-nums">
                      {pt.liters.toLocaleString()} L
                    </td>
                    <td className="py-3 px-4 text-[#5C554B] tabular-nums">
                      {pt.ordersCount}
                    </td>
                    <td className="py-3 px-4 text-[#5C554B] tabular-nums">
                      ₦{avg.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-right tabular-nums">
                      {pt.growthPercent !== undefined ? (
                        <span
                          className={`font-semibold inline-flex items-center gap-0.5 px-2 py-0.5 rounded-md text-[10px] ${
                            pt.growthPercent >= 0
                              ? 'bg-emerald-50 text-emerald-700'
                              : 'bg-rose-50 text-rose-700'
                          }`}
                        >
                          {pt.growthPercent >= 0 ? '+' : ''}
                          {pt.growthPercent}%
                        </span>
                      ) : (
                        <span className="text-[#8C8274]">-</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
