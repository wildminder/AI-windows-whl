/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.tsx",
    "./src/**/*.ts",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#0a0a0f',
          light: '#12121a',
        },
        surface: {
          DEFAULT: '#151520',
          light: '#1e1e2e',
          lighter: '#2a2a3c',
        },
        primary: {
          DEFAULT: '#00f0ff',
          dark: '#00c4cc',
          light: '#5cfffc',
        },
        secondary: {
          DEFAULT: '#ff00a0',
          dark: '#cc0078',
          light: '#ff4db8',
        },
        accent: {
          cyan: '#00f0ff',
          magenta: '#ff00a0',
          yellow: '#f0e800',
          green: '#00ff88',
        },
        text: {
          primary: '#ffffff',
          secondary: '#a0a0b0',
          muted: '#6a6a7a',
        },
        border: {
          DEFAULT: 'rgba(0, 240, 255, 0.2)',
          strong: 'rgba(0, 240, 255, 0.4)',
        },
      },
      fontFamily: {
        display: ['Orbitron', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        body: ['Rajdhani', 'sans-serif'],
      },
      fontSize: {
        '2xs': '0.625rem',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
        'scanline': 'scanline 8s linear infinite',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(0, 240, 255, 0.5)' },
          '100%': { boxShadow: '0 0 20px rgba(0, 240, 255, 0.8), 0 0 40px rgba(0, 240, 255, 0.4)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
