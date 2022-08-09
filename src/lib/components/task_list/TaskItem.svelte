<script lang="ts">
	import type {ListType, Task} from "$lib/util/task"

	import Checkbox from "../common/Checkbox.svelte"

	export let task: Task
	export let type: ListType

	export let removeTask: (id: string, type: ListType) => boolean
	export let toggleDone: (
		id: string,
		type: ListType
	) => (done: boolean) => boolean

	let isEditOpen = false
	const toggleEdit = () => {
		isEditOpen = !isEditOpen
	}
	const onChange = (id: string, type: ListType) => toggleDone(id, type)
	const {title, done, id} = task
</script>

<li>
	<div class="flex gap-2 items-center px-1 py-2 justify-between">
		<Checkbox
			label={title}
			checked={done}
			wapperStyles="mb-0"
			onChange={onChange(id, type)}
		/>
		<div class="mr-3">
			<button
				class="bg-transparent inline-block p-0 m-0 hover:bg-transparent hover:text-orange-500 text-slate-900"
				on:click={toggleEdit}>Edit</button
			>
			<button
				class="bg-transparent  inline-block p-0 m-0 hover:bg-transparent hover:text-red-500 text-slate-900"
				on:click={() => {
					removeTask(id, type)
				}}>X</button
			>
		</div>
	</div>
	{#if isEditOpen}
		<input
			type="text"
			id="add_task"
			placeholder={`Edit ${title.slice(0.15)}...`}
			class="w-full  outline-none shadow h-10"
		/>
	{/if}
</li>
