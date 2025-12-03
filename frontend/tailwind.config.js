/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#2F855A', // Green-700
                secondary: '#F6E05E', // Yellow-400
                accent: '#48BB78', // Green-500
                dark: '#1A202C', // Gray-900
                light: '#F7FAFC', // Gray-50
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
