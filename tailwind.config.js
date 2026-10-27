/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#09090B',
        charcoal: '#121216',
        surface: {
          DEFAULT: '#121216',
          elevated: '#1A1A20',
          hover: '#22222B'
        },
        gold: {
          DEFAULT: '#F5C76A',
          festive: '#F5C76A',
          antique: '#C99735',
          light: '#FCE6B2',
          dark: '#9E7422'
        },
        saffron: {
          DEFAULT: '#FF7A18',
          hover: '#E56605',
          light: '#FFA35C'
        },
        diya: {
          amber: '#FFB547',
          glow: '#FFE29A'
        },
        crimson: {
          DEFAULT: '#FF2D55',
          hover: '#E0163E',
          soft: 'rgba(255, 45, 85, 0.15)'
        },
        pure: '#FAFAFA',
        muted: '#A1A1AA',
        subtleBorder: 'rgba(255, 255, 255, 0.10)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Space Grotesk', 'Inter', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      },
      boxShadow: {
        'diya-soft': '0 0 25px -5px rgba(245, 199, 106, 0.25)',
        'diya-intense': '0 0 35px 2px rgba(255, 122, 24, 0.35)',
        'surface-card': '0 10px 30px -10px rgba(0, 0, 0, 0.7)',
        'gold-border': '0 0 0 1px rgba(245, 199, 106, 0.3)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'diya-flicker': 'diyaFlicker 3s ease-in-out infinite alternate',
      },
      keyframes: {
        diyaFlicker: {
          '0%, 100%': { opacity: '0.9', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        }
      }
    },
  },
  plugins: [],
}
