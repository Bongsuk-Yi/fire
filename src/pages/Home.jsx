import React from 'react';
import HeroCalculator from '../components/HeroCalculator';
import EtfCard from '../components/EtfCard';
import etfData from '../data/etfs.json';
import insightData from '../data/insights.json';
import { ArrowRight, TrendingUp, DollarSign, ShieldAlert, PieChart, Compass } from 'lucide-react';

export default function Home({ navigate, onToggleCompare, comparedList }) {
  // Select SCHD, VIG, QQQM for featured cards
  const featuredTickers = ['SCHD', 'VIG', 'QQQM'];
  const featuredEtfs = etfData.filter(e => featuredTickers.includes(e.ticker.toUpperCase()));

  const categories = [
    {
      id: 'DIVIDEND',
      num: '01',
      tag: '배당',
      title: '현금흐름과 배당 성장',
      desc: '최근 배당률뿐 아니라 배당 성장과 총수익률을 함께 비교합니다.',
      icon: DollarSign,
      color: 'text-amber-600'
    },
    {
      id: 'GROWTH',
      num: '02',
      tag: '성장',
      title: '장기 자산 성장',
      desc: '장기 수익률과 함께 거래 규모와 비용을 같은 화면에서 확인합니다.',
      icon: TrendingUp,
      color: 'text-emerald-600'
    },
    {
      id: 'COVERED_CALL',
      num: '03',
      tag: '커버드콜',
      title: '커버드콜 점검',
      desc: '배당금 재원, NAV, 기초지수 대비 성과와 상승 제한을 확인합니다.',
      icon: ShieldAlert,
      color: 'text-blue-600'
    },
    {
      id: 'BOND',
      num: '04',
      tag: '채권',
      title: '포트폴리오 완충 자산',
      desc: '주식형 ETF와 다른 수익·위험 특성을 포트폴리오에서 직접 조합합니다.',
      icon: PieChart,
      color: 'text-purple-600'
    }
  ];

  return (
    <div className="flex-1">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[var(--navy)] text-white">
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_12%_20%,rgba(158,216,204,0.16),transparent_26rem),radial-gradient(circle_at_88%_82%,rgba(242,166,43,0.13),transparent_24rem)]"
          aria-hidden="true"
        />
        <div className="page-shell relative grid gap-6 py-8 sm:gap-7 sm:py-14 lg:grid-cols-[1fr_0.92fr] lg:items-center lg:gap-16 lg:py-20">
          {/* Hero Left: Headlines */}
          <div className="order-2 lg:order-1">
            <h1 className="text-[1.75rem] font-semibold leading-[1.18] tracking-[-0.045em] sm:text-5xl lg:text-6xl">
              막연한 FIRE 목표를<br />
              <span className="text-[var(--fire-amber-soft)]">실행 가능한 계획으로 바꿔보세요</span>
            </h1>
            <p className="mt-4 max-w-xl text-[13px] leading-6 text-white/70 sm:mt-5 sm:text-lg sm:leading-8">
              은퇴 후 필요한 생활비와 사용자가 설정한 가정으로 목표 자산을 계산하고,
              ETF 데이터와 예시 조합을 비교해 장기 계획을 점검해 보세요.
            </p>
            <div className="mt-6 flex flex-col gap-2.5 sm:mt-8 sm:flex-row sm:gap-3">
              <button
                type="button"
                onClick={() => navigate('/fire-calculator')}
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-[var(--fire-amber)] px-6 text-sm font-bold text-[var(--navy)] hover:opacity-90 transition shadow-lg"
              >
                FIRE 계획 만들기
              </button>
              <button
                type="button"
                onClick={() => navigate('/etf')}
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/20 px-6 text-sm font-semibold text-white hover:bg-white/10 transition"
              >
                ETF 조합 살펴보기
              </button>
            </div>
          </div>

          {/* Hero Right: 1-min Calculator Card */}
          <div className="order-1 min-w-0 lg:order-2">
            <HeroCalculator
              onNavigateWithParams={(path, params) => {
                sessionStorage.setItem('fire_hero_params', JSON.stringify(params));
                navigate(path);
              }}
            />
          </div>
        </div>
      </section>

      {/* Step Roadmap */}
      <section className="border-b border-[var(--line)] bg-white" aria-labelledby="journey-start-title">
        <div className="page-shell py-7 sm:py-9">
          <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--accent-strong)]">
                한 번 계산하고 끝내지 않기
              </p>
              <h2 id="journey-start-title" className="mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl">
                목표를 만들고, 조합하고, 매달 점검하세요
              </h2>
              <p className="mt-3 text-sm leading-6 text-[var(--muted-foreground)]">
                상세 계산에서 목표를 브라우저에 저장하면 다음 방문부터 현재 진행률을 바로 확인할 수 있어요.
              </p>
            </div>
            <ol className="grid grid-cols-3 gap-2" aria-label="FIRE 여정 단계">
              <li className="rounded-2xl bg-[var(--surface-muted)] px-3 py-4 text-center cursor-pointer hover:bg-slate-200 transition" onClick={() => navigate('/fire-calculator')}>
                <span className="numeric text-xs font-bold text-[var(--accent-strong)]">1</span>
                <strong className="mt-1 block text-xs sm:text-sm">목표 계산</strong>
              </li>
              <li className="rounded-2xl bg-[var(--surface-muted)] px-3 py-4 text-center cursor-pointer hover:bg-slate-200 transition" onClick={() => navigate('/portfolio')}>
                <span className="numeric text-xs font-bold text-[var(--accent-strong)]">2</span>
                <strong className="mt-1 block text-xs sm:text-sm">ETF 조합</strong>
              </li>
              <li className="rounded-2xl bg-[var(--surface-muted)] px-3 py-4 text-center cursor-pointer hover:bg-slate-200 transition" onClick={() => navigate('/macro-comparison')}>
                <span className="numeric text-xs font-bold text-[var(--accent-strong)]">3</span>
                <strong className="mt-1 block text-xs sm:text-sm">시장 점검</strong>
              </li>
            </ol>
          </div>
        </div>
      </section>

      {/* Connected 4 Steps */}
      <section className="border-b border-[var(--line)] bg-[var(--surface-muted)]" aria-labelledby="fire-roadmap-title">
        <div className="page-shell py-8 sm:py-12">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--accent-strong)]">
              One connected journey
            </p>
            <h2 id="fire-roadmap-title" className="mt-2 text-xl font-extrabold tracking-tight sm:text-4xl">
              계산 결과가 다음 행동으로 바로 이어집니다
            </h2>
          </div>
          <ol className="mt-5 grid gap-2.5 sm:mt-7 sm:gap-3 lg:grid-cols-4">
            <li className="rounded-2xl border border-[var(--line)] bg-white p-4 sm:rounded-3xl sm:p-6 shadow-sm">
              <span className="numeric text-xs font-bold text-[var(--accent-strong)]">01</span>
              <h3 className="mt-3 text-base font-extrabold sm:mt-5 sm:text-lg">목표 시각화</h3>
              <p className="mt-1.5 text-[13px] leading-5 text-[var(--muted-foreground)] sm:mt-2 sm:text-sm sm:leading-6">
                목표 나이·자산·생활비와 예상 은퇴 시점을 한눈에 봅니다.
              </p>
            </li>
            <li className="rounded-2xl border border-[var(--line)] bg-white p-4 sm:rounded-3xl sm:p-6 shadow-sm">
              <span className="numeric text-xs font-bold text-[var(--accent-strong)]">02</span>
              <h3 className="mt-3 text-base font-extrabold sm:mt-5 sm:text-lg">달성 플랜</h3>
              <p className="mt-1.5 text-[13px] leading-5 text-[var(--muted-foreground)] sm:mt-2 sm:text-sm sm:leading-6">
                목표에 맞추려면 월 투자금을 얼마나 조정할지 확인합니다.
              </p>
            </li>
            <li className="rounded-2xl border border-[var(--line)] bg-white p-4 sm:rounded-3xl sm:p-6 shadow-sm">
              <span className="numeric text-xs font-bold text-[var(--accent-strong)]">03</span>
              <h3 className="mt-3 text-base font-extrabold sm:mt-5 sm:text-lg">ETF로 구체화</h3>
              <p className="mt-1.5 text-[13px] leading-5 text-[var(--muted-foreground)] sm:mt-2 sm:text-sm sm:leading-6">
                배당성장·성장·현금흐름 전략을 비교하고 직접 비중을 만듭니다.
              </p>
            </li>
            <li className="rounded-2xl border border-[var(--line)] bg-white p-4 sm:rounded-3xl sm:p-6 shadow-sm">
              <span className="numeric text-xs font-bold text-[var(--accent-strong)]">04</span>
              <h3 className="mt-3 text-base font-extrabold sm:mt-5 sm:text-lg">매달 점검</h3>
              <p className="mt-1.5 text-[13px] leading-5 text-[var(--muted-foreground)] sm:mt-2 sm:text-sm sm:leading-6">
                저장한 목표에 현재 금융자산을 업데이트해 계획과 실제를 비교합니다.
              </p>
            </li>
          </ol>
        </div>
      </section>

      {/* Explore by Role (4 Categories) */}
      <section className="page-section page-shell">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-5">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent-strong)]">
              Explore by role
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-4xl">
              수익률 하나가 아니라 역할부터 비교하세요
            </h2>
            <p className="mt-2 text-[13px] leading-5 sm:mt-3 sm:text-base sm:leading-6 text-[var(--muted-foreground)]">
              배당, 성장, 커버드콜, 채권형 ETF는 포트폴리오에서 맡는 역할과 확인할 위험이 다릅니다.
            </p>
          </div>
          <button
            onClick={() => navigate('/etf')}
            className="inline-flex min-h-11 shrink-0 items-center text-sm font-semibold text-[var(--accent-strong)] hover:underline"
          >
            전체 ETF 보기 →
          </button>
        </div>

        <div className="mt-6 grid gap-3 sm:mt-8 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => navigate(`/etf?category=${cat.id}`)}
              className="group cursor-pointer rounded-3xl border border-[var(--line)] bg-white shadow-[0_12px_32px_rgba(11,37,51,0.07)] flex h-full min-h-0 flex-col p-4 transition-all group-hover:-translate-y-1 hover:border-[var(--accent)] sm:p-6 lg:min-h-64"
            >
              <span className="numeric text-xs font-semibold text-[var(--accent-strong)]">{cat.num}</span>
              <p className="mt-4 text-[11px] font-semibold text-[var(--muted-foreground)] sm:mt-8 sm:text-xs">{cat.tag}</p>
              <h3 className="mt-1.5 text-lg font-semibold tracking-tight sm:mt-2 sm:text-xl text-[var(--foreground)]">{cat.title}</h3>
              <p className="mt-2 text-[13px] leading-5 text-[var(--muted-foreground)] sm:mt-3 sm:text-sm sm:leading-6">{cat.desc}</p>
              <span className="mt-auto pt-4 text-[13px] font-semibold text-[var(--accent-strong)] sm:pt-5 sm:text-sm">
                필터로 보기 →
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Featured ETFs */}
      <section className="page-section bg-[var(--surface-muted)]">
        <div className="page-shell">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-5">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent-strong)]">
                Sample data preview
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-4xl">
                대표 ETF 핵심 지표
              </h2>
              <p className="mt-2 text-[13px] leading-5 sm:mt-3 sm:text-base sm:leading-6 text-[var(--muted-foreground)]">
                해외 배당성장·배당귀족·자산성장 전략을 대표하는 ETF부터 핵심 지표를 확인합니다.
              </p>
            </div>
            <button
              onClick={() => navigate('/etf')}
              className="inline-flex min-h-11 shrink-0 items-center text-sm font-semibold text-[var(--accent-strong)] hover:underline"
            >
              필터와 정렬 사용하기 →
            </button>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <span className="inline-flex min-h-7 flex-wrap items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold border-[var(--line)] bg-[var(--surface-muted)] text-[var(--muted-foreground)]">
              <span>최신 배치 데이터</span>
              <time dateTime="2026-09-07">2026. 09. 07.</time>
            </span>
          </div>

          <div className="mt-6 grid gap-3 sm:mt-8 sm:gap-4 lg:grid-cols-3">
            {featuredEtfs.map((etf) => (
              <EtfCard
                key={etf.id}
                etf={etf}
                onSelectDetail={(ticker) => navigate(`/etf/${ticker}`)}
                isCompared={comparedList && comparedList.some(c => c.id === etf.id)}
                onToggleCompare={onToggleCompare}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Popular Comparisons */}
      <section className="page-section page-shell">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-5">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent-strong)]">
              Popular comparisons
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-4xl">
              자주 궁금해하는 조합부터 확인하세요
            </h2>
            <p className="mt-2 text-[13px] leading-5 sm:mt-3 sm:text-base sm:leading-6 text-[var(--muted-foreground)]">
              같은 ETF를 최고라고 단정하지 않고, 목표와 지표에 따라 차이를 읽습니다.
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:mt-8 sm:gap-4 lg:grid-cols-3">
          <div
            onClick={() => navigate('/compare?tickers=SCHD,QQQM')}
            className="group cursor-pointer rounded-3xl border border-[var(--line)] bg-white shadow-[0_12px_32px_rgba(11,37,51,0.07)] h-full p-4 transition-all hover:border-[var(--accent)] sm:p-6"
          >
            <p className="text-xs font-semibold text-[var(--accent-strong)]">배당 성장 vs 자산 성장</p>
            <h3 className="mt-1.5 text-lg font-semibold tracking-tight sm:mt-2 sm:text-xl">SCHD와 QQQM</h3>
            <p className="mt-2 text-[13px] leading-5 text-[var(--muted-foreground)] sm:mt-3 sm:text-sm sm:leading-6">
              현금흐름과 장기 성장 비중을 고민할 때 확인할 대표 지표를 비교합니다.
            </p>
            <span className="mt-4 inline-flex text-[13px] font-semibold text-[var(--accent-strong)] sm:mt-6 sm:text-sm">
              비교 열기 →
            </span>
          </div>

          <div
            onClick={() => navigate('/compare?tickers=SCHD,JEPI')}
            className="group cursor-pointer rounded-3xl border border-[var(--line)] bg-white shadow-[0_12px_32px_rgba(11,37,51,0.07)] h-full p-4 transition-all hover:border-[var(--accent)] sm:p-6"
          >
            <p className="text-xs font-semibold text-[var(--accent-strong)]">배당 성장 vs 커버드콜</p>
            <h3 className="mt-1.5 text-lg font-semibold tracking-tight sm:mt-2 sm:text-xl">SCHD와 JEPI</h3>
            <p className="mt-2 text-[13px] leading-5 text-[var(--muted-foreground)] sm:mt-3 sm:text-sm sm:leading-6">
              높은 배당률이 NAV와 총수익률에 어떤 차이를 만드는지 살펴봅니다.
            </p>
            <span className="mt-4 inline-flex text-[13px] font-semibold text-[var(--accent-strong)] sm:mt-6 sm:text-sm">
              비교 열기 →
            </span>
          </div>

          <div
            onClick={() => navigate('/compare?tickers=453850,QQQM')}
            className="group cursor-pointer rounded-3xl border border-[var(--line)] bg-white shadow-[0_12px_32px_rgba(11,37,51,0.07)] h-full p-4 transition-all hover:border-[var(--accent)] sm:p-6"
          >
            <p className="text-xs font-semibold text-[var(--accent-strong)]">미국주식 vs 미국장기채</p>
            <h3 className="mt-1.5 text-lg font-semibold tracking-tight sm:mt-2 sm:text-xl">QQQM과 미국30년국채</h3>
            <p className="mt-2 text-[13px] leading-5 text-[var(--muted-foreground)] sm:mt-3 sm:text-sm sm:leading-6">
              성장형 기술주 ETF와 안전자산 국채의 변동성과 수익률 완충 효과를 비교합니다.
            </p>
            <span className="mt-4 inline-flex text-[13px] font-semibold text-[var(--accent-strong)] sm:mt-6 sm:text-sm">
              비교 열기 →
            </span>
          </div>
        </div>
      </section>

      {/* Ecosystem Section */}
      <section className="page-section bg-[var(--navy)] text-white">
        <div className="page-shell">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-5">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-200">
                Beyond the portfolio
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-4xl">
                ETF 밖의 큰 변수도 자연스럽게 연결하세요
              </h2>
              <p className="mt-2 text-[13px] leading-5 sm:mt-3 sm:text-base sm:leading-6 text-white/60">
                FIRE 계획에는 금융자산뿐 아니라 주거·부동산과 소득을 늘리는 자동화도 함께 영향을 줍니다.
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:mt-8 lg:grid-cols-3">
            <div
              onClick={() => navigate('/portfolio')}
              className="cursor-pointer rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:bg-white/10 sm:rounded-3xl sm:p-6"
            >
              <span className="text-xs font-bold text-emerald-200">금융자산</span>
              <h3 className="mt-2 text-lg font-bold sm:mt-3 sm:text-xl">ETF 포트폴리오 연구소</h3>
              <p className="mt-2 text-sm leading-6 text-white/60">
                배당성장·성장·채권 ETF 비중으로 목표 시점의 자산과 현금흐름을 예상합니다.
              </p>
              <span className="mt-5 inline-flex text-sm font-bold text-[var(--fire-amber-soft)]">
                조합 만들기 →
              </span>
            </div>

            <div
              onClick={() => navigate('/opportunity-cost')}
              className="cursor-pointer rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:bg-white/10 sm:rounded-3xl sm:p-6"
            >
              <span className="text-xs font-bold text-emerald-200">소비와 절약</span>
              <h3 className="mt-2 text-lg font-bold sm:mt-3 sm:text-xl">기회비용 계산기</h3>
              <p className="mt-2 text-sm leading-6 text-white/60">
                무심코 나가는 커피값, 택시비, 차량 유지비가 미래에 어떤 자산이 되는지 점검합니다.
              </p>
              <span className="mt-5 inline-flex text-sm font-bold text-[var(--fire-amber-soft)]">
                기회비용 계산 →
              </span>
            </div>

            <div
              onClick={() => navigate('/macro-comparison')}
              className="cursor-pointer rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:bg-white/10 sm:rounded-3xl sm:p-6"
            >
              <span className="text-xs font-bold text-emerald-200">거시경제</span>
              <h3 className="mt-2 text-lg font-bold sm:mt-3 sm:text-xl">거시지표 분석</h3>
              <p className="mt-2 text-sm leading-6 text-white/60">
                기준금리, 환율, 원자재, 부동산 지표와 주가지수의 30년 상관관계를 읽습니다.
              </p>
              <span className="mt-5 inline-flex text-sm font-bold text-[var(--fire-amber-soft)]">
                지표 분석하기 →
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Insights Preview */}
      <section className="page-section page-shell">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-5">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent-strong)]">
              Latest insights
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-4xl">
              숫자를 이해하기 위한 짧은 가이드
            </h2>
            <p className="mt-2 text-[13px] leading-5 sm:mt-3 sm:text-base sm:leading-6 text-[var(--muted-foreground)]">
              원문을 복제하지 않고 FIRE와 ETF 지표를 읽는 기준을 자체 콘텐츠로 설명합니다.
            </p>
          </div>
          <button
            onClick={() => navigate('/insights')}
            className="inline-flex min-h-11 shrink-0 items-center text-sm font-semibold text-[var(--accent-strong)] hover:underline"
          >
            전체 인사이트 보기 →
          </button>
        </div>

        <div className="mt-6 grid gap-3 sm:mt-8 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
          {insightData.slice(0, 3).map((article) => (
            <div
              key={article.slug}
              onClick={() => navigate(`/insights/${article.slug}`)}
              className="group cursor-pointer rounded-3xl border border-[var(--line)] bg-white p-5 sm:p-6 shadow-sm hover:border-[var(--accent)] transition"
            >
              <span className="rounded-full bg-[var(--accent-soft)] px-2.5 py-1 text-xs font-semibold text-[var(--accent-strong)]">
                {article.category}
              </span>
              <h3 className="mt-3 text-lg font-bold text-[var(--foreground)] group-hover:text-[var(--accent-strong)] transition leading-snug">
                {article.title}
              </h3>
              <p className="mt-2 text-xs sm:text-sm leading-5 text-[var(--muted-foreground)] line-clamp-2">
                {article.description}
              </p>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-[var(--muted-foreground)]">
                <span>{article.readTime}</span>
                <span className="font-semibold text-[var(--accent-strong)]">읽기 →</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
