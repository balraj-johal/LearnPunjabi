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
              }
            },
            animation: {
                'fade-in': 'fade-in 200ms forwards ease-in-out',
            }
        },
    },
    plugins: [],
}
