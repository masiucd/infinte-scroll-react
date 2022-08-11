<script lang="ts">
	import {twMerge} from "tailwind-merge"
	export let styles: string = ""
	export let onClick: () => void
	export let disabled = false
</script>

<button
	type="button"
	on:click={onClick}
	{disabled}
	class={twMerge(
		"bg-transparent  inline-block p-0 m-0 hover:bg-transparent hover:text-orange-500 text-slate-900 disabled:opacity-50 disabled:cursor-not-allowed",
		styles
	)}
>
	<slot />
</button>
