/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: "class",
	content: ["./src/**/*.{html,js,svelte,ts}"],
	theme: {
		extend: {
			backgroundImage: {
				wave: "url('/wave.svg')",
				shapes: "url('/shapes.svg')",
			},
		},
	},
	plugins: [require("@tailwindcss/typography")],
}
