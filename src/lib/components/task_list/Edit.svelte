<script lang="ts">
	import {getSelectedTaskStatus} from "$lib/util/helpers"

	import {
		staticTaskStatus as TaskStatuses,
		TaskStatus,
		type ListType,
		type Task,
	} from "$lib/util/task"

	import ButtonDefault from "../common/ButtonDefault.svelte"

	export let type: ListType
	export let task: Task

	export let editTodo: (
		id: string,
		fields: Pick<Task, "title" | "priority">,
		type: ListType
	) => boolean

	export let newPrio: TaskStatus | null = null
	export let newTitle: string | null = null
	export let toggleEdit: () => void

	$: enabled = () => {
		if (!newPrio && !newTitle) return false
		return true
	}
	$: selectedStatus = getSelectedTaskStatus
</script>

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
						selectedStatus(newPrio, i, TaskStatuses)
							? "bg-orange-500 text-white p-1"
							: ""
					} p-[2px] text-white`}
					onClick={() => {
						if (newPrio === status) {
							newPrio = null
						} else {
							newPrio = status
						}
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
					title: newTitle !== null ? newTitle : task.title,
					priority: newPrio !== null ? newPrio : task.priority,
				},
				type
			)
			toggleEdit()
		}}
		disabled={!enabled()}>Confirm</ButtonDefault
	>
</div>
