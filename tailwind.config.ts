import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#EDE8DF',
        foreground: '#1C1C1A',
        cream: {
          50: '#F5F1EA',
          100: '#EDE8DF',
          200: '#D4CFC7',
          300: '#B8B3AB',
          400: '#8A8580',
          500: '#6B6661',
        },
      },
    },
  },
  plugins: [],
};
export default config;
