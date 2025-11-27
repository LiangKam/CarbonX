/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        carbon: {
          50: '#f6f7f9',
          100: '#edeff2',
          200: '#dbe0e6',
          300: '#bdc6d3',
          400: '#9aa6bc',
          500: '#7d8ba8',
          600: '#637190',
          700: '#515c75',
          800: '#454e61',
          900: '#3b4251',
          950: '#1a1d26',
        },
        neon: {
          400: '#22d3ee',
          500: '#06b6d4',
        }
      },
      backgroundImage: {
        'carbon-pattern': "url('data:image/svg+xml,%3Csvg width=\\'20\\' height=\\'20\\' viewBox=\\'0 0 20 20\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cg fill=\\'%23262626\\' fill-opacity=\\'0.4\\' fill-rule=\\'evenodd\\'%3E%3Ccircle cx=\\'3\\' cy=\\'3\\' r=\\'3\\'/%3E%3Ccircle cx=\\'13\\' cy=\\'13\\' r=\\'3\\'/%3E%3C/g%3E%3C/svg%3E')",
      }
    },
  },
  plugins: [],
}