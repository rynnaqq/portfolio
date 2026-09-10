/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: 'var(--color-bg)',
        text: 'var(--color-text)',
        'text-muted': 'var(--color-text-muted)',
        cobalt: 'var(--color-cobalt)',
        tomato: 'var(--color-tomato)',
        butter: 'var(--color-butter)',
        pink: 'var(--color-pink)',
        mint: 'var(--color-mint)',
        'on-accent': 'var(--color-on-accent)',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
