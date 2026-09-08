import React from 'react';
import { Flame } from 'lucide-react';

export default function Footer({ navigate }) {
  return (
    <footer className="mt-auto border-t border-[var(--line)] bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          {/* 1. Brand & Slogan */}
          <div className="flex items-center gap-3">
            <span className="h-10 w-10 shrink-0 flex items-center justify-center bg-[var(--accent-soft)] rounded-xl overflow-hidden shadow-xs">
              <Flame className="w-6 h-6 text-[var(--accent-strong)]" />
            </span>
            <span>
              <span className="block text-base font-extrabold tracking-tight text-[var(--foreground)]">은퇴설계</span>
              <span className="block text-xs font-bold text-[var(--accent-strong)]">퐈이어!!</span>
            </span>
          </div>

          {/* 2. Service Navigation Buttons */}
          <div>
            <h2 className="text-xs font-bold text-[var(--foreground)] uppercase tracking-wider mb-2">서비스 바로가기</h2>
            <div className="flex flex-wrap gap-2 text-xs sm:text-sm">
              <button
                type="button"
                onClick={() => navigate('/fire-calculator')}
                className="rounded-lg bg-[var(--surface-muted)] px-3 py-1.5 font-medium text-[var(--foreground)] transition-colors hover:bg-slate-200"
              >
                FIRE 계산기
              </button>
              <button
                type="button"
                onClick={() => navigate('/etf')}
                className="rounded-lg bg-[var(--surface-muted)] px-3 py-1.5 font-medium text-[var(--foreground)] transition-colors hover:bg-slate-200"
              >
                ETF 분석
              </button>
              <button
                type="button"
                onClick={() => navigate('/portfolio')}
                className="rounded-lg bg-[var(--surface-muted)] px-3 py-1.5 font-medium text-[var(--foreground)] transition-colors hover:bg-slate-200"
              >
                포트폴리오 연구소
              </button>
              <button
                type="button"
                onClick={() => navigate('/macro-comparison')}
                className="rounded-lg bg-[var(--surface-muted)] px-3 py-1.5 font-medium text-[var(--foreground)] transition-colors hover:bg-slate-200"
              >
                거시지표 분석
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
