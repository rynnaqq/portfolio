/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        oled: '#08080A',
        surface: {
          50: '#1a1a22',
          100: '#16161c',
          200: '#121216',
          300: '#0e0e12',
          card: '#121216',
          elevated: '#17171d',
        },
        neon: {
          lime: '#CCFF00',
          cyan: '#00F0FF',
          purple: '#7928CA',
          blue: '#0070F3',
          pink: '#FF007A',
        },
        border: {
          subtle: 'rgba(255, 255, 255, 0.08)',
          glow: 'rgba(204, 255, 0, 0.3)',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Syne', 'Space Grotesk', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        'neon-lime': '0 0 25px rgba(204, 255, 0, 0.35)',
        'neon-lime-lg': '0 0 50px rgba(204, 255, 0, 0.5)',
        'neon-purple': '0 0 35px rgba(121, 40, 202, 0.4)',
        'neon-blue': '0 0 35px rgba(0, 112, 243, 0.4)',
        'glow-card': '0 10px 30px -10px rgba(0,0,0,0.8), 0 0 1px 1px rgba(255,255,255,0.08)',
        'glow-card-hover': '0 20px 40px -15px rgba(0,0,0,0.9), 0 0 15px rgba(204,255,0,0.2), 0 0 1px 1px rgba(204,255,0,0.4)',
      },
      animation: {
        'spin-slow': 'spin 20s linear infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'strobe': 'strobe 2s steps(2, start) infinite',
        'marquee': 'marquee 25s linear infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        strobe: {
          '0%': { opacity: '1' },
          '50%': { opacity: '0.2' },
          '100%': { opacity: '1' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      }
    },
  },
  plugins: [],
}
