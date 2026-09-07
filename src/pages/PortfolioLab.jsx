import React, { useState } from 'react';
import etfData from '../data/etfs.json';
import { PieChart, Plus, Trash2, Sparkles, DollarSign, TrendingUp, AlertTriangle } from 'lucide-react';

export default function PortfolioLab({ navigate }) {
  const [totalInvestment, setTotalInvestment] = useState(10000); // 만원 (1억원)
  const [portfolio, setPortfolio] = useState([
    { ticker: 'SCHD', weight: 40 },
    { ticker: 'QQQM', weight: 30 },
    { ticker: 'JEPI', weight: 15 },
    { ticker: 'TLT', weight: 15 }
  ]);

  const totalWeight = portfolio.reduce((acc, item) => acc + item.weight, 0);

  const handleWeightChange = (index, val) => {
    const next = [...portfolio];
    next[index].weight = Number(val) || 0;
    setPortfolio(next);
  };

  const handleTickerChange = (index, ticker) => {
    const next = [...portfolio];
    next[index].ticker = ticker;
    setPortfolio(next);
  };

  const handleAddRow = () => {
    if (portfolio.length >= 8) return;
    setPortfolio([...portfolio, { ticker: 'VOO', weight: 0 }]);
  };

  const handleRemoveRow = (index) => {
    if (portfolio.length <= 1) return;
    setPortfolio(portfolio.filter((_, i) => i !== index));
  };

  // Portfolio calculations
  let weightedReturn1Y = 0;
  let weightedDividendYield = 0;
  let weightedExpense = 0;

  portfolio.forEach((p) => {
    const etf = etfData.find((e) => e.ticker.toUpperCase() === p.ticker.toUpperCase()) || {};
    const m = etf.metrics || {};
    const factor = p.weight / 100;
    weightedReturn1Y += (m.return1Y || 0) * factor;
    weightedDividendYield += (m.annualDividendYield || 0) * factor;
    weightedExpense += (etf.expenseRatio || 0) * factor;
  });

  const annualDividendIncome = Math.round(totalInvestment * (weightedDividendYield / 100));
  const monthlyDividendIncome = Math.round(annualDividendIncome / 12);

  const formatMoney = (val) => {
    if (val >= 10000) {
      const eok = Math.floor(val / 10000);
      const rem = Math.round(val % 10000);
      return rem > 0 ? `${eok}억 ${rem.toLocaleString()}만원` : `${eok}억원`;
    }
    return `${Math.round(val).toLocaleString()}만원`;
  };

  return (
    <div className="page-shell py-8 sm:py-12 flex-1">
      <div className="flex flex-col gap-2 pb-6 border-b border-[var(--line)]">
        <span className="text-xs font-bold uppercase tracking-wider text-[var(--accent-strong)]">
          Portfolio Lab
        </span>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-[var(--foreground)]">
          ETF 포트폴리오 연구소
        </h1>
        <p className="text-xs sm:text-sm text-[var(--muted-foreground)]">
          배당성장, 기술주성장, 커버드콜, 채권 ETF를 직접 조합하여 기대 배당금과 총수익률을 시뮬레이션합니다.
        </p>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_1fr]">
        {/* Left: Portfolio Builder */}
        <div className="rounded-3xl border border-[var(--line)] bg-white p-5 sm:p-7 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b pb-3">
            <h2 className="text-base font-bold text-[var(--foreground)]">ETF 비중 구성</h2>
            <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded-full ${
              totalWeight === 100 ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
            }`}>
              비중 합계: {totalWeight}% {totalWeight !== 100 && '(100%로 맞춰주세요)'}
            </span>
          </div>

          <div className="space-y-4">
            {portfolio.map((row, index) => {
              const etf = etfData.find((e) => e.ticker.toUpperCase() === row.ticker.toUpperCase()) || {};
              const m = etf.metrics || {};
              return (
                <div key={index} className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <select
                      value={row.ticker}
                      onChange={(e) => handleTickerChange(index, e.target.value)}
                      className="rounded-xl border border-slate-300 bg-white px-2.5 py-1.5 text-xs sm:text-sm font-mono font-bold outline-none max-w-[200px]"
                    >
                      {etfData.map((e) => (
                        <option key={e.id} value={e.ticker.toUpperCase()}>
                          {e.ticker} ({e.name.substring(0, 20)}...)
                        </option>
                      ))}
                    </select>

                    <div className="flex items-center gap-2">
                      <div className="flex items-center rounded-xl border border-slate-300 bg-white px-2 py-1">
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={row.weight}
                          onChange={(e) => handleWeightChange(index, e.target.value)}
                          className="w-12 text-right font-mono font-bold text-xs sm:text-sm outline-none"
                        />
                        <span className="text-xs font-semibold text-slate-500 ml-1">%</span>
                      </div>
                      {portfolio.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveRow(index)}
                          className="p-1 text-slate-400 hover:text-red-500 transition"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>

                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={row.weight}
                    onChange={(e) => handleWeightChange(index, e.target.value)}
                    className="fire-range w-full"
                  />

                  <div className="flex justify-between text-[11px] text-slate-500">
                    <span>{etf.name}</span>
                    <span>1년: {m.return1Y ? m.return1Y.toFixed(1) + '%' : '-'} | 배당: {m.annualDividendYield ? m.annualDividendYield.toFixed(1) + '%' : '-'}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <button
            type="button"
            onClick={handleAddRow}
            disabled={portfolio.length >= 8}
            className="w-full flex items-center justify-center gap-1.5 rounded-2xl border border-dashed border-slate-300 py-3 text-xs sm:text-sm font-bold text-slate-600 hover:border-[var(--accent)] hover:text-[var(--accent)] transition"
          >
            <Plus className="w-4 h-4" /> ETF 종목 추가하기
          </button>

          {/* Investment capital */}
          <div className="pt-4 border-t">
            <div className="flex justify-between text-xs font-bold mb-1">
              <span className="text-slate-600">총 투자 예상 금액</span>
              <span className="font-mono text-[var(--accent-strong)]">{formatMoney(totalInvestment)}</span>
            </div>
            <input
              type="range"
              min="1000"
              max="100000"
              step="1000"
              value={totalInvestment}
              onChange={(e) => setTotalInvestment(Number(e.target.value))}
              className="fire-range w-full"
            />
          </div>
        </div>

        {/* Right: Portfolio Summary */}
        <div className="space-y-6">
          <div className="rounded-3xl border border-[var(--line)] bg-[var(--navy)] text-white p-6 sm:p-8 shadow-xl">
            <span className="text-xs uppercase font-bold text-[var(--fire-amber-soft)] tracking-wider">
              Simulation Result
            </span>

            <h3 className="mt-2 text-xl font-bold">조합 포트폴리오 성과 진단</h3>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                <span className="text-xs text-white/60">가중평균 1년 총수익률</span>
                <p className="numeric mt-1 text-2xl font-bold text-emerald-300">
                  {weightedReturn1Y.toFixed(1)}%
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                <span className="text-xs text-white/60">포트폴리오 연 배당률</span>
                <p className="numeric mt-1 text-2xl font-bold text-[var(--fire-amber)]">
                  {weightedDividendYield.toFixed(2)}%
                </p>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-white/10 space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-white/70">예상 연간 배당소득</span>
                <span className="numeric text-lg font-bold text-white">
                  {formatMoney(annualDividendIncome)}/년
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-white/70">예상 월 환산 현금흐름</span>
                <span className="numeric text-xl font-black text-emerald-300">
                  월 {monthlyDividendIncome.toLocaleString()}만원
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-white/70">가중평균 총보수율</span>
                <span className="numeric text-xs font-bold text-white/90">
                  연 {weightedExpense.toFixed(3)}%
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-[var(--line)] bg-white p-5 sm:p-6 shadow-sm text-xs sm:text-sm text-slate-700 leading-relaxed">
            💡 <strong>포트폴리오 연구소 가이드:</strong><br />
            - <strong>배당성장(SCHD) 40~50%</strong>는 지속적인 현금흐름 증가와 물가 방어를 담당합니다.<br />
            - <strong>지수성장(QQQM/VOO) 30%</strong>는 인플레이션을 능가하는 자산 성장을 주도합니다.<br />
            - <strong>월배당/커버드콜(JEPI)과 채권(TLT)</strong>을 10~20% 섞으면 시장 폭락 시 완충 역할을 수행합니다.
          </div>
        </div>
      </div>
    </div>
  );
}
