import React, { useState, useEffect } from 'react';
import { Flame, Lock, ShieldCheck, AlertCircle } from 'lucide-react';
import { verifyPassword, sha256, AUTH_STORAGE_KEY, verifyStoredHash } from '../config/auth';

export default function PasswordGate({ onUnlock }) {
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Auto-unlock if valid stored hash exists
  useEffect(() => {
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY);
      if (stored && verifyStoredHash(stored)) {
        onUnlock();
      }
    } catch (_) {}
  }, [onUnlock]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password) return;

    setError('');
    setLoading(true);

    try {
      const isValid = await verifyPassword(password);
      if (isValid) {
        if (remember) {
          const hash = await sha256(password.trim());
          try {
            localStorage.setItem(AUTH_STORAGE_KEY, hash);
          } catch (_) {}
        } else {
          try {
            localStorage.removeItem(AUTH_STORAGE_KEY);
          } catch (_) {}
        }
        onUnlock();
      } else {
        try {
          localStorage.removeItem(AUTH_STORAGE_KEY);
        } catch (_) {}
        setError('비밀번호가 올바르지 않습니다.');
        setPassword('');
      }
    } catch (err) {
      setError('인증 처리 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-gradient-to-b from-[#102533] via-[#0b1d28] to-[#061219]">
      {/* Background ambient lighting */}
      <div
        className="absolute inset-0 bg-[radial-gradient(900px_500px_at_50%_15%,rgba(15,118,110,0.18),transparent_70%)] pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative w-full max-w-[370px] rounded-3xl border border-white/15 bg-[#0f2735]/90 p-7 sm:p-9 text-center shadow-[0_24px_70px_rgba(0,0,0,0.6)] backdrop-blur-xl">
        {/* Gate Mark / Icon */}
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--fire-amber)] to-[#e07e1b] text-white shadow-[0_8px_24px_rgba(242,166,43,0.35)]">
          <Flame className="w-9 h-9" />
        </div>

        {/* Title & Sub */}
        <h1 className="mt-4 text-xl font-extrabold tracking-tight text-white sm:text-2xl">
          이지자동화 FIRE
        </h1>
        <p className="mt-1.5 text-xs text-slate-300 sm:text-[13px] leading-relaxed">
          데이터는 보호되어 있습니다. 비밀번호를 입력하세요.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-6 text-left" autoComplete="on">
          <div>
            <label htmlFor="fire-pw" className="sr-only">비밀번호</label>
            <input
              id="fire-pw"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호"
              autoFocus
              required
              autoComplete="current-password"
              className="w-full rounded-xl border border-slate-700 bg-[#091a24] px-4 py-3 text-sm font-mono text-white placeholder-slate-500 outline-none transition focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/30"
            />
          </div>

          <label className="mt-3.5 flex cursor-pointer items-center justify-center gap-2 text-xs text-slate-300 select-none">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="rounded border-slate-700 bg-[#091a24] text-[var(--accent)] focus:ring-0 cursor-pointer"
            />
            <span>이 브라우저에 기억</span>
          </label>

          <button
            type="submit"
            disabled={loading || !password}
            className="mt-4 w-full rounded-xl bg-[var(--accent)] py-3 text-sm font-bold text-white shadow-lg transition hover:bg-[var(--accent-strong)] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? '확인 중…' : '열기'}
          </button>

          {/* Error message */}
          {error && (
            <div className="mt-3.5 flex items-center justify-center gap-1.5 text-xs font-semibold text-rose-300">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Bottom security note */}
          <p className="mt-5 text-center text-[11px] leading-5 text-slate-400">
            인증은 브라우저에서만 이루어집니다.<br />
            비밀번호는 어디로도 전송되지 않습니다.
          </p>
        </form>
      </div>
    </div>
  );
}
