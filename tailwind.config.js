/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],

  theme: {
    fontFamily: {
      'body': ['Poppins', 'sans-serif'],
    },
    colors: {
      transparent: 'transparent',
      'orange-dark': '#E76F51',
      'purple': '#614dca',
      'white': '#fff',
      'light-dark': '#f1f1f1'
    },
  },
  plugins: [],
};
