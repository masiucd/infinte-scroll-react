/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{html,js,svelte,ts}"],
	theme: {
		extend: {
			backgroundImage: {
				wave: "url('/wave.svg')",
			},
		},
	},
	plugins: [require("@tailwindcss/typography")],
}
