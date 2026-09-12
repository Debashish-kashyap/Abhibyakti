/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors - Expression Blue system
        primary: {
          DEFAULT: '#3B82F6', // Expression Blue
          50: '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#3B82F6', // Main Expression Blue
          600: '#2563EB',
          700: '#1D4ED8',
          800: '#1E40AF',
          900: '#1E3A8A',
        },
        // Secondary Colors - Growth Green system
        secondary: {
          DEFAULT: '#22C55E', // Growth Green
          50: '#F0FDF4',
          100: '#DCFCE7',
          200: '#BBF7D0',
          300: '#86EFAC',
          400: '#4ADE80',
          500: '#22C55E', // Main Growth Green
          600: '#16A34A',
          700: '#15803D',
          800: '#166534',
          900: '#14532D',
        },
        // Surface Colors
        surface: {
          'canvas-white': '#F9FAFB', // Main page backgrounds
          'soft-paper': '#FFFFFF',   // Card backgrounds, containers
          'quiet-mist': '#F1F5F9',   // Section dividers, footers
        },
        // Semantic Colors
        semantic: {
          success: '#22C55E',    // Growth Green for success states
          warning: '#F59E0B',    // Amber for warnings
          error: '#EF4444',      // Red for errors
          info: '#3B82F6',       // Expression Blue for info
        },
        // Accent Colors for cultural expression
        accent: {
          'cultural-pink': '#EC4899',
          'creative-purple': '#8B5CF6',
          'joyful-yellow': '#FBBF24',
        },
        // Neutral colors for text and borders
        neutral: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      },
      boxShadow: {
        'soft': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
        'card': '0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.03)',
      }
    },
  },
  plugins: [],
}