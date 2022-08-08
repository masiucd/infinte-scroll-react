<script lang="ts">
	type ListType = "unompleted" | "completed"
	import type {Task} from "$lib/util/task"
	import {twMerge} from "tailwind-merge"
	import Checkbox from "../common/Checkbox.svelte"
	export let tasks: Task[]

	export let type: ListType
</script>

<ul
	class={twMerge(
		"min-h-[5rem] p-1 rounded-sm shadow",
		type === "completed" ? "bg-slate-400" : "bg-blue-400"
	)}
>
	{#if tasks.length === 0 && type === "unompleted"}
		<li>Uncompleted tasks are empty</li>
	{:else if tasks.length === 0 && type === "completed"}
		<li>Completed tasks are empty</li>
	{:else}
		{#each tasks as { title }}
			<li class="flex gap-2">
				<p>{title}</p>
				<Checkbox label="foo" />
			</li>
		{/each}
	{/if}
</ul>
