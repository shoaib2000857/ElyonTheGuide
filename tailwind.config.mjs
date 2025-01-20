/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Enable dark mode
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#4CAF50",  // For buttons and highlights
        secondary: "#FF4081", // For accent colors
        darkBackground: "#1c1c1c", // Dark background for better contrast
        lightBackground: "#fafafa", // Light background for light mode
      },
      fontFamily: {
        sans: ['Geist', 'Arial', 'Helvetica', 'sans-serif'],
        mono: ['Geist Mono', 'monospace'],
      },
    },
  },
  plugins: [],
};