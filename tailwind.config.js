/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#2A1116',      // near-black wine — body text, high contrast on parchment
        paper: '#F7F1E6',    // warm parchment background
        paper2: '#EFE4D2',   // slightly deeper parchment for panels
        rust: '#A8461F',     // sold-out / alert accent
        wine: '#5C212D',     // brand primary — restaurant name, category emphasis
        wineDeep: '#3D1620', // hover / pressed state for wine elements
        wineTint: '#F1E1E1', // pale wine tint for active-tab backgrounds
        gold: '#B4893D',     // secondary accent — prices, fine dividers
        line: '#E1D3C4',     // hairline borders on parchment
      },
      fontFamily: {
        display: ['"Fraunces"', 'Georgia', 'serif'],
        body: ['"Inter"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
