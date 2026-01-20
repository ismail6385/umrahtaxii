/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {
            colors: {
                gold: {
                    DEFAULT: '#D4AF37',
                    light: '#F4E5B0',
                    dark: '#AA8C2C',
                },
                black: {
                    DEFAULT: '#0A0A0A',
                    rich: '#0A0A0A',
                    light: '#1A1A1A',
                },
                emerald: {
                    DEFAULT: '#10B981',
                    dark: '#059669',
                }
            },
            fontFamily: {
                heading: ['Outfit', 'sans-serif'],
                sans: ['Inter', 'system-ui', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
