import React from 'react';
import { ArrowRight, Plus, Check } from 'lucide-react';

export default function EtfCard({ etf, onSelectDetail, isCompared, onToggleCompare }) {
  const getCategoryLabel = (cat) => {
    switch(cat) {
      case 'DIVIDEND': return '배당';
      case 'GROWTH': return '성장';
      case 'COVERED_CALL': return '커버드콜';
      case 'BOND': return '채권';
      case 'REIT': return '리츠';
      default: return cat;
    }
  };

  const getFreqLabel = (freq) => {
    if (freq === 'MONTHLY') return '월배당';
    if (freq === 'QUARTERLY') return '분기배당';
    if (freq === 'ANNUAL') return '연배당';
    return '배당';
  };

  const formatReturn = (val) => {
    if (val === null || val === undefined) return '-';
    const num = Number(val);
    const sign = num > 0 ? '+' : '';
    const color = num > 0 ? 'text-emerald-600' : num < 0 ? 'text-red-500' : 'text-slate-700';
    return <span className={color}>{sign}{num.toFixed(1)}%</span>;
  };

  const formatAum = (aum, curr) => {
    if (!aum) return '-';
    if (curr === 'KRW') {
      const jo = Math.floor(aum / 1000000000000);
      const eok = Math.floor((aum % 1000000000000) / 100000000);
      return jo > 0 ? `${jo}조 ${eok}억` : `${eok}억원`;
    }
    if (aum >= 1000000000) return `$${(aum / 1000000000).toFixed(1)}B`;
    return `$${(aum / 1000000).toFixed(0)}M`;
  };

  const metrics = etf.metrics || {};

  return (
    <div className="rounded-3xl border border-[var(--line)] bg-white shadow-[0_12px_32px_rgba(11,37,51,0.07)] p-4 sm:p-6 flex flex-col justify-between transition-all hover:shadow-[0_16px_36px_rgba(11,37,51,0.12)] hover:-translate-y-0.5">
      <div>
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="numeric text-base sm:text-lg font-bold text-[var(--accent-strong)]">
              {etf.ticker}
            </span>
            <span className="rounded-md bg-slate-100 px-1.5 py-0.5 text-[10px] font-semibold text-slate-600">
              {etf.country}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="rounded-full bg-[var(--accent-soft)] px-3 py-1 text-xs font-semibold text-[var(--accent-strong)]">
              {getCategoryLabel(etf.category)}
            </span>
            {onToggleCompare && (
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); onToggleCompare(etf); }}
                title={isCompared ? '비교함에서 제거' : '비교함에 추가'}
                className={`p-1.5 rounded-full text-xs font-semibold transition ${
                  isCompared
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {isCompared ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
              </button>
            )}
          </div>
        </div>

        <h3 className="mt-2 line-clamp-2 text-base font-bold text-[var(--foreground)] sm:mt-3 sm:min-h-14 sm:text-lg leading-snug">
          {etf.name}
        </h3>

        <dl className="mt-4 grid grid-cols-2 gap-2.5 sm:mt-5 sm:gap-3">
          <div className="rounded-2xl bg-[var(--surface-muted)] p-3">
            <dt className="text-[11px] text-[var(--muted-foreground)]">1년 총수익률</dt>
            <dd className="numeric mt-1 text-sm font-bold">
              {formatReturn(metrics.return1Y)}
            </dd>
          </div>
          <div className="rounded-2xl bg-[var(--surface-muted)] p-3">
            <dt className="text-[11px] text-[var(--muted-foreground)]">연 배당률</dt>
            <dd className="numeric mt-1 text-sm font-bold text-amber-700">
              {metrics.annualDividendYield ? `${metrics.annualDividendYield.toFixed(1)}%` : '-'}
            </dd>
            <p className="mt-0.5 text-[9px] text-[var(--muted-foreground)]">
              {getFreqLabel(etf.distributionFrequency)}
            </p>
          </div>
          <div className="rounded-2xl bg-[var(--surface-muted)] p-3">
            <dt className="text-[11px] text-[var(--muted-foreground)]">운용 규모(AUM)</dt>
            <dd className="numeric mt-1 text-xs sm:text-sm font-semibold truncate">
              {formatAum(etf.assetsUnderManagement, etf.currency)}
            </dd>
          </div>
          <div className="rounded-2xl bg-[var(--surface-muted)] p-3">
            <dt className="text-[11px] text-[var(--muted-foreground)]">총보수비용</dt>
            <dd className="numeric mt-1 text-sm font-semibold">
              {etf.expenseRatio !== undefined && etf.expenseRatio !== null ? `${etf.expenseRatio.toFixed(2)}%` : '-'}
            </dd>
          </div>
        </dl>
      </div>

      <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
        <button
          type="button"
          onClick={() => onSelectDetail && onSelectDetail(etf.ticker.toLowerCase())}
          className="inline-flex min-h-9 items-center gap-1 text-sm font-bold text-[var(--accent-strong)] hover:text-[var(--accent)]"
        >
          상세 데이터 보기 <ArrowRight className="w-4 h-4" />
        </button>
        <span className="text-[11px] text-[var(--muted-foreground)]">
          {metrics.price ? `${etf.currency === 'USD' ? '$' : ''}${metrics.price.toLocaleString()}${etf.currency === 'KRW' ? '원' : ''}` : ''}
        </span>
      </div>
    </div>
  );
}
