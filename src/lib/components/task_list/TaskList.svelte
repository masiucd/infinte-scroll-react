<script lang="ts">
	import type {ListType, Task} from "$lib/util/task"
	import {twMerge} from "tailwind-merge"
	import Checkbox from "../common/Checkbox.svelte"
	export let tasks: Task[]
	export let type: ListType
	export let removeTask: (id: string, type: ListType) => boolean
	export let toggleDone: (
		id: string,
		type: ListType
	) => (done: boolean) => boolean
	const onChange = (id: string, type: ListType) => toggleDone(id, type)
</script>

<ul
	class={twMerge(
		" p-1 rounded-sm shadow",
		type === "completed" ? "bg-slate-400" : "bg-blue-400"
	)}
>
	{#if tasks.length === 0 && type === "uncompleted"}
		<li class="px-1 py-2">Uncompleted tasks are empty</li>
	{:else if tasks.length === 0 && type === "completed"}
		<li class="px-1 py-2">Completed tasks are empty</li>
	{:else}
		{#each tasks as { title, done, id }}
			<li class="flex gap-2 items-center px-1 py-2">
				<Checkbox
					label={title}
					checked={done}
					wapperStyles="mb-0"
					onChange={onChange(id, type)}
				/>
				<button
					class="bg-transparent  inline-block p-0 m-0 hover:bg-transparent hover:text-red-500"
					on:click={() => removeTask(id, type)}>X</button
				>
			</li>
		{/each}
	{/if}
</ul>
