/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                primary: "#1e392a",
                "background-light": "#f8f7f4",
                "background-dark": "#122017",
                "text-light": "#1e392a",
                "text-dark": "#f6f8f7",
                accent: "#51946c",
                "border-light": "#e5e7eb",
                "border-dark": "#2a3c32",
            },
            fontFamily: {
                display: ["Playfair Display", "serif"],
                sans: ["Work Sans", "Noto Sans", "sans-serif"],
            },
            borderRadius: {
                DEFAULT: "0.25rem",
                lg: "0.5rem",
                xl: "0.75rem",
                full: "9999px",
            },
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
        require('@tailwindcss/container-queries'),
    ],
}
