import React, { useState, useEffect } from 'react';
import { Calculator, Save, Check, RotateCcw, TrendingUp, AlertCircle, Sparkles } from 'lucide-react';

export default function FireCalculator({ navigate }) {
  // Load initial params from hero if available, or saved goals
  const [currentAge, setCurrentAge] = useState(35);
  const [targetAge, setTargetAge] = useState(50);
  const [monthlyExpense, setMonthlyExpense] = useState(300); // 만원
  const [currentAssets, setCurrentAssets] = useState(5000);  // 만원
  const [monthlySavings, setMonthlySavings] = useState(150); // 만원
  const [annualReturn, setAnnualReturn] = useState(7);      // %
  const [withdrawalRate, setWithdrawalRate] = useState(4);  // %
  const [inflationRate, setInflationRate] = useState(2.5);  // %
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('user_fire_goal');
    const heroSaved = sessionStorage.getItem('fire_hero_params');
    if (heroSaved) {
      try {
        const p = JSON.parse(heroSaved);
        if (p.currentAge) setCurrentAge(p.currentAge);
        if (p.targetAge) setTargetAge(p.targetAge);
        if (p.monthlyExpense) setMonthlyExpense(p.monthlyExpense);
        if (p.currentAssets !== undefined) setCurrentAssets(p.currentAssets);
        if (p.monthlySavings !== undefined) setMonthlySavings(p.monthlySavings);
        sessionStorage.removeItem('fire_hero_params');
        return;
      } catch (e) {}
    }
    if (saved) {
      try {
        const g = JSON.parse(saved);
        setCurrentAge(g.currentAge ?? 35);
        setTargetAge(g.targetAge ?? 50);
        setMonthlyExpense(g.monthlyExpense ?? 300);
        setCurrentAssets(g.currentAssets ?? 5000);
        setMonthlySavings(g.monthlySavings ?? 150);
        setAnnualReturn(g.annualReturn ?? 7);
        setWithdrawalRate(g.withdrawalRate ?? 4);
        setInflationRate(g.inflationRate ?? 2.5);
      } catch (e) {}
    }
  }, []);

  const handleSaveGoal = () => {
    const goal = {
      currentAge,
      targetAge,
      monthlyExpense,
      currentAssets,
      monthlySavings,
      annualReturn,
      withdrawalRate,
      inflationRate,
      savedAt: new Date().toISOString()
    };
    localStorage.setItem('user_fire_goal', JSON.stringify(goal));
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  // Target Assets in today's currency:
  // Annual Expense / (withdrawalRate / 100)
  const targetAssetsNominal = (monthlyExpense * 12) / (withdrawalRate / 100);

  // Future inflated target assets at target age:
  const yearsToTarget = Math.max(1, targetAge - currentAge);
  const targetAssetsInflated = targetAssetsNominal * Math.pow(1 + inflationRate / 100, yearsToTarget);

  // Real return rate = (1 + r) / (1 + i) - 1
  const realReturn = ((1 + annualReturn / 100) / (1 + inflationRate / 100)) - 1;
  const monthlyRealRate = realReturn / 12;
  const totalMonths = yearsToTarget * 12;

  // FV with real returns:
  const projectedAssetsReal = Math.round(
    currentAssets * Math.pow(1 + monthlyRealRate, totalMonths) +
    monthlySavings * ((Math.pow(1 + monthlyRealRate, totalMonths) - 1) / monthlyRealRate)
  );

  const canAchieve = projectedAssetsReal >= targetAssetsNominal;
  const gap = targetAssetsNominal - projectedAssetsReal;

  // Required monthly savings:
  const requiredMonthlySavings = Math.max(
    0,
    Math.round(
      (targetAssetsNominal - currentAssets * Math.pow(1 + monthlyRealRate, totalMonths)) *
      monthlyRealRate / (Math.pow(1 + monthlyRealRate, totalMonths) - 1)
    )
  );

  // Generate Year-by-Year timeline table
  const timeline = [];
  let assetBalance = currentAssets;
  for (let y = 0; y <= Math.min(45, 90 - currentAge); y++) {
    const age = currentAge + y;
    if (y > 0) {
      for (let m = 0; m < 12; m++) {
        assetBalance = assetBalance * (1 + monthlyRealRate) + (age <= targetAge ? monthlySavings : -(monthlyExpense));
      }
    }
    timeline.push({
      yearIndex: y,
      age: age,
      assets: Math.max(0, Math.round(assetBalance)),
      isTarget: age === targetAge,
      isRetired: age >= targetAge
    });
  }

  const formatMoney = (val) => {
    if (val >= 10000) {
      const eok = Math.floor(val / 10000);
      const rem = Math.round(val % 10000);
      return rem > 0 ? `${eok}억 ${rem.toLocaleString()}만원` : `${eok}억원`;
    }
    return `${Math.round(val).toLocaleString()}만원`;
  };

  return (
    <div className="page-shell py-8 sm:py-12 flex-1">
      {/* Page Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pb-6 border-b border-[var(--line)]">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[var(--accent-strong)] uppercase tracking-wider">
            <Calculator className="w-4 h-4" />
            <span>정밀 시뮬레이터</span>
          </div>
          <h1 className="mt-1 text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--foreground)]">
            FIRE 상세 계산기
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-[var(--muted-foreground)]">
            물가상승률, 인출률, 저축액을 반영하여 은퇴 목표 자산과 연도별 자산 흐름을 시뮬레이션합니다.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleSaveGoal}
            className="inline-flex items-center gap-1.5 rounded-xl border border-[var(--line)] bg-white px-4 py-2.5 text-xs sm:text-sm font-bold shadow-sm hover:bg-[var(--surface-muted)] transition"
          >
            {savedSuccess ? <Check className="w-4 h-4 text-emerald-600" /> : <Save className="w-4 h-4" />}
            <span>{savedSuccess ? '저장 완료!' : '목표 저장'}</span>
          </button>
        </div>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_1.4fr]">
        {/* Left: Input Controls */}
        <div className="rounded-3xl border border-[var(--line)] bg-white p-5 sm:p-7 shadow-sm space-y-6">
          <h2 className="text-lg font-bold text-[var(--foreground)] border-b pb-3">투자 및 목표 가정 설정</h2>

          {/* Current Age & Target Age */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[var(--muted-foreground)]">현재 나이</label>
              <div className="mt-1 flex items-center rounded-xl border border-[var(--line)] px-3 py-2 bg-slate-50">
                <input
                  type="number"
                  value={currentAge}
                  onChange={(e) => setCurrentAge(Number(e.target.value) || 18)}
                  className="w-full bg-transparent font-mono font-bold text-sm sm:text-base outline-none"
                />
                <span className="text-xs text-[var(--muted-foreground)]">세</span>
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-[var(--muted-foreground)]">목표 은퇴 나이</label>
              <div className="mt-1 flex items-center rounded-xl border border-[var(--line)] px-3 py-2 bg-slate-50">
                <input
                  type="number"
                  value={targetAge}
                  onChange={(e) => setTargetAge(Number(e.target.value) || currentAge + 1)}
                  className="w-full bg-transparent font-mono font-bold text-sm sm:text-base outline-none"
                />
                <span className="text-xs text-[var(--muted-foreground)]">세</span>
              </div>
            </div>
          </div>

          {/* Monthly Expense */}
          <div>
            <div className="flex justify-between text-xs font-bold">
              <span className="text-[var(--muted-foreground)]">은퇴 후 희망 월 생활비</span>
              <span className="font-mono text-[var(--accent-strong)]">{monthlyExpense.toLocaleString()}만원</span>
            </div>
            <input
              type="range"
              min="100"
              max="1500"
              step="20"
              value={monthlyExpense}
              onChange={(e) => setMonthlyExpense(Number(e.target.value))}
              className="fire-range mt-2 w-full"
            />
            <div className="mt-1 flex justify-between text-[10px] text-[var(--muted-foreground)]">
              <span>100만원</span>
              <span>연간 생활비: {(monthlyExpense * 12).toLocaleString()}만원</span>
              <span>1,500만원</span>
            </div>
          </div>

          {/* Current Assets */}
          <div>
            <div className="flex justify-between text-xs font-bold">
              <span className="text-[var(--muted-foreground)]">현재 보유 금융자산</span>
              <span className="font-mono text-[var(--foreground)]">{formatMoney(currentAssets)}</span>
            </div>
            <input
              type="range"
              min="0"
              max="50000"
              step="500"
              value={currentAssets}
              onChange={(e) => setCurrentAssets(Number(e.target.value))}
              className="fire-range mt-2 w-full"
            />
            <div className="mt-1 flex justify-between text-[10px] text-[var(--muted-foreground)]">
              <span>0원</span>
              <span>5억원</span>
            </div>
          </div>

          {/* Monthly Savings */}
          <div>
            <div className="flex justify-between text-xs font-bold">
              <span className="text-[var(--muted-foreground)]">매월 저축 및 투자 금액</span>
              <span className="font-mono text-[var(--accent-strong)]">{monthlySavings.toLocaleString()}만원/월</span>
            </div>
            <input
              type="range"
              min="10"
              max="1000"
              step="10"
              value={monthlySavings}
              onChange={(e) => setMonthlySavings(Number(e.target.value))}
              className="fire-range mt-2 w-full"
            />
            <div className="mt-1 flex justify-between text-[10px] text-[var(--muted-foreground)]">
              <span>10만원</span>
              <span>연간 저축: {(monthlySavings * 12).toLocaleString()}만원</span>
              <span>1,000만원</span>
            </div>
          </div>

          {/* Advanced Rates Grid */}
          <div className="pt-3 border-t border-slate-100 grid grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-[var(--muted-foreground)]">기대 연수익률</label>
              <div className="mt-1 flex items-center rounded-xl border border-[var(--line)] px-2.5 py-1.5 bg-slate-50">
                <input
                  type="number"
                  step="0.5"
                  value={annualReturn}
                  onChange={(e) => setAnnualReturn(Number(e.target.value))}
                  className="w-full bg-transparent font-mono font-bold text-xs sm:text-sm outline-none"
                />
                <span className="text-xs text-[var(--muted-foreground)]">%</span>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[var(--muted-foreground)]">안전 인출률</label>
              <div className="mt-1 flex items-center rounded-xl border border-[var(--line)] px-2.5 py-1.5 bg-slate-50">
                <input
                  type="number"
                  step="0.5"
                  value={withdrawalRate}
                  onChange={(e) => setWithdrawalRate(Number(e.target.value))}
                  className="w-full bg-transparent font-mono font-bold text-xs sm:text-sm outline-none"
                />
                <span className="text-xs text-[var(--muted-foreground)]">%</span>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[var(--muted-foreground)]">물가상승률</label>
              <div className="mt-1 flex items-center rounded-xl border border-[var(--line)] px-2.5 py-1.5 bg-slate-50">
                <input
                  type="number"
                  step="0.1"
                  value={inflationRate}
                  onChange={(e) => setInflationRate(Number(e.target.value))}
                  className="w-full bg-transparent font-mono font-bold text-xs sm:text-sm outline-none"
                />
                <span className="text-xs text-[var(--muted-foreground)]">%</span>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-[var(--surface-muted)] text-[11px] text-[var(--muted-foreground)] leading-relaxed">
            실질 기대수익률: <strong className="font-mono text-[var(--foreground)]">{(realReturn * 100).toFixed(2)}%</strong> (물가상승률 {inflationRate}% 차감 후)
          </div>
        </div>

        {/* Right: Results & Simulation View */}
        <div className="space-y-6">
          {/* Key KPI Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="rounded-3xl border border-[var(--line)] bg-white p-4 shadow-sm">
              <p className="text-xs text-[var(--muted-foreground)] font-semibold">필요 목표 자산 (현재가치)</p>
              <p className="numeric mt-1.5 text-xl sm:text-2xl font-black text-[var(--accent-strong)]">
                {formatMoney(targetAssetsNominal)}
              </p>
              <p className="mt-1 text-[10px] text-[var(--muted-foreground)]">인출률 {withdrawalRate}% 적용</p>
            </div>

            <div className="rounded-3xl border border-[var(--line)] bg-white p-4 shadow-sm">
              <p className="text-xs text-[var(--muted-foreground)] font-semibold">{targetAge}세 예상 실질자산</p>
              <p className="numeric mt-1.5 text-xl sm:text-2xl font-black text-[var(--foreground)]">
                {formatMoney(projectedAssetsReal)}
              </p>
              <p className="mt-1 text-[10px] text-[var(--muted-foreground)]">남은 기간: {yearsToTarget}년</p>
            </div>

            <div className="col-span-2 sm:col-span-1 rounded-3xl border border-[var(--line)] bg-white p-4 shadow-sm">
              <p className="text-xs text-[var(--muted-foreground)] font-semibold">목표 달성 상태</p>
              <p className={`numeric mt-1.5 text-xl sm:text-2xl font-black ${canAchieve ? 'text-emerald-600' : 'text-amber-600'}`}>
                {canAchieve ? '달성 가능 🎯' : '추가 저축 필요'}
              </p>
              <p className="mt-1 text-[10px] text-[var(--muted-foreground)]">
                {canAchieve ? '여유 자산 형성' : `부족액 ${formatMoney(gap)}`}
              </p>
            </div>
          </div>

          {/* Achievement Diagnostic Banner */}
          {canAchieve ? (
            <div className="rounded-3xl border border-emerald-200 bg-emerald-50/70 p-5 text-sm text-emerald-900 flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="font-bold">계획 달성 완료!</strong> 현재 월 {monthlySavings}만원 저축으로 {targetAge}세에 목표자산({formatMoney(targetAssetsNominal)})을 초과 달성할 수 있습니다. 달성 후 월 {monthlyExpense}만원을 평생 안전하게 인출할 수 있습니다.
              </div>
            </div>
          ) : (
            <div className="rounded-3xl border border-amber-200 bg-amber-50/70 p-5 text-sm text-amber-900 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong className="font-bold">조정 가이드:</strong> {targetAge}세까지 목표를 달성하려면 매달 저축액을 <strong>{requiredMonthlySavings}만원</strong>으로 늘리거나, 은퇴 나이를 <strong>{targetAge + Math.ceil(gap / ((monthlySavings*12) || 1))}세</strong>로 늦추는 것을 추천합니다.
              </div>
            </div>
          )}

          {/* Year by Year Timeline Table */}
          <div className="rounded-3xl border border-[var(--line)] bg-white p-5 sm:p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-[var(--foreground)]">나이별 실질 자산 축적 및 인출 시뮬레이션</h3>
              <span className="text-xs text-[var(--muted-foreground)]">물가상승 반영 실질 가치</span>
            </div>

            <div className="overflow-x-auto max-h-80 overflow-y-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-50 text-[var(--muted-foreground)] sticky top-0 border-b">
                  <tr>
                    <th className="py-2.5 px-3">경과</th>
                    <th className="py-2.5 px-3">나이</th>
                    <th className="py-2.5 px-3 text-right">예상 자산 잔액</th>
                    <th className="py-2.5 px-3 text-right">상태</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono">
                  {timeline.map((row) => (
                    <tr
                      key={row.yearIndex}
                      className={`hover:bg-slate-50 transition ${
                        row.isTarget ? 'bg-amber-50/80 font-bold' : ''
                      }`}
                    >
                      <td className="py-2.5 px-3 font-sans text-slate-500">
                        {row.yearIndex === 0 ? '현재' : `${row.yearIndex}년차`}
                      </td>
                      <td className="py-2.5 px-3 font-bold text-[var(--foreground)]">
                        {row.age}세
                      </td>
                      <td className="py-2.5 px-3 text-right font-semibold text-[var(--foreground)]">
                        {formatMoney(row.assets)}
                      </td>
                      <td className="py-2.5 px-3 text-right font-sans">
                        {row.isTarget ? (
                          <span className="rounded-md bg-amber-200 px-2 py-0.5 text-xs text-amber-900 font-bold">
                            목표 은퇴
                          </span>
                        ) : row.isRetired ? (
                          <span className="text-slate-400 text-xs">은퇴 인출기</span>
                        ) : (
                          <span className="text-emerald-700 text-xs font-semibold">자산 축적기</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
