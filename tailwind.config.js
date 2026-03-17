/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            height: {
                'dvh': '100dvh', // Dynamic Viewport Height for iPad
            }
        },
    },
    plugins: [],
}