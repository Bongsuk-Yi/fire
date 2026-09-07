import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, CheckCircle2, RotateCcw } from 'lucide-react';

export default function HeroCalculator({ onNavigateWithParams }) {
  const [step, setStep] = useState(1);
  const [currentAge, setCurrentAge] = useState(35);
  const [monthlyExpense, setMonthlyExpense] = useState(300); // 만원
  const [currentAssets, setCurrentAssets] = useState(5000);  // 만원
  const [monthlySavings, setMonthlySavings] = useState(150); // 만원
  const [targetAge, setTargetAge] = useState(50);

  // 4% Rule calculation
  // Target assets = (Annual expenses) / 0.04 = (monthlyExpense * 12) / 0.04 = monthlyExpense * 300
  const targetAssets = monthlyExpense * 300; // 만원 (예: 300만 -> 9억)

  // Future projection
  // Monthly return rate (annual 6% assumed)
  const annualReturn = 0.06;
  const monthlyRate = annualReturn / 12;
  const yearsToTarget = Math.max(1, targetAge - currentAge);
  const months = yearsToTarget * 12;

  // FV = PV * (1+r)^n + PMT * [ ((1+r)^n - 1) / r ]
  const projectedAssets = Math.round(
    currentAssets * Math.pow(1 + monthlyRate, months) +
    monthlySavings * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate)
  );

  const canAchieve = projectedAssets >= targetAssets;
  const gap = targetAssets - projectedAssets;

  // Calculate required monthly savings to hit target by targetAge:
  // PMT = (Target - PV*(1+r)^n) * r / ((1+r)^n - 1)
  const requiredMonthlySavings = Math.max(
    0,
    Math.round(
      (targetAssets - currentAssets * Math.pow(1 + monthlyRate, months)) *
      monthlyRate / (Math.pow(1 + monthlyRate, months) - 1)
    )
  );

  const formatMoney = (val) => {
    if (val >= 10000) {
      const eok = Math.floor(val / 10000);
      const rem = val % 10000;
      return rem > 0 ? `${eok}억 ${rem.toLocaleString()}만원` : `${eok}억원`;
    }
    return `${val.toLocaleString()}만원`;
  };

  const handleNext = () => {
    if (step < 5) setStep(step + 1);
    else setStep(6); // results
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleGoToCalculator = () => {
    if (onNavigateWithParams) {
      onNavigateWithParams('/fire-calculator', {
        currentAge,
        monthlyExpense,
        currentAssets,
        monthlySavings,
        targetAge
      });
    }
  };

  return (
    <section className="w-full min-w-0 max-w-full overflow-hidden rounded-[22px] border border-white/25 bg-[var(--fire-surface)] text-[var(--fire-ink)] shadow-[0_30px_80px_rgba(0,0,0,0.24)] sm:rounded-[28px]">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--fire-line)] px-4 py-3 sm:px-7 sm:py-4">
        <div>
          <p className="font-mono text-[10px] font-bold tracking-[0.14em] text-[#9a6a1b] uppercase">
            1분 FIRE 로드맵
          </p>
          <h2 className="mt-0.5 text-base font-extrabold tracking-tight sm:mt-1 sm:text-lg">
            내 FIRE 나이 계산하기
          </h2>
        </div>
        <span className="shrink-0 rounded-full bg-[var(--accent-soft)] px-3 py-1.5 text-[10px] font-bold text-[var(--accent-strong)]">
          1분 계산
        </span>
      </div>

      <div className="p-4 sm:p-7">
        {step <= 5 ? (
          <div>
            {/* Progress bar */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-[var(--accent-strong)]">
                질문 {step} / 5
              </span>
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[var(--surface-muted)]">
                <div
                  className="h-full rounded-full bg-[var(--accent)] transition-all duration-300"
                  style={{ width: `${(step / 5) * 100}%` }}
                />
              </div>
            </div>

            {/* Step Content */}
            <div className="mt-4 min-h-[16rem] sm:mt-7 sm:min-h-[19rem] flex flex-col justify-center">
              {step === 1 && (
                <div>
                  <p className="text-xs font-bold text-[#9a6a1b]">현재 나이</p>
                  <h3 className="mt-1 text-xl font-extrabold tracking-[-0.04em] sm:mt-2 sm:text-3xl">
                    지금 몇 살인가요?
                  </h3>
                  <p className="mt-2 text-xs leading-5 text-[var(--fire-muted)] sm:mt-3 sm:text-sm sm:leading-6">
                    만 나이를 기준으로 목표까지 남은 시간을 계산해요.
                  </p>
                  <div className="mt-4 sm:mt-7">
                    <div className="flex items-center justify-center gap-2 sm:gap-3">
                      <button
                        type="button"
                        onClick={() => setCurrentAge(Math.max(18, currentAge - 1))}
                        className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[var(--fire-line)] bg-white text-lg font-bold sm:h-12 sm:w-12 sm:text-xl hover:bg-slate-50 active:scale-95"
                      >
                        −
                      </button>
                      <div className="flex min-h-12 min-w-0 flex-1 items-center justify-center rounded-xl border-2 border-[var(--fire-ink)] bg-white px-2 focus-within:ring-3 focus-within:ring-[var(--fire-amber)]/20 sm:min-h-16 sm:rounded-2xl sm:px-3">
                        <input
                          type="number"
                          value={currentAge}
                          onChange={(e) => setCurrentAge(Number(e.target.value) || 18)}
                          className="min-h-11 min-w-0 flex-1 bg-transparent text-right text-lg font-extrabold tabular-nums outline-none sm:text-3xl"
                        />
                        <span className="ml-1 shrink-0 text-xs font-bold text-[var(--fire-muted)] sm:ml-2 sm:text-sm">
                          세
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setCurrentAge(Math.min(75, currentAge + 1))}
                        className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[var(--fire-line)] bg-white text-lg font-bold sm:h-12 sm:w-12 sm:text-xl hover:bg-slate-50 active:scale-95"
                      >
                        +
                      </button>
                    </div>
                    <input
                      type="range"
                      min="18"
                      max="75"
                      step="1"
                      value={currentAge}
                      onChange={(e) => setCurrentAge(Number(e.target.value))}
                      className="fire-range mt-3 h-10 w-full sm:mt-4"
                    />
                    <div className="mt-1 flex justify-between text-[11px] font-semibold text-[var(--fire-muted)]">
                      <span>18세</span>
                      <span>75세</span>
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div>
                  <p className="text-xs font-bold text-[#9a6a1b]">은퇴 후 생활비</p>
                  <h3 className="mt-1 text-xl font-extrabold tracking-[-0.04em] sm:mt-2 sm:text-3xl">
                    은퇴 후 월 얼마가 필요한가요?
                  </h3>
                  <p className="mt-2 text-xs leading-5 text-[var(--fire-muted)] sm:mt-3 sm:text-sm sm:leading-6">
                    현재 가치 기준 월 희망 생활비를 입력하세요. 4% 룰로 목표 자산이 산출됩니다.
                  </p>
                  <div className="mt-4 sm:mt-7">
                    <div className="flex items-center justify-center gap-2 sm:gap-3">
                      <button
                        type="button"
                        onClick={() => setMonthlyExpense(Math.max(50, monthlyExpense - 20))}
                        className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[var(--fire-line)] bg-white text-lg font-bold sm:h-12 sm:w-12 sm:text-xl hover:bg-slate-50 active:scale-95"
                      >
                        −
                      </button>
                      <div className="flex min-h-12 min-w-0 flex-1 items-center justify-center rounded-xl border-2 border-[var(--fire-ink)] bg-white px-2 focus-within:ring-3 focus-within:ring-[var(--fire-amber)]/20 sm:min-h-16 sm:rounded-2xl sm:px-3">
                        <input
                          type="number"
                          value={monthlyExpense}
                          onChange={(e) => setMonthlyExpense(Number(e.target.value) || 50)}
                          className="min-h-11 min-w-0 flex-1 bg-transparent text-right text-lg font-extrabold tabular-nums outline-none sm:text-3xl"
                        />
                        <span className="ml-1 shrink-0 text-xs font-bold text-[var(--fire-muted)] sm:ml-2 sm:text-sm">
                          만원/월
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setMonthlyExpense(monthlyExpense + 20)}
                        className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[var(--fire-line)] bg-white text-lg font-bold sm:h-12 sm:w-12 sm:text-xl hover:bg-slate-50 active:scale-95"
                      >
                        +
                      </button>
                    </div>
                    <input
                      type="range"
                      min="100"
                      max="1000"
                      step="20"
                      value={monthlyExpense}
                      onChange={(e) => setMonthlyExpense(Number(e.target.value))}
                      className="fire-range mt-3 h-10 w-full sm:mt-4"
                    />
                    <div className="mt-1 flex justify-between text-[11px] font-semibold text-[var(--fire-muted)]">
                      <span>100만원</span>
                      <span>목표자산: {formatMoney(targetAssets)}</span>
                      <span>1,000만원</span>
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div>
                  <p className="text-xs font-bold text-[#9a6a1b]">현재 순자산</p>
                  <h3 className="mt-1 text-xl font-extrabold tracking-[-0.04em] sm:mt-2 sm:text-3xl">
                    현재 모아둔 투자/금융자산은?
                  </h3>
                  <p className="mt-2 text-xs leading-5 text-[var(--fire-muted)] sm:mt-3 sm:text-sm sm:leading-6">
                    부동산을 제외한 주식, ETF, 연금, 예적금 등 순수 금융자산 기준입니다.
                  </p>
                  <div className="mt-4 sm:mt-7">
                    <div className="flex items-center justify-center gap-2 sm:gap-3">
                      <button
                        type="button"
                        onClick={() => setCurrentAssets(Math.max(0, currentAssets - 500))}
                        className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[var(--fire-line)] bg-white text-lg font-bold sm:h-12 sm:w-12 sm:text-xl hover:bg-slate-50 active:scale-95"
                      >
                        −
                      </button>
                      <div className="flex min-h-12 min-w-0 flex-1 items-center justify-center rounded-xl border-2 border-[var(--fire-ink)] bg-white px-2 focus-within:ring-3 focus-within:ring-[var(--fire-amber)]/20 sm:min-h-16 sm:rounded-2xl sm:px-3">
                        <input
                          type="number"
                          value={currentAssets}
                          onChange={(e) => setCurrentAssets(Number(e.target.value) || 0)}
                          className="min-h-11 min-w-0 flex-1 bg-transparent text-right text-lg font-extrabold tabular-nums outline-none sm:text-3xl"
                        />
                        <span className="ml-1 shrink-0 text-xs font-bold text-[var(--fire-muted)] sm:ml-2 sm:text-sm">
                          만원
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setCurrentAssets(currentAssets + 500)}
                        className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[var(--fire-line)] bg-white text-lg font-bold sm:h-12 sm:w-12 sm:text-xl hover:bg-slate-50 active:scale-95"
                      >
                        +
                      </button>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="30000"
                      step="500"
                      value={currentAssets}
                      onChange={(e) => setCurrentAssets(Number(e.target.value))}
                      className="fire-range mt-3 h-10 w-full sm:mt-4"
                    />
                    <div className="mt-1 flex justify-between text-[11px] font-semibold text-[var(--fire-muted)]">
                      <span>0원</span>
                      <span>{formatMoney(currentAssets)}</span>
                      <span>3억원 이상</span>
                    </div>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div>
                  <p className="text-xs font-bold text-[#9a6a1b]">월 투자 저축액</p>
                  <h3 className="mt-1 text-xl font-extrabold tracking-[-0.04em] sm:mt-2 sm:text-3xl">
                    매달 얼마씩 투자할 수 있나요?
                  </h3>
                  <p className="mt-2 text-xs leading-5 text-[var(--fire-muted)] sm:mt-3 sm:text-sm sm:leading-6">
                    매달 꾸준히 ETF와 포트폴리오에 납입 가능한 금액입니다.
                  </p>
                  <div className="mt-4 sm:mt-7">
                    <div className="flex items-center justify-center gap-2 sm:gap-3">
                      <button
                        type="button"
                        onClick={() => setMonthlySavings(Math.max(10, monthlySavings - 10))}
                        className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[var(--fire-line)] bg-white text-lg font-bold sm:h-12 sm:w-12 sm:text-xl hover:bg-slate-50 active:scale-95"
                      >
                        −
                      </button>
                      <div className="flex min-h-12 min-w-0 flex-1 items-center justify-center rounded-xl border-2 border-[var(--fire-ink)] bg-white px-2 focus-within:ring-3 focus-within:ring-[var(--fire-amber)]/20 sm:min-h-16 sm:rounded-2xl sm:px-3">
                        <input
                          type="number"
                          value={monthlySavings}
                          onChange={(e) => setMonthlySavings(Number(e.target.value) || 10)}
                          className="min-h-11 min-w-0 flex-1 bg-transparent text-right text-lg font-extrabold tabular-nums outline-none sm:text-3xl"
                        />
                        <span className="ml-1 shrink-0 text-xs font-bold text-[var(--fire-muted)] sm:ml-2 sm:text-sm">
                          만원/월
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setMonthlySavings(monthlySavings + 10)}
                        className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[var(--fire-line)] bg-white text-lg font-bold sm:h-12 sm:w-12 sm:text-xl hover:bg-slate-50 active:scale-95"
                      >
                        +
                      </button>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="500"
                      step="10"
                      value={monthlySavings}
                      onChange={(e) => setMonthlySavings(Number(e.target.value))}
                      className="fire-range mt-3 h-10 w-full sm:mt-4"
                    />
                    <div className="mt-1 flex justify-between text-[11px] font-semibold text-[var(--fire-muted)]">
                      <span>10만원</span>
                      <span>연 {monthlySavings * 12}만원</span>
                      <span>500만원</span>
                    </div>
                  </div>
                </div>
              )}

              {step === 5 && (
                <div>
                  <p className="text-xs font-bold text-[#9a6a1b]">희망 은퇴 나이</p>
                  <h3 className="mt-1 text-xl font-extrabold tracking-[-0.04em] sm:mt-2 sm:text-3xl">
                    몇 살에 FIRE를 달성하고 싶나요?
                  </h3>
                  <p className="mt-2 text-xs leading-5 text-[var(--fire-muted)] sm:mt-3 sm:text-sm sm:leading-6">
                    현재 나이({currentAge}세) 이후 목표 은퇴 시점을 선택하세요.
                  </p>
                  <div className="mt-4 sm:mt-7">
                    <div className="flex items-center justify-center gap-2 sm:gap-3">
                      <button
                        type="button"
                        onClick={() => setTargetAge(Math.max(currentAge + 1, targetAge - 1))}
                        className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[var(--fire-line)] bg-white text-lg font-bold sm:h-12 sm:w-12 sm:text-xl hover:bg-slate-50 active:scale-95"
                      >
                        −
                      </button>
                      <div className="flex min-h-12 min-w-0 flex-1 items-center justify-center rounded-xl border-2 border-[var(--fire-ink)] bg-white px-2 focus-within:ring-3 focus-within:ring-[var(--fire-amber)]/20 sm:min-h-16 sm:rounded-2xl sm:px-3">
                        <input
                          type="number"
                          value={targetAge}
                          onChange={(e) => setTargetAge(Number(e.target.value) || currentAge + 5)}
                          className="min-h-11 min-w-0 flex-1 bg-transparent text-right text-lg font-extrabold tabular-nums outline-none sm:text-3xl"
                        />
                        <span className="ml-1 shrink-0 text-xs font-bold text-[var(--fire-muted)] sm:ml-2 sm:text-sm">
                          세 ({targetAge - currentAge}년 후)
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setTargetAge(Math.min(80, targetAge + 1))}
                        className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[var(--fire-line)] bg-white text-lg font-bold sm:h-12 sm:w-12 sm:text-xl hover:bg-slate-50 active:scale-95"
                      >
                        +
                      </button>
                    </div>
                    <input
                      type="range"
                      min={currentAge + 1}
                      max="75"
                      step="1"
                      value={targetAge}
                      onChange={(e) => setTargetAge(Number(e.target.value))}
                      className="fire-range mt-3 h-10 w-full sm:mt-4"
                    />
                    <div className="mt-1 flex justify-between text-[11px] font-semibold text-[var(--fire-muted)]">
                      <span>{currentAge + 1}세</span>
                      <span>남은 기간: {targetAge - currentAge}년</span>
                      <span>75세</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Stepper Buttons */}
            <div className="mt-3 grid grid-cols-[0.42fr_1fr] gap-2 sm:mt-5">
              <button
                type="button"
                disabled={step === 1}
                onClick={handlePrev}
                className="min-h-11 rounded-xl border border-[var(--fire-line)] bg-white px-3 text-xs font-bold disabled:opacity-35 sm:min-h-12 sm:rounded-2xl sm:px-4 sm:text-sm hover:bg-slate-50 transition"
              >
                이전
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="min-h-11 rounded-xl bg-[var(--fire-amber)] px-4 text-xs font-extrabold text-[var(--fire-ink)] sm:min-h-12 sm:rounded-2xl sm:px-5 sm:text-sm hover:opacity-90 transition shadow-sm"
              >
                {step === 5 ? '결과 계산하기 →' : '다음 →'}
              </button>
            </div>
          </div>
        ) : (
          /* Step 6: Calculation Result Screen */
          <div className="min-h-[20rem] sm:min-h-[24rem] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-[var(--accent-soft)] px-3 py-1 text-xs font-bold text-[var(--accent-strong)]">
                  계산 완료
                </span>
                <button
                  onClick={() => setStep(1)}
                  className="inline-flex items-center gap-1 text-xs text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> 다시 계산
                </button>
              </div>

              <h3 className="mt-3 text-xl font-extrabold tracking-tight sm:text-2xl">
                {targetAge}세 FIRE 달성 분석
              </h3>

              <div className="mt-4 grid grid-cols-2 gap-2 sm:gap-3">
                <div className="rounded-2xl bg-[var(--surface-muted)] p-3.5 sm:p-4">
                  <p className="text-[11px] font-semibold text-[var(--muted-foreground)]">필요 목표 자산 (4% 룰)</p>
                  <p className="numeric mt-1 text-lg sm:text-xl font-extrabold text-[var(--accent-strong)]">
                    {formatMoney(targetAssets)}
                  </p>
                  <p className="mt-0.5 text-[10px] text-[var(--muted-foreground)]">연 생활비 {monthlyExpense * 12}만원</p>
                </div>
                <div className="rounded-2xl bg-[var(--surface-muted)] p-3.5 sm:p-4">
                  <p className="text-[11px] font-semibold text-[var(--muted-foreground)]">{targetAge}세 예상 자산</p>
                  <p className="numeric mt-1 text-lg sm:text-xl font-extrabold text-[var(--foreground)]">
                    {formatMoney(projectedAssets)}
                  </p>
                  <p className="mt-0.5 text-[10px] text-[var(--muted-foreground)]">연 6% 수익률 가정</p>
                </div>
              </div>

              {canAchieve ? (
                <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50/70 p-3.5 text-xs sm:text-sm text-emerald-900 leading-5">
                  🎉 <strong>축하합니다!</strong> 현재 계획대로 매월 {monthlySavings}만원을 투자하면 <strong>{targetAge}세에 목표 자산({formatMoney(targetAssets)})을 달성</strong>할 수 있습니다!
                </div>
              ) : (
                <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50/70 p-3.5 text-xs sm:text-sm text-amber-900 leading-5">
                  💡 {targetAge}세 목표치 대비 약 <strong>{formatMoney(gap)}</strong> 부족할 것으로 예상됩니다. 목표 달성을 위해서는 월 저축액을 <strong>{requiredMonthlySavings}만원</strong>으로 늘리거나 투자 기간을 조율해보세요.
                </div>
              )}
            </div>

            <div className="mt-5 pt-3 border-t border-[var(--fire-line)]">
              <button
                type="button"
                onClick={handleGoToCalculator}
                className="w-full min-h-12 flex items-center justify-center gap-2 rounded-2xl bg-[var(--accent)] px-5 text-sm font-bold text-white transition hover:bg-[var(--accent-strong)] shadow-sm"
              >
                상세 계산기로 포트폴리오 설계하기 <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      <p className="border-t border-[var(--fire-line)] bg-[#f8faf8] px-4 py-2.5 text-[10px] leading-4 text-[var(--fire-muted)] sm:px-7 sm:py-3 sm:text-[11px] sm:leading-5">
        빠른 계산은 연 6% 수익률·인출률 4%를 가정하고 목표자산은 물가 미반영 현재 가격으로 계산합니다. 상세 화면에서 물가 반영 및 맞춤 포트폴리오를 점검할 수 있습니다.
      </p>
    </section>
  );
}
