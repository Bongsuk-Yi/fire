import React, { useState } from 'react';
import macroData from '../data/macro.json';
import InteractiveChart from '../components/InteractiveChart';
import { LineChart, Calendar, Info, Layers } from 'lucide-react';

export default function MacroComparison() {
  const [selectedKey1, setSelectedKey1] = useState('sp500');
  const [selectedKey2, setSelectedKey2] = useState('kospi');
  const [range, setRange] = useState('5Y'); // 1Y, 3Y, 5Y, 10Y, ALL

  const item1 = macroData.find((m) => m.key === selectedKey1) || macroData[2];
  const item2 = macroData.find((m) => m.key === selectedKey2) || macroData[0];

  // Filter points according to range
  const filterPoints = (points) => {
    if (!points) return [];
    if (range === '1Y') return points.slice(-12);
    if (range === '3Y') return points.slice(-36);
    if (range === '5Y') return points.slice(-60);
    if (range === '10Y') return points.slice(-120);
    return points;
  };

  const points1 = filterPoints(item1.points);
  const points2 = filterPoints(item2.points);

  // Normalize points so starting point = 100 for side-by-side comparison
  const baseVal1 = points1[0]?.value || 1;
  const baseVal2 = points2[0]?.value || 1;

  const normalizedPoints1 = points1.map((p) => ({
    ...p,
    value: Number(((p.value / baseVal1) * 100).toFixed(1))
  }));

  const normalizedPoints2 = points2.map((p) => ({
    ...p,
    value: Number(((p.value / baseVal2) * 100).toFixed(1))
  }));

  const series = [
    { name: item1.label, color: '#0f766e', points: normalizedPoints1 },
    { name: item2.label, color: '#f2a62b', points: normalizedPoints2 }
  ];

  return (
    <div className="page-shell py-8 sm:py-12 flex-1">
      <div className="flex flex-col gap-2 pb-6 border-b border-[var(--line)]">
        <span className="text-xs font-bold uppercase tracking-wider text-[var(--accent-strong)]">
          Macro Indicators
        </span>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-[var(--foreground)]">
          거시경제 지표 시계열 비교
        </h1>
        <p className="text-xs sm:text-sm text-[var(--muted-foreground)]">
          한국과 미국의 주가지수, 금리, 환율, 원자재, 부동산 지표의 역사적 30년 상관관계를 비교합니다.
        </p>
      </div>

      {/* Selectors and Filters */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[var(--accent)]" />
            <select
              value={selectedKey1}
              onChange={(e) => setSelectedKey1(e.target.value)}
              className="rounded-xl border border-[var(--line)] bg-white px-3 py-1.5 text-xs sm:text-sm font-bold outline-none"
            >
              {macroData.map((m) => (
                <option key={m.key} value={m.key}>
                  {m.label} ({m.source})
                </option>
              ))}
            </select>
          </div>

          <span className="text-xs font-bold text-slate-400">VS</span>

          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[var(--fire-amber)]" />
            <select
              value={selectedKey2}
              onChange={(e) => setSelectedKey2(e.target.value)}
              className="rounded-xl border border-[var(--line)] bg-white px-3 py-1.5 text-xs sm:text-sm font-bold outline-none"
            >
              {macroData.map((m) => (
                <option key={m.key} value={m.key}>
                  {m.label} ({m.source})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Time range buttons */}
        <div className="flex rounded-xl border border-[var(--line)] bg-white p-0.5 text-xs font-semibold">
          {['1Y', '3Y', '5Y', '10Y', 'ALL'].map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRange(r)}
              className={`rounded-lg px-3 py-1.5 ${
                range === r ? 'bg-[var(--navy)] text-white font-bold' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Chart Card */}
      <div className="mt-6 rounded-3xl border border-[var(--line)] bg-white p-5 sm:p-8 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="text-xs text-[var(--muted-foreground)]">
            기준 시점 = 100 정규화 (상대적 상승/하락률 비교)
          </div>
          <div className="text-xs text-[var(--muted-foreground)]">
            데이터 포인트: {points1.length}개
          </div>
        </div>

        <InteractiveChart
          series={series}
          height={380}
          yUnit="p"
        />
      </div>

      {/* Description cards of chosen indicators */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-3xl border border-[var(--line)] bg-white p-5 sm:p-6 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[var(--accent)]" />
            <h3 className="font-bold text-base">{item1.label}</h3>
          </div>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
            {item1.description}
          </p>
          <div className="mt-4 text-xs text-slate-400">
            출처: {item1.source} | 주기: {item1.frequency}
          </div>
        </div>

        <div className="rounded-3xl border border-[var(--line)] bg-white p-5 sm:p-6 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[var(--fire-amber)]" />
            <h3 className="font-bold text-base">{item2.label}</h3>
          </div>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
            {item2.description}
          </p>
          <div className="mt-4 text-xs text-slate-400">
            출처: {item2.source} | 주기: {item2.frequency}
          </div>
        </div>
      </div>
    </div>
  );
}
