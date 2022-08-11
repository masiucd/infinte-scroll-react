<script lang="ts">
	import type {ListType, Task, TaskStatus} from "$lib/util/task"

	import ButtonDefault from "../common/ButtonDefault.svelte"
	import Checkbox from "../common/Checkbox.svelte"
	import Edit from "./Edit.svelte"

	export let type: ListType
	export let task: Task
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

	let newPrio: TaskStatus
	let newTitle: string

	let isEditOpen = false
	const toggleEdit = () => {
		isEditOpen = !isEditOpen
	}
	const onChange = (id: string, type: ListType) => toggleDone(id, type)
</script>

<li>
	<div class="flex gap-2 items-center px-1 py-2 justify-between">
		<Checkbox
			label={task.title}
			checked={task.done}
			wapperStyles="mb-0"
			onChange={onChange(task.id, type)}
			labelStyles="text-white"
		/>
		<div class="mr-3 flex gap-5">
			<button
				class="bg-transparent inline-block p-0 m-0 hover:bg-transparent hover:text-orange-500 text-slate-900"
				on:click={toggleEdit}
				><span class="mr-1">✏️</span> <span>{isEditOpen ? "⬆" : "⬇"}</span>
			</button>
			<button
				class="bg-transparent  inline-block p-0 m-0 hover:bg-transparent hover:text-orange-400 text-orange-100 text-lg"
				on:click={() => {
					removeTask(task.id, type)
				}}>X</button
			>
		</div>
	</div>
	{#if isEditOpen}
		<Edit {newPrio} {newTitle} {toggleEdit} {editTodo} {type} {task} />
	{/if}
</li>
