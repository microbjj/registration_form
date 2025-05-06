import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"
import eslint from "vite-plugin-eslint"
import tailwindcss from "@tailwindcss/vite"

export default defineConfig({
    plugins: [
        react(),
        eslint({
            include: ["src/**/*.{js,jsx,ts,tsx}"],
            exclude: ["node_modules", "dist"],
            cache: true,
        }),
        tailwindcss(),
    ],
})
