module.exports = {
    // purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    content: [
        "./src/**/*.{js, jsx, ts, tsx}",
        './public/index.html'
    ],
    theme: {
        extend: {
            colors: {
                primary: "#00A2FF",
                primary2: "#007EC7",
            },
            keyframes: {
                'fade-in': {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                'move-down': {
                    '0%': { transform: 'translate(0, -7.5rem)' },
                    '100%': { transform: 'translate(0, 0)' },
                },
                'move-up': {
                    '0%': { transform: 'translate(0, 0)' },
                    '100%': { transform: 'translate(0, -7.5rem)' },
                }
            },
            animation: {
                'fade-in': 'fade-in 200ms forwards ease-in-out',
                'move-down': 'move-down 200ms forwards ease-in-out',
                'move-up': 'move-up 200ms forwards ease-in-out',
            }
        },
    },
    plugins: [],
}
