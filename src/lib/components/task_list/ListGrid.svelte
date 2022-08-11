<script lang="ts">
	import type {ListType, Task} from "$lib/util/task"
	import TaskList from "./TaskList.svelte"
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
</script>

<div class="grid grid-cols-2 items-center gap-4 p-2">
	<div class="h-full">
		<h4 class="text-2xl">Uncompled</h4>
		<TaskList
			tasks={uncompletedTasks}
			type="uncompleted"
			{removeTask}
			{toggleDone}
			{editTodo}
		/>
	</div>
	<div class="h-full">
		<h4 class="text-2xl">Completed</h4>
		<TaskList
			tasks={completedTasks}
			type="completed"
			{removeTask}
			{toggleDone}
			{editTodo}
		/>
	</div>
</div>
