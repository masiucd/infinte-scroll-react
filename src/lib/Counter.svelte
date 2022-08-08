<script lang="ts">
	import {fade, scale} from "svelte/transition"
	let count = 0
	let show = false
</script>

<button
	on:click={() => {
		count += 1
	}}>increment</button
>
<h1
	on:click={() => {
		show = !show
	}}
>
	{count}
</h1>
{#if show}
	<button
		in:scale
		out:fade
		class="disabled:bg-red-300"
		disabled={count === 0}
		on:click={() => {
			count -= 1
		}}>increment</button
	>
{/if}
