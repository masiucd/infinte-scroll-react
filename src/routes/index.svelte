<script context="module" lang="ts">
</script>

<script lang="ts">
	import AddTaskForm from "$lib/components/task_list/AddTaskForm.svelte"
	import TaskList from "$lib/components/task_list/TaskList.svelte"
	import Page from "$lib/Page.svelte"
	import {genRandomString} from "$lib/util/helpers"
	import {staticTasks as tasks, TaskStatus} from "$lib/util/task"

	let uncompletedTasks = tasks.filter(({done}) => !done)
	let completedTasks = tasks.filter(({done}) => done)
	let title: string
	let priority: TaskStatus

	const addTodo = (title: string, priority: TaskStatus) => {
		uncompletedTasks = [
			...uncompletedTasks,
			{
				id: genRandomString(),
				title,
				done: false,
				priority,
			},
		]
	}
</script>

<svelte:head>
	<title>Kitchen sink</title>
	<meta name="description" content="Kitchen sink built using SvelteKit" />
</svelte:head>

<Page>
	<div class="h-[43.75rem] min-h-[30rem] p-1">
		<AddTaskForm {addTodo} />
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
	</div>
</Page>
