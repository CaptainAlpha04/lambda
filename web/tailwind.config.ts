import type { Config } from "tailwindcss";

export default {
content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
],
	theme: {
    	extend: {}, // Extend default theme here
	},
	plugins: [
    	require('daisyui'),
	],
	daisyui: {
    	themes: ["light", "dark"],
		darkTheme: "light",
		theme: false,
	}
} satisfies Config;
