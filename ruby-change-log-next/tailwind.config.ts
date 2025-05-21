export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        ruby: {
          DEFAULT: '#dc2626',
          dark: '#991b1b',
          light: '#fef2f2',
        },
        slate: {
          900: '#1e293b',
          800: '#334155',
          700: '#475569',
        },
        rose: {
          600: '#f43f5e',
        },
      },
      borderRadius: {
        'xl': '1.5rem',
        '2xl': '2rem',
      },
      boxShadow: {
        'strong': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'inner-strong': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      },
    },
  },
}; 