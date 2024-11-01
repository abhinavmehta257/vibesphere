/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#F7EBFF",
        purple: "#5F489D",
        "light-purple": "#998BBF",
        "dark-text": "#333333",
        pink: "#E677BE",
        blue: "#649CD4",
      },
    },
  },
  plugins: [],
};
