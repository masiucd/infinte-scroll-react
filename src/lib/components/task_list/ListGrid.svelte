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

	const editTodo = (
		id: string,
		list: Task[],
		fields: Pick<Task, "title" | "priority">
	) => {
		// TODO check if this will work
		list = list.map((task) => (task.id === id ? {...task, ...fields} : task))
		return true
	}
</script>

<div class="grid grid-cols-2 h-full items-center gap-4 p-2">
	<div class=" min-h-[10rem] max-h-[25rem]">
		<h4 class="mb-1 text-2xl">Uncompled</h4>
		<TaskList
			tasks={uncompletedTasks}
			type="uncompleted"
			{removeTask}
			{toggleDone}
		/>
	</div>
	<div class="-500 min-h-[10rem] max-h-[25rem]">
		<h4 class="mb-1 text-2xl">Completed</h4>
		<TaskList
			tasks={completedTasks}
			type="completed"
			{removeTask}
			{toggleDone}
		/>
	</div>
</div>
