/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Colors come from the CSS variables in globals.css so they switch with the theme
      colors: {
        sky: 'var(--sky)',
        card: 'var(--card)',
        glass: 'var(--glass)',
        ink: 'var(--ink)',
        'ink-soft': 'var(--ink-soft)',
        muted: 'var(--muted)',
        edge: 'var(--edge)',
        shade: 'var(--shadow)',
        tile: 'var(--tile)',
        chip: 'var(--chip)',
        track: 'var(--track)',
        accent: 'var(--accent)',
        accent2: 'var(--accent2)',
      },
      // Hard offset shadows for the cut-paper look
      boxShadow: {
        'paper-sm': '0 3px 0 var(--shadow)',
        paper: '0 4px 0 var(--shadow)',
        'paper-lg': '0 8px 0 var(--shadow)',
      },
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        sans: ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
      screens: {
        // Wide enough for the episode card and the seen list side by side
        wide: '960px',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}
