import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))"
      },
      animation: {
        'fade-up': 'fade-up 0.6s ease-out both',
        'scale-in-center': 'scale-in-center 0.6s cubic-bezier(0.250, 0.460, 0.450, 0.940) both'
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
      },
    },
  },
  plugins: [],
};

export default config;



