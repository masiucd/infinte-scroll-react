<script context="module" lang="ts">
</script>

<script lang="ts">
	import AddTaskForm from "$lib/components/task_list/AddTaskForm.svelte"
	import ListGrid from "$lib/components/task_list/ListGrid.svelte"
	import Page from "$lib/Page.svelte"
	import {genRandomString} from "$lib/util/helpers"
	import {staticTasks as tasks, TaskStatus} from "$lib/util/task"

	let uncompletedTasks = tasks.filter(({done}) => !done)
	let completedTasks = tasks.filter(({done}) => done)

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
		<ListGrid {uncompletedTasks} {completedTasks} />
	</div>
</Page>
