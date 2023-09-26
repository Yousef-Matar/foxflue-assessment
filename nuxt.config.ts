// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	components: ["~/components"],
	modules: ["@nuxt/ui", "nuxt3-leaflet"],
	colorMode: {
		preference: "light",
	},
	devtools: { enabled: false },
});
