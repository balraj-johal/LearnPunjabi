module.exports = {
    content: [
        "./src/**/*.{js, jsx, ts, tsx}",
        './public/index.html'
    ],
    theme: {
        extend: {
            colors: {
                primary: "#00A2FF",
                secondary: "#007EC7",
                gold: "#FFD700"
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
                },
                'shake-x': {
                    '0%' : { transform: 'translateX(0px)' },
                    '17%' : { transform: 'translateX(-7.5px)' },
                    '34%' : { transform: 'translateX(7.5px)' },
                    '50%' : { transform: 'translateX(-7.5px)' },
                    '66%' : { transform: 'translateX(7.5px)' },
                    '84%' : { transform: 'translateX(-4px)' },
                    '100%' : { transform: 'translateX(0px)' }
                },
                'bounce-y': {
                    '0%' : { transform: 'translateY(0px)' },
                    '20%' : { transform: 'translateY(-12.5px)' },
                    '40%' : { transform: 'translateY(0px)' },
                    '60%' : { transform: 'translateY(-5px)' },
                    '80%' : { transform: 'translateY(0px)' },
                }
            },
            animation: {
                'fade-in': 'fade-in 150ms forwards ease-in-out',
                'move-down': 'move-down 200ms forwards ease-in-out',
                'move-up': 'move-up 200ms forwards ease-in-out',
                'shake-x': 'shake-x 600ms forwards ease-out',
                'bounce-y': 'bounce-y 600ms forwards ease-out',
            }
        },
    },
    plugins: [],
}
