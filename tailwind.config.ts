import type { Config } from "tailwindcss";
import colors from 'tailwindcss/colors';

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ], theme: {
    extend: {
      colors: {
        primary: '#66b5ff',
        secondary: 'rgb(var(--secondary) / <alpha-value>)',
        background: 'rgb(var(--background) / <alpha-value>)',
        subbackground: 'rgb(var(--subbackground) / <alpha-value>)',
        simple: 'rgb(var(--simple) / <alpha-value>)',
        error: colors.red[600]
      },
      keyframes: {
        fadein: {
          '0%': { opacity: '0' }, '100%': { opacity: '1' },
        },
        fadeout: {
          '0%': { opacity: '1' }, '100%': { opacity: '0' },
        },
        dialogFadein: {
          '0%': { transform: 'translateY(-50px)' }, '100%': { transform: 'translateY(0)' },
        },
        dialogFadeout: {
          '0%': { transform: 'translateY(0)' }, '100%': { transform: 'translateY(-50px)' },
        }
      },
      animation: {
        fadein: 'fadein 0.25s ease-in-out',
        fadeout: 'fadeout 0.25s ease-in-out',
        dialogFadein: 'dialogFadein 0.25s ease-in-out',
        dialogFadeout: 'dialogFadeout 0.25s ease-in-out',
      }
    },
  },
  darkMode: ['selector'],
  plugins: [],
};

export default config;