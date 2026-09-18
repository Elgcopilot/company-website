/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // ELG Clean-Tech palette (Brand.md §2) — monochrome + signature orange.
        brand: {
          white: '#FFFFFF',
          paper: '#FAFAFA',
          mist: '#F4F4F6',
          line: '#E5E7EB',
          mute: '#D1D5DB',
          ink: '#111111',
          coal: '#09090B',
          orange: '#F28A22',
          ember: '#EA580C',
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
