// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	components: ["~/components"],
	modules: ["@nuxt/ui"],
	colorMode: {
		preference: "light",
	},
	devtools: { enabled: true },
});
