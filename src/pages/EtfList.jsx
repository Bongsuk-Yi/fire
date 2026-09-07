import React, { useState, useMemo } from 'react';
import etfData from '../data/etfs.json';
import EtfCard from '../components/EtfCard';
import { Search, Filter, ArrowUpDown, ArrowRight, X, Check } from 'lucide-react';

export default function EtfList({ navigate, onToggleCompare, comparedList, onClearCompare }) {
  // Query param check (e.g. ?category=DIVIDEND)
  const [category, setCategory] = useState('ALL');
  const [country, setCountry] = useState('ALL');
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState('return1Y'); // return1Y, dividend, aum, expense

  // Filter ETFs
  const filteredEtfs = useMemo(() => {
    return etfData.filter((e) => {
      if (category !== 'ALL' && e.category !== category) return false;
      if (country !== 'ALL' && e.country !== country) return false;
      if (search.trim()) {
        const q = search.trim().toLowerCase();
        const matchTicker = e.ticker.toLowerCase().includes(q);
        const matchName = (e.name || '').toLowerCase().includes(q);
        const matchProvider = (e.provider || '').toLowerCase().includes(q);
        if (!matchTicker && !matchName && !matchProvider) return false;
      }
      return true;
    }).sort((a, b) => {
      const mA = a.metrics || {};
      const mB = b.metrics || {};
      if (sortKey === 'return1Y') {
        return (mB.return1Y ?? -999) - (mA.return1Y ?? -999);
      }
      if (sortKey === 'dividend') {
        return (mB.annualDividendYield ?? -999) - (mA.annualDividendYield ?? -999);
      }
      if (sortKey === 'aum') {
        return (b.assetsUnderManagement ?? 0) - (a.assetsUnderManagement ?? 0);
      }
      if (sortKey === 'expense') {
        return (a.expenseRatio ?? 999) - (b.expenseRatio ?? 999);
      }
      return 0;
    });
  }, [category, country, search, sortKey]);

  const categories = [
    { id: 'ALL', label: '전체' },
    { id: 'DIVIDEND', label: '배당' },
    { id: 'GROWTH', label: '성장' },
    { id: 'COVERED_CALL', label: '커버드콜' },
    { id: 'BOND', label: '채권' },
    { id: 'REIT', label: '리츠' },
  ];

  return (
    <div className="page-shell py-8 sm:py-12 flex-1">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between pb-6 border-b border-[var(--line)]">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--accent-strong)]">
            ETF Database
          </span>
          <h1 className="mt-1 text-2xl sm:text-4xl font-extrabold tracking-tight text-[var(--foreground)]">
            ETF 분석 및 탐색
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-[var(--muted-foreground)]">
            국내외 55개 주요 ETF의 실시간 가격, 1년 총수익률, 배당률, 자산규모 및 보수를 비교하세요.
          </p>
        </div>

        <div className="text-xs text-[var(--muted-foreground)] font-mono">
          총 <strong>{filteredEtfs.length}</strong>개 ETF 검색됨
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Category Pills */}
        <div className="flex flex-wrap gap-1.5">
          {categories.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setCategory(c.id)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
                category === c.id
                  ? 'bg-[var(--navy)] text-white font-bold'
                  : 'bg-white border border-[var(--line)] text-slate-600 hover:bg-slate-50'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Country & Sort & Search */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Country Toggle */}
          <div className="flex rounded-xl border border-[var(--line)] bg-white p-0.5 text-xs font-semibold">
            {['ALL', 'US', 'KR'].map((cnt) => (
              <button
                key={cnt}
                type="button"
                onClick={() => setCountry(cnt)}
                className={`rounded-lg px-2.5 py-1 ${
                  country === cnt ? 'bg-[var(--accent)] text-white' : 'text-slate-600'
                }`}
              >
                {cnt === 'ALL' ? '전체' : cnt === 'US' ? '미국' : '한국'}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="relative flex items-center">
            <select
              value={sortKey}
              onChange={(e) => setSortKey(e.target.value)}
              className="rounded-xl border border-[var(--line)] bg-white py-1.5 pl-3 pr-8 text-xs font-semibold text-slate-700 outline-none"
            >
              <option value="return1Y">1년 수익률순</option>
              <option value="dividend">배당률 높은순</option>
              <option value="aum">자산규모(AUM)순</option>
              <option value="expense">보수율 낮은순</option>
            </select>
          </div>

          {/* Search Input */}
          <div className="relative min-w-44 flex-1 sm:flex-initial">
            <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="티커, 종목명 검색..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-[var(--line)] bg-white py-1.5 pl-8 pr-3 text-xs outline-none focus:border-[var(--accent)]"
            />
          </div>
        </div>
      </div>

      {/* ETF Grid */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredEtfs.map((etf) => (
          <EtfCard
            key={etf.id}
            etf={etf}
            onSelectDetail={(ticker) => navigate(`/etf/${ticker}`)}
            isCompared={comparedList && comparedList.some((c) => c.id === etf.id)}
            onToggleCompare={onToggleCompare}
          />
        ))}
      </div>

      {filteredEtfs.length === 0 && (
        <div className="my-16 text-center text-slate-500 text-sm">
          조건에 일치하는 ETF가 없습니다. 검색어나 필터를 변경해보세요.
        </div>
      )}

      {/* Floating Compare Drawer if any selected */}
      {comparedList && comparedList.length > 0 && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 bg-[var(--navy)] text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-4 border border-white/20">
          <div className="text-xs">
            <span className="font-bold text-[var(--fire-amber)]">{comparedList.length}</span>개 선택됨:{' '}
            <span className="font-mono text-white/90">
              {comparedList.map((c) => c.ticker).join(', ')}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                const tickers = comparedList.map((c) => c.ticker).join(',');
                navigate(`/compare?tickers=${tickers}`);
              }}
              className="rounded-xl bg-[var(--fire-amber)] text-[var(--navy)] px-3 py-1.5 text-xs font-bold hover:opacity-90 transition"
            >
              비교하기
            </button>
            <button
              onClick={onClearCompare}
              className="p-1 rounded-lg text-white/60 hover:text-white"
              title="비교 초기화"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
