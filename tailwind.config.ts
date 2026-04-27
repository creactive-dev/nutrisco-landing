import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        sandia: '#E94555',
        celeste: '#73C3E4',
        crema: '#FAFAF8',
        carbon: '#0E2233',
        'gray-mid': '#6B7280',
        'surface-low': '#f4f4f2',
        'surface-high': '#e8e8e6',
        'isapre-bg': '#EAF6EE',
        'isapre-border': '#22C55E',
        'dark-card': '#0F2535',
        'dark-section': '#0C1E2E',
      },
      fontFamily: {
        display: ['var(--font-montserrat)', 'system-ui', 'sans-serif'],
        body: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        display: ['2.5rem', { lineHeight: '1.15', fontWeight: '700' }],
        'display-sm': ['2rem', { lineHeight: '1.2', fontWeight: '700' }],
        editorial: ['1.5rem', { lineHeight: '1.3', fontWeight: '700' }],
      },
      borderRadius: {
        card: '1.5rem',
        btn: '0.75rem',
      },
      boxShadow: {
        card: '0 8px 30px rgba(0,0,0,0.04)',
        'card-hover': '0 12px 40px rgba(0,0,0,0.08)',
        btn: '0 4px 12px rgba(233,69,85,0.25)',
        ambient: '0 12px 32px -4px rgba(26,28,27,0.06)',
      },
      animation: {
        pulse: 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.6s ease forwards',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          'from': { backgroundPosition: '200% 0' },
          'to': { backgroundPosition: '-200% 0' },
        },
      },
      backgroundImage: {
        'warm-mesh':
          'radial-gradient(ellipse 80% 60% at 20% 40%, rgba(233,69,85,0.06) 0%, transparent 60%), radial-gradient(ellipse 60% 80% at 80% 60%, rgba(115,195,228,0.04) 0%, transparent 60%)',
        'sandia-gradient':
          'linear-gradient(135deg, #E94555 0%, #c73444 100%)',
      },
    },
  },
  plugins: [],
}

export default config
