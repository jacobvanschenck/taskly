// @ts-check

import cloudflare from "@astrojs/cloudflare";
import AstroPWA from "@vite-pwa/astro";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
	output: "server",
	adapter: cloudflare(),
	integrations: [
		AstroPWA({
			registerType: "autoUpdate",
			manifest: {
				name: "Taskly",
				short_name: "Taskly",
				description: "A simple task manager.",
				theme_color: "#171717",
				background_color: "#171717",
				display: "standalone",
				start_url: "/",
				icons: [
					{
						src: "/icons/icon-192.png",
						sizes: "192x192",
						type: "image/png",
					},
					{
						src: "/icons/icon-512.png",
						sizes: "512x512",
						type: "image/png",
					},
				],
			},
			workbox: {
				// This is an SSR app, not a client-side router: cache each visited page.
				navigateFallback: null,
				runtimeCaching: [
					{
						urlPattern: ({ request }) => request.mode === "navigate",
						handler: "NetworkFirst",
						options: { cacheName: "pages" },
					},
					{
						urlPattern: /\/api\/tasks(?:\/.*)?$/,
						handler: "NetworkFirst",
						options: { cacheName: "tasks-api" },
					},
				],
			},
		}),
	],
	vite: {
		plugins: [tailwindcss()],
	},
});
