<script lang="ts">
	import type {ListType} from "$lib/util/task"

	import {twMerge} from "tailwind-merge"

	export let label: string
	export let checked: boolean = false
	export let wapperStyles: string = ""
	export let inputStyles: string = ""
	export let labelStyles: string = ""
	export let onChange: (done: boolean) => boolean
</script>

<div class={twMerge("flex items-center mb-4", wapperStyles)}>
	<input
		id="default-checkbox"
		type="checkbox"
		bind:checked
		on:change={(e) => {
			const {target} = e
			if (target) {
				// @ts-ignore
				// TODO fix type
				onChange(target.checked)
			}
		}}
		class={twMerge(
			"w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-400 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600",
			inputStyles
		)}
	/>
	<label
		for="default-checkbox"
		class={twMerge(
			"ml-2 text-sm font-medium text-gray-900 dark:text-gray-300",
			labelStyles
		)}>{label}</label
	>
</div>
