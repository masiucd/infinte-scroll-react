<script lang="ts">
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

	export let newPrio: TaskStatus
	export let newTitle: string
	export let toggleEdit: () => void
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
