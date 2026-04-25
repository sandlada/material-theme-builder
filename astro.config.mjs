// @ts-check
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
    site: "https://material-theme-builder.sandlada.com",
    base: '/',
    trailingSlash: 'always',
    output: "static",
    devToolbar: { enabled: false },
    vite: {
        plugins: [tailwindcss(), sitemap()],
    },
})
