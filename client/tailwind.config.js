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
        },
    },
    plugins: [],
}
