/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#22321F',      // deep pine ink — headings, primary text
        paper: '#F7F2E7',    // warm parchment background
        paper2: '#EFE7D4',   // slightly deeper parchment for panels
        rust: '#A8461F',     // sold-out / alert accent
        gold: '#B4893D',     // dividers, prices, active states
        line: '#D8CDB2',     // hairline borders on parchment
      },
      fontFamily: {
        display: ['"Fraunces"', 'Georgia', 'serif'],
        body: ['"Inter"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
