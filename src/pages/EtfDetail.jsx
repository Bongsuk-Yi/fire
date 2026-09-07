import React from 'react';
import etfData from '../data/etfs.json';
import { ArrowLeft, ExternalLink, TrendingUp, DollarSign, Calendar, ShieldCheck } from 'lucide-react';

export default function EtfDetail({ ticker, navigate }) {
  const etf = etfData.find(
    (e) => e.ticker.toLowerCase() === (ticker || '').toLowerCase()
  ) || etfData.find((e) => e.id.toLowerCase() === (ticker || '').toLowerCase()) || etfData[0];

  const m = etf.metrics || {};

  const formatMoney = (val, curr) => {
    if (!val) return '-';
    if (curr === 'KRW') return `${val.toLocaleString()}원`;
    return `$${val.toLocaleString()}`;
  };

  const formatReturn = (val) => {
    if (val === null || val === undefined) return '-';
    const num = Number(val);
    const sign = num > 0 ? '+' : '';
    const color = num > 0 ? 'text-emerald-600' : num < 0 ? 'text-red-500' : 'text-slate-700';
    return <span className={color}>{sign}{num.toFixed(2)}%</span>;
  };

  return (
    <div className="page-shell py-8 sm:py-12 flex-1">
      {/* Back Button */}
      <button
        onClick={() => navigate('/etf')}
        className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-[var(--accent-strong)] hover:underline mb-4"
      >
        <ArrowLeft className="w-4 h-4" /> 전체 ETF 목록으로 돌아가기
      </button>

      {/* Detail Header Banner */}
      <div className="rounded-3xl border border-[var(--line)] bg-white p-6 sm:p-8 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="numeric text-2xl sm:text-3xl font-black text-[var(--accent-strong)]">
                {etf.ticker}
              </span>
              <span className="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-bold text-slate-700">
                {etf.country}
              </span>
              <span className="rounded-full bg-[var(--accent-soft)] px-3 py-0.5 text-xs font-bold text-[var(--accent-strong)]">
                {etf.category}
              </span>
            </div>
            <h1 className="mt-2 text-xl sm:text-2xl font-extrabold text-[var(--foreground)]">
              {etf.name}
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-[var(--muted-foreground)]">
              운용사: {etf.provider || '정보 없음'} | 벤치마크: {etf.benchmark || '정보 없음'}
            </p>
          </div>

          <div className="text-right">
            <div className="text-xs text-[var(--muted-foreground)]">현재 주가</div>
            <div className="numeric text-2xl sm:text-4xl font-black text-[var(--foreground)]">
              {formatMoney(m.price, etf.currency)}
            </div>
            <div className="text-xs text-[var(--muted-foreground)] mt-0.5">
              NAV: {formatMoney(m.nav, etf.currency)} | 기준일: {etf.dataAsOf}
            </div>
          </div>
        </div>

        {/* Quick Returns Grid */}
        <div className="mt-8 grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3 text-center">
          <div className="rounded-2xl bg-[var(--surface-muted)] p-3">
            <span className="text-[11px] text-[var(--muted-foreground)]">1개월</span>
            <p className="numeric mt-1 text-sm sm:text-base font-bold">{formatReturn(m.return1M)}</p>
          </div>
          <div className="rounded-2xl bg-[var(--surface-muted)] p-3">
            <span className="text-[11px] text-[var(--muted-foreground)]">3개월</span>
            <p className="numeric mt-1 text-sm sm:text-base font-bold">{formatReturn(m.return3M)}</p>
          </div>
          <div className="rounded-2xl bg-[var(--surface-muted)] p-3">
            <span className="text-[11px] text-[var(--muted-foreground)]">연초이후(YTD)</span>
            <p className="numeric mt-1 text-sm sm:text-base font-bold">{formatReturn(m.returnYTD)}</p>
          </div>
          <div className="rounded-2xl bg-[var(--surface-muted)] p-3">
            <span className="text-[11px] text-[var(--muted-foreground)]">1년 총수익률</span>
            <p className="numeric mt-1 text-sm sm:text-base font-bold">{formatReturn(m.return1Y)}</p>
          </div>
          <div className="rounded-2xl bg-[var(--surface-muted)] p-3">
            <span className="text-[11px] text-[var(--muted-foreground)]">3년 CAGR</span>
            <p className="numeric mt-1 text-sm sm:text-base font-bold">{formatReturn(m.cagr3Y)}</p>
          </div>
          <div className="rounded-2xl bg-[var(--surface-muted)] p-3">
            <span className="text-[11px] text-[var(--muted-foreground)]">5년 CAGR</span>
            <p className="numeric mt-1 text-sm sm:text-base font-bold">{formatReturn(m.cagr5Y)}</p>
          </div>
        </div>
      </div>

      {/* Details Grid */}
      <div className="mt-8 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        {/* Left: Description & Strategy */}
        <div className="rounded-3xl border border-[var(--line)] bg-white p-6 sm:p-8 shadow-sm space-y-6">
          <div>
            <h2 className="text-lg font-bold text-[var(--foreground)] border-b pb-3">투자 설명 및 운용 전략</h2>
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-slate-700 whitespace-pre-line">
              {etf.description || '상세 전략 설명이 준비 중입니다.'}
            </p>
          </div>

          <div className="pt-4 border-t border-slate-100">
            <h3 className="text-sm font-bold text-[var(--foreground)] mb-3">전략 태그 및 특성</h3>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-lg bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                통화: {etf.currency}
              </span>
              <span className="rounded-lg bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                환헤지: {etf.hedged ? '환헤지(H)' : '환노출'}
              </span>
              <span className="rounded-lg bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                상장일: {etf.inceptionDate || '정보 없음'}
              </span>
              {etf.dividendGrowthYears && (
                <span className="rounded-lg bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-800">
                  배당성장: {etf.dividendGrowthYears}년 연속
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Right: Key Stats Summary */}
        <div className="rounded-3xl border border-[var(--line)] bg-white p-6 sm:p-8 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-[var(--foreground)] border-b pb-3">핵심 지표 요약</h2>

          <div className="divide-y divide-slate-100 text-xs sm:text-sm">
            <div className="py-2.5 flex justify-between">
              <span className="text-[var(--muted-foreground)]">연 배당률 (Distribution Yield)</span>
              <span className="font-mono font-bold text-amber-700">
                {m.annualDividendYield ? `${m.annualDividendYield.toFixed(2)}%` : '-'}
              </span>
            </div>
            <div className="py-2.5 flex justify-between">
              <span className="text-[var(--muted-foreground)]">배당 지급 주기</span>
              <span className="font-bold">{etf.distributionFrequency === 'MONTHLY' ? '월배당' : '분기배당'}</span>
            </div>
            <div className="py-2.5 flex justify-between">
              <span className="text-[var(--muted-foreground)]">총보수 비율 (Expense Ratio)</span>
              <span className="font-mono font-bold">{etf.expenseRatio !== undefined ? `${etf.expenseRatio.toFixed(2)}%` : '-'}</span>
            </div>
            <div className="py-2.5 flex justify-between">
              <span className="text-[var(--muted-foreground)]">운용 규모 (AUM)</span>
              <span className="font-mono font-bold">
                {etf.currency === 'KRW'
                  ? `${Math.floor((etf.assetsUnderManagement || 0) / 100000000).toLocaleString()}억원`
                  : `$${((etf.assetsUnderManagement || 0) / 1000000).toLocaleString()}M`}
              </span>
            </div>
            <div className="py-2.5 flex justify-between">
              <span className="text-[var(--muted-foreground)]">1년 변동성 (Volatility)</span>
              <span className="font-mono font-bold">{m.volatility1Y ? `${m.volatility1Y.toFixed(1)}%` : '-'}</span>
            </div>
          </div>

          <div className="pt-4">
            <button
              onClick={() => navigate(`/compare?tickers=${etf.ticker},QQQM`)}
              className="w-full rounded-2xl bg-[var(--accent)] text-white py-3 text-xs sm:text-sm font-bold hover:bg-[var(--accent-strong)] transition"
            >
              다른 ETF와 1:1 비교하기 →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
