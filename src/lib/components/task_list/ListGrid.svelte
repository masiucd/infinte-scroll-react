<script lang="ts">
	import type {ListType, Task, TaskStatus} from "$lib/util/task"
	import {staticTaskStatus} from "$lib/util/task"
	import ButtonDefault from "../common/ButtonDefault.svelte"
	import FilteredTaskItems from "./FilteredTaskItems.svelte"
	import PrioTasks from "./PrioTasks.svelte"
	import TaskBox from "./TaskBox.svelte"

	export let uncompletedTasks: Task[]
	export let completedTasks: Task[]
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
	$: merged = uncompletedTasks.concat(completedTasks)
</script>

<div class="grid grid-cols-2 items-center gap-4 p-2">
	<TaskBox
		title="Uncompleted"
		type="uncompleted"
		tasks={uncompletedTasks}
		{removeTask}
		{toggleDone}
		{editTodo}
	/>
	<TaskBox
		title="Completed"
		type="completed"
		tasks={completedTasks}
		{removeTask}
		{toggleDone}
		{editTodo}
	/>
	<PrioTasks {merged} />
</div>
