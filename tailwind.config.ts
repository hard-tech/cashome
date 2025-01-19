const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary50: "#E1F5FE",
        primary100: "#B3E5FC",
        primary200: "#81D4FA",
        primary300: "#4FC3F7",
        primary400: "#29B6F6",
        primary500: "#03A9F4",
        primary600: "#039BE5",
        primary700: "#0288D1",
        primary800: "#0277BD",
        primary900: "#01579B",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui({
    themes: {
      light: {
        colors: {
          // default: "#E1F5FE",
          primary: "#2563eb",
          secondary: "#0288D1",
        },
      },
      dark: {
        colors: {
          // default: "#1A1A1A",
          primary: "#2563eb",
          secondary: "#0288D1",
          // background: "#1A1A1A",
        },
      },
    },
  }),],
}
