/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#FDFDFD',
        primary: '#0A0909',
        secondary: '#707070',
        darkBrown: '#5E3A30',
        warmBeige: '#CEB3A6',
        accent: {
          DEFAULT: '#9C6455',
          dark: '#7e4e42',
          light: '#b67a6b',
          muted: 'rgba(156, 100, 85, 0.1)'
        },
        stone: {
          50: '#FAF9F8',
          100: '#F5F3F1',
          200: '#EAE6E3',
          300: '#D8D2CD',
          400: '#A9A29C',
          500: '#78716C',
          600: '#57534E',
          700: '#44403C',
          800: '#292524',
          900: '#1C1917'
        }
      },
      fontFamily: {
        syne: ['Syne', 'sans-serif'],
        display: ['Syne', 'Plus Jakarta Sans', 'sans-serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        editorial: ['Cabinet Grotesk', 'Plus Jakarta Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace']
      },
      letterSpacing: {
        tighter: '-0.04em',
        tight: '-0.02em',
        widest: '0.15em'
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'marquee': 'marquee 25s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' }
        }
      }
    },
  },
  plugins: [],
}
