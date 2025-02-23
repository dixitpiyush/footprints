/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');
const defaultTheme = require('tailwindcss/defaultTheme');

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          DEFAULT: colors.fuchsia[950],
          primary: colors.slate[50],
          secondary: colors.slate[300],
          tertiary: colors.slate[400],
          card: colors.fuchsia[400],
          title: colors.slate[50],
          description: colors.slate[400],
          info: colors.slate[500],
        },
        light: {
          DEFAULT: colors.fuchsia[50],
          primary: colors.slate[900],
          secondary: colors.slate[600],
          tertiary: colors.slate[500],
          title: colors.slate[900],
          description: colors.slate[700],
          info: colors.slate[500],
        },
        'light-theme-background': '#fae9b1',
        'light-theme-foreground': '#f1c237',
        'dark-theme-background': '#092e40',
        'dark-theme-foreground': '#25a5e3',
      },
      fontFamily: {
        sans: ['Poppins', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
