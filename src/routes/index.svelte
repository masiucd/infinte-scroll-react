<script context="module" lang="ts">
</script>

<script lang="ts">
	import AddTaskForm from "$lib/components/AddTaskForm.svelte"
	import TaskList from "$lib/components/TaskList.svelte"
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
	$: console.log(uncompletedTasks)
</script>

<svelte:head>
	<title>Kitchen sink</title>
	<meta name="description" content="Kitchen sink built using SvelteKit" />
</svelte:head>

<Page>
	<div class="h-[43.75rem] min-h-[30rem] p-1 border border-red-400 p-1">
		<AddTaskForm {addTodo} />
		<div class="grid grid-cols-2 h-full items-center gap-4">
			<TaskList tasks={uncompletedTasks} />
			<TaskList tasks={completedTasks} />
		</div>
	</div>
</Page>
<!-- <Counter /> -->
