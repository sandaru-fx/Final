/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
            },
            colors: {
                // Primary brand colors
                primary: {
                    DEFAULT: '#f59e0b', // Amber-500
                    hover: '#d97706',   // Amber-600
                },
                secondary: {
                    DEFAULT: '#ec4899', // Pink-500
                    hover: '#db2777',   // Pink-600
                },

                // Background colors
                'background-light': '#faf8f6',
                'background-dark': '#1b140d',

                // Surface colors
                'surface-light': '#ffffff',
                'surface-dark': '#2b2117',

                // Text colors
                'text-main': '#1b140d',
                'text-muted': '#78716c',

                // Border colors
                'border': '#e7e5e4',

                // Input colors
                'input-bg': '#f5f5f4',
            },
            boxShadow: {
                'soft': '0 2px 8px rgba(0, 0, 0, 0.04)',
                'medium': '0 4px 16px rgba(0, 0, 0, 0.08)',
            },
        },
    },
    plugins: [],
}
