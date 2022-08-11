module.exports = {
	root: true,
	parser: "@typescript-eslint/parser",
	extends: [
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended",
		"prettier",
		"plugin:sort/recommended",
	],
	plugins: ["svelte3", "@typescript-eslint", "simple-import-sort", "import"],
	ignorePatterns: ["*.cjs"],
	overrides: [{files: ["*.svelte"], processor: "svelte3/svelte3"}],
	settings: {
		"svelte3/typescript": () => require("typescript"),
	},
	rules: {
		"simple-import-sort/imports": "error",
		"simple-import-sort/exports": "error",
		"import/first": "error",
		"import/newline-after-import": "error",
		"import/no-duplicates": "error",
	},
	parserOptions: {
		sourceType: "module",
		ecmaVersion: 2020,
	},
	env: {
		browser: true,
		es2017: true,
		node: true,
	},
}
