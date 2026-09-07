/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        surface: 'var(--surface)',
        'surface-muted': 'var(--surface-muted)',
        line: 'var(--line)',
        'muted-foreground': 'var(--muted-foreground)',
        accent: 'var(--accent)',
        'accent-strong': 'var(--accent-strong)',
        'accent-soft': 'var(--accent-soft)',
        navy: 'var(--navy)',
        'fire-ink': 'var(--fire-ink)',
        'fire-amber': 'var(--fire-amber)',
        'fire-amber-soft': 'var(--fire-amber-soft)',
        'fire-surface': 'var(--fire-surface)',
        'fire-line': 'var(--fire-line)',
        'fire-muted': 'var(--fire-muted)',
        'fire-mint': 'var(--fire-mint)'
      },
      fontFamily: {
        sans: ['var(--font-ui)', 'Pretendard', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['var(--font-mono)', 'IBM Plex Mono', 'monospace'],
      }
    },
  },
  plugins: [],
};
