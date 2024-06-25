import type { Config } from "tailwindcss";
import plugin from 'tailwindcss/plugin';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}', // ここにプロジェクトのファイルパスを追加
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))"
      },
      animation: {
        'fade-up': 'fade-up 0.6s ease-out both',
        'scale-in-center': 'scale-in-center 1s ease-out both',
        'bounce': 'bounce 2s infinite' // bounceアニメーションの追加
      },
      keyframes: {
        'fade-up': {
          '0%': { transform: 'translateY(50px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1'},
        },
        'scale-in-center': {
          '0%': { transform: 'scaleX(0.5)', opacity: '0'},
          '100%': { transform: 'scale(1)', opacity: '1'},
        },
        'bounce': { // bounceアニメーションの定義
          '0%, 100%': {
            transform: 'translateY(0)',
          },
          '50%': {
            transform: 'translateY(-10px)',
          }
        }
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        '@media print': {
          '.no-print': {
            display: 'none !important',
          },
        },
      });
    })
  ],
};

export default config;
