/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary)',
        'primary-soft': 'var(--primary-soft)',
        surface: 'var(--surface)',
        canvas: 'var(--canvas)',
        sidebar: 'var(--sidebar)',
        line: 'var(--line)',
        'line-soft': 'var(--line-soft)',
        txt: 'var(--text)',
        muted: 'var(--muted)',
        'muted-strong': 'var(--muted-strong)',
        success: 'var(--success)',
        danger: 'var(--danger)',
        warning: 'var(--warning)',
      },
      boxShadow: {
        panel: 'var(--shadow)',
      },
      borderRadius: {
        card: '8px',
        btn: '6px',
        input: '4px',
        modal: '10px',
      },
    },
  },
  plugins: [],
}
