module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'split': "linear-gradient(to bottom, #0C1831 0% , #0C1831 400px , #ECF2FF 0, #ECF2FF 100%)"
      },
      screens: {
        ss: '350px',
        sm: '480px',
        md: '768px',
        lg: '976px',
        xl: '1440px',
      },
    },
  },
  plugins: [],
}
