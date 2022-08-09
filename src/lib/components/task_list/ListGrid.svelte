<script lang="ts">
	import type {Task} from "$lib/util/task"
	import TaskList from "./TaskList.svelte"
	export let uncompletedTasks: Task[]
	export let completedTasks: Task[]
</script>

<div class="grid grid-cols-2 h-full items-center gap-4">
	<div class=" min-h-[10rem] max-h-[25rem]">
		<h4 class="mb-1 text-2xl">Uncompled</h4>
		<TaskList tasks={uncompletedTasks} type="unompleted" />
	</div>
	<div class="-500 min-h-[10rem] max-h-[25rem]">
		<h4 class="mb-1 text-2xl">Completed</h4>
		<TaskList tasks={completedTasks} type="completed" />
	</div>
</div>
