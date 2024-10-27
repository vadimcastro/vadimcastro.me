/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
      extend: {
        fontFamily: {
          sans: ['var(--font-inter)'],
          mono: ['var(--font-roboto-mono)'],
        },
        colors: {
          mint: {
            50: '#f2f9f6',
            100: '#e6f3ed',
            200: '#bfe0d2',
            300: '#99cdb7',
            400: '#4da682',
            500: '#00834d',
            600: '#007645',
            700: '#006239',
            800: '#004f2e',
            900: '#004025',
          },
        },
        fontFamily: {
          zilla: ['var(--font-zilla-slab)', 'serif'],
        },
      },
    },
    plugins: [],
  }