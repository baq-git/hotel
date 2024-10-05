import daisyui from 'daisyui';
import tailwindcssTypo from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./resources/**/*.edge', './resources/**/*.{js,ts,jsx,tsx,vue}'],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: ['lofi'],
  },
  plugins: [tailwindcssTypo, daisyui],
};
