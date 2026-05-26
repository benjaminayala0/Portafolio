/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#3b82f6',
                    glow: '#60a5fa',
                    dark: '#1d4ed8'
                },
                surface: {
                    DEFAULT: '#0d1117',
                    lighter: '#161b22'
                },
                text: {
                    primary: '#c9d1d9',
                    secondary: '#8b949e',
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                mono: ['Fira Code', 'monospace'],
            },
            animation: {
                'draw-path': 'draw 3s ease-in-out forwards',
                'pulse-node': 'pulse-core 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'fade-in': 'fadeIn 1s ease-out forwards',
                'blob': 'blob 10s infinite',
                'spin-slow': 'spin 20s linear infinite',
            },
            keyframes: {
                draw: {
                    '0%': { strokeDasharray: '1000', strokeDashoffset: '1000' },
                    '100%': { strokeDashoffset: '0' },
                },
                'pulse-core': {
                    '0%, 100%': { opacity: '1', transform: 'scale(1)' },
                    '50%': { opacity: '.7', transform: 'scale(1.1)' },
                },
                fadeIn: {
                    '0%': { opacity: '0', transform: 'translateY(10px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                blob: {
                    '0%': { transform: 'translate(0px, 0px) scale(1)' },
                    '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
                    '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
                    '100%': { transform: 'translate(0px, 0px) scale(1)' },
                }
            }
        },
    },
    plugins: [],
}
