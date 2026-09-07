import React from 'react';
import insightData from '../data/insights.json';
import { ArrowLeft, BookOpen, Clock, Tag } from 'lucide-react';

export default function InsightDetail({ slug, navigate }) {
  const article = insightData.find((a) => a.slug === slug) || insightData[0];

  return (
    <div className="page-shell py-8 sm:py-12 flex-1 max-w-4xl">
      <button
        onClick={() => navigate('/insights')}
        className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-[var(--accent-strong)] hover:underline mb-6"
      >
        <ArrowLeft className="w-4 h-4" /> 인사이트 목록으로 돌아가기
      </button>

      <article className="rounded-3xl border border-[var(--line)] bg-white p-6 sm:p-10 shadow-sm">
        <div className="flex items-center gap-2 text-xs font-semibold text-[var(--muted-foreground)] mb-3">
          <span className="rounded-full bg-[var(--accent-soft)] px-2.5 py-0.5 text-[var(--accent-strong)] font-bold">
            {article.category}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" /> {article.readTime}
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-[var(--foreground)] leading-tight">
          {article.title}
        </h1>

        <p className="mt-4 text-base sm:text-lg text-slate-600 font-medium leading-relaxed pb-6 border-b">
          {article.description}
        </p>

        <div className="mt-8 prose prose-slate max-w-none text-slate-800 leading-relaxed space-y-6 text-sm sm:text-base">
          <h2 className="text-xl font-bold text-slate-900 mt-6">핵심 요약 및 실행 원칙</h2>
          <p>
            경제적 자유(FIRE)를 달성하기 위해서는 단순한 절약이나 일확천금을 노리는 투자가 아닌,
            체계적인 지출 관리와 기대수익률, 그리고 안전 인출률을 기반으로 한 포트폴리오 구축이 필수적입니다.
          </p>

          <div className="p-5 rounded-2xl bg-[var(--surface-muted)] border-l-4 border-[var(--accent)] my-6">
            <p className="font-semibold text-slate-900">
              💡 실전 체크리스트:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-slate-700 text-sm">
              <li>현재 1년 총 생활비의 정확한 집계 및 고정비/변동비 구분</li>
              <li>4% 룰(연간 생활비 × 25)을 기준으로 한 기초 목표 자산 산출</li>
              <li>은퇴 기간이 30년 이상인 조기 은퇴자는 3.0~3.5% 보수적 인출률 권장</li>
              <li>미국 대표 배당성장(SCHD), 지수성장(QQQM), 안전자산 채권(TLT) 배분 검토</li>
            </ul>
          </div>

          <h2 className="text-xl font-bold text-slate-900 mt-6">다음 단계 추천 도구</h2>
          <p>
            본 아티클의 원칙을 바탕으로 나의 구체적인 목표 연령과 자산을 계산해보세요.
          </p>
          <div className="flex gap-3 pt-2">
            <button
              onClick={() => navigate('/fire-calculator')}
              className="rounded-xl bg-[var(--accent)] text-white px-5 py-2.5 text-xs sm:text-sm font-bold hover:bg-[var(--accent-strong)] transition"
            >
              FIRE 계산기로 내 목표 설정하기 →
            </button>
            <button
              onClick={() => navigate('/portfolio')}
              className="rounded-xl border border-[var(--line)] bg-white px-5 py-2.5 text-xs sm:text-sm font-bold text-slate-700 hover:bg-slate-50 transition"
            >
              포트폴리오 조합하기
            </button>
          </div>
        </div>
      </article>
    </div>
  );
}
