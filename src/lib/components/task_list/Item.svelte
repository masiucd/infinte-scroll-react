<script lang="ts">
	import {
		staticTaskStatus as TaskStatuses,
		TaskStatus,
		type ListType,
		type Task,
	} from "$lib/util/task"
	import ButtonDefault from "../common/ButtonDefault.svelte"
	import Checkbox from "../common/Checkbox.svelte"

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

	const foo = TaskStatuses.find((p) => p === newPrio)
	$: {
		console.log(newPrio, foo, TaskStatuses)
	}
</script>

<li>
	<div class="flex gap-2 items-center px-1 py-2 justify-between">
		<Checkbox
			label={task.title}
			checked={task.done}
			wapperStyles="mb-0"
			onChange={onChange(task.id, type)}
		/>
		<div class="mr-3 flex gap-5">
			<button
				class="bg-transparent inline-block p-0 m-0 hover:bg-transparent hover:text-orange-500 text-slate-900"
				on:click={toggleEdit}
				>✎ {isEditOpen ? "⬆" : "⬇"}
			</button>
			<button
				class="bg-transparent  inline-block p-0 m-0 hover:bg-transparent hover:text-red-500 text-slate-900"
				on:click={() => {
					removeTask(task.id, type)
				}}>X</button
			>
		</div>
	</div>
	{#if isEditOpen}
		<div
			class="flex justify-between items-center my-2 pb-2 border-b-2 border-blue-300 "
		>
			<div class="flex justify-between items-center gap-1">
				<input
					type="text"
					bind:value={newTitle}
					placeholder={`Edit ${task.title.slice(0, 10)}...`}
					class="w-full outline-none shadow h-8"
				/>
			</div>
			<ul class="flex gap-2 itemx-center">
				{#each TaskStatuses as status, i}
					<li>
						<ButtonDefault
							styles={`${
								TaskStatuses.indexOf(newPrio) === i
									? "bg-orange-500 text-white p-1"
									: ""
							} p-[2px] `}
							onClick={() => {
								newPrio = status
							}}><span>{status}</span></ButtonDefault
						>
					</li>
				{/each}
			</ul>
			<ButtonDefault
				styles="border border-blue-300 p-1 bg-slate-100 hover:bg-slate-50"
				onClick={() => {
					editTodo(
						task.id,
						{
							title: newTitle.length > 0 ? newTitle : task.title,
							priority: newPrio,
						},
						type
					)
					toggleEdit()
				}}>Confirm</ButtonDefault
			>
		</div>
	{/if}
</li>
