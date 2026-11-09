import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: 'var(--color-navy)',
        'navy-deep': 'var(--color-navy-deep)',
        gold: 'var(--color-gold)',
        'gold-hover': 'var(--color-gold-hover)',
        accent: 'var(--color-accent)',
        surface: 'var(--color-surface)',
        'surface-blue': 'var(--color-surface-blue)',
        body: 'var(--color-body)',
        line: 'var(--color-border)',
      },
      fontFamily: {
        sans: ['var(--font-manrope)', 'Arial', 'sans-serif'],
        heading: ['var(--font-manrope)', 'Arial', 'sans-serif'],
      },
      maxWidth: {
        site: '82rem',
      },
      borderRadius: {
        card: '1rem',
      },
      boxShadow: {
        soft: '0 1px 2px rgba(7, 44, 73, 0.03), 0 12px 32px rgba(7, 44, 73, 0.07)',
        lift: '0 2px 4px rgba(7, 44, 73, 0.04), 0 20px 44px rgba(7, 44, 73, 0.12)',
        header: '0 8px 30px rgba(7, 44, 73, 0.09)',
      },
      transitionTimingFunction: {
        premium: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
