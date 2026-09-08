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
                <span style={{ display: 'none' }} className="items-center justify-center w-full h-full text-[var(--accent-strong)]">
                  <Flame className="w-6 h-6" />
                </span>
              </span>
              <span>
                <span className="block text-base font-extrabold tracking-tight">은퇴설계</span>
                <span className="block text-xs text-[var(--muted-foreground)]">퐈이어!!</span>
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-6 text-[var(--muted-foreground)]">
              
            </p>
          </div>
      </div>
    </footer>
  );
}
