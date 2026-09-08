import React from 'react';
import { Flame, Calculator, ArrowRight, Lock } from 'lucide-react';

export default function Navbar({ currentPath, navigate, onLock }) {
  const navLinks = [
    { label: '홈', path: '/' },
    { label: 'FIRE 계산기', path: '/fire-calculator' },
    { label: '기회비용', path: '/opportunity-cost' },
    { label: 'ETF 분석', path: '/etf' },
    { label: 'ETF 비교', path: '/compare' },
    { label: '포트폴리오 연구소', path: '/portfolio' },
    { label: '거시지표', path: '/macro-comparison' },
    { label: '인사이트', path: '/insights' },
  ];

  const isActive = (path) => {
    if (path === '/' && (currentPath === '/' || currentPath === '')) return true;
    return currentPath === path || currentPath.startsWith(path + '/');
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-white/95 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex min-h-14 items-center justify-between gap-3 sm:min-h-16 sm:gap-4">
          {/* Logo & Site Name */}
          <a
            href="#/"
            onClick={(e) => { e.preventDefault(); navigate('/'); }}
            className="flex min-h-11 min-w-0 items-center gap-2.5 rounded-lg sm:gap-3 cursor-pointer"
            aria-label="이지자동화 FIRE 홈"
          >
            <span className="h-9 w-9 shrink-0 sm:h-10 sm:w-10 flex items-center justify-center bg-[var(--accent-soft)] rounded-xl overflow-hidden shadow-sm">
              <img
                src="./logo_fire.png"
                alt="EasyAutomation Logo"
                className="h-full w-full object-contain"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <span style={{ display: 'none' }} className="items-center justify-center w-full h-full text-[var(--accent-strong)]">
                <Flame className="w-6 h-6" />
              </span>
            </span>
            <span className="min-w-0">
              <span className="block truncate text-sm font-extrabold tracking-tight text-[var(--foreground)] sm:text-base">
                이지자동화 FIRE
              </span>
              <span className="hidden text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--muted-foreground)] sm:block">
                FIRE Portfolio Lab
              </span>
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-1 lg:flex" aria-label="주요 메뉴">
            {navLinks.map((link) => (
              <a
                key={link.path}
                href={'#' + link.path}
                onClick={(e) => { e.preventDefault(); navigate(link.path); }}
                className={`inline-flex min-h-11 items-center rounded-full px-3 text-sm font-semibold transition-colors cursor-pointer ${
                  isActive(link.path)
                    ? 'bg-[var(--surface-muted)] text-[var(--foreground)] font-bold'
                    : 'text-[var(--muted-foreground)] hover:bg-[var(--surface-muted)] hover:text-[var(--foreground)]'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action */}
          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={() => navigate('/fire-calculator')}
              className="inline-flex min-h-10 items-center gap-1.5 rounded-full bg-[var(--accent)] px-3 sm:px-4 text-xs sm:text-sm font-bold text-white transition-colors hover:bg-[var(--accent-strong)] shadow-sm"
            >
              <Calculator className="w-4 h-4" />
              <span>목표 계산</span>
            </button>
            {onLock && (
              <button
                type="button"
                onClick={onLock}
                title="비밀번호 잠금"
                className="inline-flex min-h-10 items-center gap-1 rounded-full border border-slate-200 bg-white px-2.5 sm:px-3 text-xs font-bold text-slate-600 transition hover:bg-slate-50 hover:text-slate-900 shadow-xs"
              >
                <Lock className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">잠금</span>
              </button>
            )}
          </div>
        </div>

        {/* Mobile Horizontal Scrolling Nav */}
        <div className="grid transition-[grid-template-rows,opacity] duration-200 lg:hidden grid-rows-[1fr] opacity-100">
          <div className="min-h-0 overflow-hidden">
            <nav className="flex gap-1 overflow-x-auto whitespace-nowrap pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" aria-label="모바일 주요 메뉴">
              {navLinks.map((link) => (
                <a
                  key={link.path}
                  href={'#' + link.path}
                  onClick={(e) => { e.preventDefault(); navigate(link.path); }}
                  className={`inline-flex min-h-9 shrink-0 items-center rounded-full px-3 text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
                    isActive(link.path)
                      ? 'bg-[var(--navy)] text-white font-bold'
                      : 'bg-[var(--surface-muted)] text-[var(--muted-foreground)] hover:text-[var(--foreground)]'
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
