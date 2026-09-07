import React from 'react';
import { Flame, Info, ExternalLink } from 'lucide-react';

export default function Footer({ navigate }) {
  return (
    <footer className="mt-auto border-t border-[var(--line)] bg-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-[1.35fr_0.8fr_0.8fr_0.8fr]">
          {/* Brand & Slogan */}
          <div>
            <div className="inline-flex min-h-11 items-center gap-3 rounded-lg">
              <span className="h-10 w-10 shrink-0 flex items-center justify-center bg-[var(--accent-soft)] rounded-xl overflow-hidden">
                <img
                  src="./logo_fire.png"
                  alt="EasyAutomation 로고"
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
              <span>
                <span className="block text-base font-extrabold tracking-tight">이지자동화 FIRE</span>
                <span className="block text-xs text-[var(--muted-foreground)]">FIRE Portfolio Lab</span>
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-6 text-[var(--muted-foreground)]">
              FIRE 목표와 방향을 점검하고, 경제적 자유를 향한 첫걸음을 시작해보세요.
            </p>
          </div>

          {/* Services */}
          <div>
            <h2 className="text-sm font-bold text-[var(--foreground)]">서비스</h2>
            <ul className="mt-3 space-y-1 text-sm">
              <li>
                <button
                  onClick={() => navigate('/fire-calculator')}
                  className="inline-flex min-h-9 items-center font-medium text-[var(--muted-foreground)] transition-colors hover:text-[var(--accent-strong)]"
                >
                  FIRE 계산기
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/etf')}
                  className="inline-flex min-h-9 items-center font-medium text-[var(--muted-foreground)] transition-colors hover:text-[var(--accent-strong)]"
                >
                  ETF 분석
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/portfolio')}
                  className="inline-flex min-h-9 items-center font-medium text-[var(--muted-foreground)] transition-colors hover:text-[var(--accent-strong)]"
                >
                  포트폴리오 연구소
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/macro-comparison')}
                  className="inline-flex min-h-9 items-center font-medium text-[var(--muted-foreground)] transition-colors hover:text-[var(--accent-strong)]"
                >
                  거시지표 분석
                </button>
              </li>
            </ul>
          </div>

          {/* Links */}
          <div>
            <h2 className="text-sm font-bold text-[var(--foreground)]">채널 및 커뮤니티</h2>
            <ul className="mt-3 space-y-1 text-sm">
              <li>
                <a
                  href="https://github.com/bonsuk-yi/fire"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-9 items-center gap-1 font-medium text-[var(--muted-foreground)] transition-colors hover:text-[var(--accent-strong)]"
                >
                  GitHub 리포지토리 <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </li>
              <li>
                <a
                  href="https://easyautomation.co.kr"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-9 items-center gap-1 font-medium text-[var(--muted-foreground)] transition-colors hover:text-[var(--accent-strong)]"
                >
                  이지자동화 공식 사이트 <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </li>
              <li>
                <button
                  onClick={() => navigate('/insights')}
                  className="inline-flex min-h-9 items-center font-medium text-[var(--muted-foreground)] transition-colors hover:text-[var(--accent-strong)]"
                >
                  인사이트 아티클
                </button>
              </li>
            </ul>
          </div>

          {/* Legal / Site */}
          <div>
            <h2 className="text-sm font-bold text-[var(--foreground)]">사이트 정보</h2>
            <ul className="mt-3 space-y-1 text-sm text-[var(--muted-foreground)]">
              <li className="py-1">데이터 기준: 최신 시장 배치 반영</li>
              <li className="py-1">버전: v1.0.0 (GitHub Pages)</li>
              <li className="py-1">제작: bonsuk-yi / 이지자동화 FIRE</li>
            </ul>
          </div>
        </div>

        {/* Disclaimer Card */}
        <aside className="rounded-2xl border border-[var(--line)] bg-[var(--surface-muted)] p-4 sm:p-5 mt-8" aria-label="투자 정보 안내">
          <div className="flex items-start gap-3">
            <span aria-hidden="true" className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-white text-xs font-bold text-[var(--accent-strong)] shadow-xs">
              <Info className="w-4 h-4" />
            </span>
            <div>
              <h2 className="text-sm font-bold text-[var(--foreground)]">투자 정보 안내</h2>
              <div className="mt-1.5 text-xs leading-5 text-[var(--muted-foreground)] sm:text-sm sm:leading-6">
                본 서비스는 교육 및 일반적인 정보 제공을 위한 계산·비교 도구이며, 특정 금융상품의 매수·매도 권유 또는 개인별 투자·세무·법률 자문이 아닙니다. 모든 투자에는 원금 손실 가능성이 있으며, 과거 성과와 일정한 수익률을 가정한 시뮬레이션은 미래 결과를 보장하지 않습니다. 표시 데이터는 제3자 제공 자료 또는 샘플을 포함하며 지연·오류·누락이 있을 수 있으므로 거래 전 운용사·거래소 등 공식 자료를 확인하세요. 실제 결과는 시장 변동, 환율, 세금, 수수료, 분배금, 인출 시점과 개인 상황에 따라 달라질 수 있습니다.
              </div>
            </div>
          </div>
        </aside>

        <p className="mt-4 text-xs leading-5 text-[var(--muted-foreground)]">
          ETF 데이터는 실행 환경에 따라 수집 데이터 또는 기능 검증용 샘플을 사용합니다. 각 화면의 데이터 배지와 기준일을 확인하세요.
        </p>

        <p className="mt-6 border-t border-[var(--line)] pt-5 text-xs text-[var(--muted-foreground)]">
          Copyright © 2026 이지자동화 FIRE. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
