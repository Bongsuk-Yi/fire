import React, { useState } from 'react';
import insightData from '../data/insights.json';
import { BookOpen, Search, ArrowRight } from 'lucide-react';

export default function Insights({ navigate }) {
  const [search, setSearch] = useState('');

  const filtered = insightData.filter((art) => {
    if (!search.trim()) return true;
    const q = search.trim().toLowerCase();
    return art.title.toLowerCase().includes(q) || art.description.toLowerCase().includes(q);
  });

  return (
    <div className="page-shell py-8 sm:py-12 flex-1">
      <div className="flex flex-col gap-2 pb-6 border-b border-[var(--line)]">
        <span className="text-xs font-bold uppercase tracking-wider text-[var(--accent-strong)]">
          Knowledge Base
        </span>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-[var(--foreground)]">
          FIRE 인사이트
        </h1>
        <p className="text-xs sm:text-sm text-[var(--muted-foreground)]">
          조기 은퇴의 기본기부터 4% 룰, 세금, 안전인출, ETF 설계까지 검증된 원칙을 전달합니다.
        </p>
      </div>

      {/* Search Bar */}
      <div className="mt-6 max-w-md">
        <div className="relative">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="인사이트 아티클 검색..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-2xl border border-[var(--line)] bg-white py-2.5 pl-10 pr-4 text-xs sm:text-sm outline-none focus:border-[var(--accent)]"
          />
        </div>
      </div>

      {/* Article Grid */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((art) => (
          <div
            key={art.slug}
            onClick={() => navigate(`/insights/${art.slug}`)}
            className="group cursor-pointer rounded-3xl border border-[var(--line)] bg-white p-5 sm:p-6 shadow-sm hover:border-[var(--accent)] hover:-translate-y-0.5 transition flex flex-col justify-between"
          >
            <div>
              <span className="rounded-full bg-[var(--accent-soft)] px-2.5 py-1 text-xs font-semibold text-[var(--accent-strong)]">
                {art.category}
              </span>
              <h2 className="mt-3 text-base sm:text-lg font-bold text-[var(--foreground)] group-hover:text-[var(--accent-strong)] transition leading-snug">
                {art.title}
              </h2>
              <p className="mt-2 text-xs sm:text-sm leading-5 text-[var(--muted-foreground)] line-clamp-3">
                {art.description}
              </p>
            </div>

            <div className="mt-6 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-[var(--muted-foreground)]">
              <span>{art.readTime}</span>
              <span className="font-bold text-[var(--accent-strong)] flex items-center gap-1">
                전문 보기 <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
