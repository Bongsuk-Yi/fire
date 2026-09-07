import React, { useState, useEffect } from 'react';
import etfData from '../data/etfs.json';
import { ArrowLeft, Check, Plus, RefreshCw } from 'lucide-react';

export default function EtfCompare({ navigate }) {
  // Read tickers from URL search or hash (e.g. ?tickers=SCHD,QQQM)
  const [ticker1, setTicker1] = useState('SCHD');
  const [ticker2, setTicker2] = useState('QQQM');

  useEffect(() => {
    const hash = window.location.hash;
    const qIndex = hash.indexOf('?');
    if (qIndex !== -1) {
      const query = new URLSearchParams(hash.substring(qIndex));
      const tickers = query.get('tickers');
      if (tickers) {
        const parts = tickers.split(',');
        if (parts[0]) setTicker1(parts[0].toUpperCase());
        if (parts[1]) setTicker2(parts[1].toUpperCase());
      }
    }
  }, []);

  const etfA = etfData.find((e) => e.ticker.toUpperCase() === ticker1) || etfData[0];
  const etfB = etfData.find((e) => e.ticker.toUpperCase() === ticker2) || etfData[1];

  const mA = etfA.metrics || {};
  const mB = etfB.metrics || {};

  const rows = [
    { label: '티커 / 종목명', valA: `${etfA.ticker} (${etfA.name})`, valB: `${etfB.ticker} (${etfB.name})` },
    { label: '카테고리', valA: etfA.category, valB: etfB.category },
    { label: '운용사', valA: etfA.provider, valB: etfB.provider },
    { label: '현재가 / 통화', valA: `${mA.price?.toLocaleString()} ${etfA.currency}`, valB: `${mB.price?.toLocaleString()} ${etfB.currency}` },
    { label: '1년 총수익률', valA: `${mA.return1Y ? mA.return1Y.toFixed(1) + '%' : '-'}`, valB: `${mB.return1Y ? mB.return1Y.toFixed(1) + '%' : '-'}`, highlight: true },
    { label: '3년 CAGR', valA: `${mA.cagr3Y ? mA.cagr3Y.toFixed(1) + '%' : '-'}`, valB: `${mB.cagr3Y ? mB.cagr3Y.toFixed(1) + '%' : '-'}` },
    { label: '연 배당률', valA: `${mA.annualDividendYield ? mA.annualDividendYield.toFixed(1) + '%' : '-'}`, valB: `${mB.annualDividendYield ? mB.annualDividendYield.toFixed(1) + '%' : '-'}`, highlight: true },
    { label: '배당 주기', valA: etfA.distributionFrequency, valB: etfB.distributionFrequency },
    { label: '총보수(비용)', valA: `${etfA.expenseRatio?.toFixed(2)}%`, valB: `${etfB.expenseRatio?.toFixed(2)}%` },
    { label: '1년 변동성', valA: `${mA.volatility1Y ? mA.volatility1Y.toFixed(1) + '%' : '-'}`, valB: `${mB.volatility1Y ? mB.volatility1Y.toFixed(1) + '%' : '-'}` },
    { label: '상장일', valA: etfA.inceptionDate, valB: etfB.inceptionDate },
  ];

  return (
    <div className="page-shell py-8 sm:py-12 flex-1">
      <div className="flex flex-col gap-2 pb-6 border-b border-[var(--line)]">
        <span className="text-xs font-bold uppercase tracking-wider text-[var(--accent-strong)]">
          Compare Matrix
        </span>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-[var(--foreground)]">
          ETF 1:1 심층 비교
        </h1>
        <p className="text-xs sm:text-sm text-[var(--muted-foreground)]">
          두 ETF의 총수익률, 배당 성향, 변동성과 수수료를 한눈에 비교하고 포트폴리오 적합성을 점검합니다.
        </p>
      </div>

      {/* Selectors */}
      <div className="mt-6 grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-500 mb-1">비교 ETF 1</label>
          <select
            value={ticker1}
            onChange={(e) => setTicker1(e.target.value)}
            className="w-full rounded-2xl border border-[var(--line)] bg-white p-3 font-mono font-bold text-sm outline-none"
          >
            {etfData.map((e) => (
              <option key={e.id} value={e.ticker.toUpperCase()}>
                {e.ticker} - {e.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-500 mb-1">비교 ETF 2</label>
          <select
            value={ticker2}
            onChange={(e) => setTicker2(e.target.value)}
            className="w-full rounded-2xl border border-[var(--line)] bg-white p-3 font-mono font-bold text-sm outline-none"
          >
            {etfData.map((e) => (
              <option key={e.id} value={e.ticker.toUpperCase()}>
                {e.ticker} - {e.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="mt-8 rounded-3xl border border-[var(--line)] bg-white overflow-hidden shadow-sm">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead className="bg-[var(--navy)] text-white">
            <tr>
              <th className="py-4 px-4 sm:px-6 w-1/4">지표</th>
              <th className="py-4 px-4 sm:px-6 w-3/8 text-[var(--fire-amber-soft)] font-mono font-bold text-base">
                {etfA.ticker}
              </th>
              <th className="py-4 px-4 sm:px-6 w-3/8 text-emerald-300 font-mono font-bold text-base">
                {etfB.ticker}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((r, i) => (
              <tr key={i} className={`hover:bg-slate-50 ${r.highlight ? 'bg-amber-50/50' : ''}`}>
                <td className="py-3.5 px-4 sm:px-6 font-bold text-slate-600">{r.label}</td>
                <td className="py-3.5 px-4 sm:px-6 font-mono font-semibold text-slate-900">{r.valA}</td>
                <td className="py-3.5 px-4 sm:px-6 font-mono font-semibold text-slate-900">{r.valB}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
