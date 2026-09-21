/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // ELG reference palette: warm paper, carbon and one signal orange.
        brand: {
          white: '#FFFFFF',
          paper: '#F4F2EC',
          mist: '#FAF9F5',
          line: '#D5D1C7',
          mute: '#C9C5BC',
          ink: '#11110F',
          coal: '#11110F',
          orange: '#D95F16',
          ember: '#A8420B',
        },
      },
      fontFamily: {
        // Neo-grotesque display + clean body + mono for engineering metrics.
        sans: ['"Inter Variable"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono Variable"', '"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        // Apple/Google standard: 8–14px (Brand.md §2).
        md: '8px',
        lg: '12px',
        xl: '14px',
      },
      transitionTimingFunction: {
        // Apple-standard ease-out for all micro-interactions (Brand.md §3).
        crisp: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};
