<script lang="ts">
	import type {ListType, Task} from "$lib/util/task"
	import {twMerge} from "tailwind-merge"
	import Item from "./Item.svelte"
	export let tasks: Task[]
	export let type: ListType
	export let removeTask: (id: string, type: ListType) => boolean
	export let toggleDone: (
		id: string,
		type: ListType
	) => (done: boolean) => boolean
	export let editTodo: (
		id: string,
		fields: Pick<Task, "title" | "priority">,
		type: ListType
	) => boolean
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
		{#each tasks as task (task.id)}
			<Item {removeTask} {toggleDone} {task} {type} {editTodo} />
		{/each}
	{/if}
</ul>
