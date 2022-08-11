<script lang="ts">
	import type {ListType, Task} from "$lib/util/task"
	import TaskList from "./TaskList.svelte"

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
	export let title: string
</script>

<div class="h-full">
	<h3 class="text-2xl border-b-4 border-orange-400 inline-block mb-1">
		{title}
	</h3>
	<TaskList {tasks} {type} {removeTask} {toggleDone} {editTodo} />
</div>
