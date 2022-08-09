<script context="module" lang="ts">
</script>

<script lang="ts">
	import AddTaskForm from "$lib/components/task_list/AddTaskForm.svelte"
	import ListGrid from "$lib/components/task_list/ListGrid.svelte"
	import Page from "$lib/Page.svelte"
	import {genRandomString} from "$lib/util/helpers"
	import {staticTasks as tasks, TaskStatus, type ListType} from "$lib/util/task"

	let uncompletedTasks = tasks.filter(({done}) => !done)
	let completedTasks = tasks.filter(({done}) => done)

	const toggleDone = (id: string, type: ListType) => (done: boolean) => {
		if (type === "uncompleted") {
			uncompletedTasks = uncompletedTasks.map((task) =>
				task.id === id ? {...task, done} : task
			)
			const completed = uncompletedTasks.find((task) => task.done)
			if (completed) {
				completedTasks.push(completed)
				completedTasks = completedTasks
				uncompletedTasks = uncompletedTasks.filter(
					(task) => task.id != completed.id
				)
			}
			return true
		}
		completedTasks = completedTasks.map((task) =>
			task.id === id ? {...task, done} : task
		)
		return true
	}

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
	const removeTask = (id: string, type: ListType) => {
		switch (type) {
			case "completed":
				completedTasks = completedTasks.filter((task) => task.id !== id)
				return true
			case "uncompleted":
				uncompletedTasks = uncompletedTasks.filter((task) => task.id !== id)
				return true
			default:
				return false
		}
	}

	$: {
		console.log(uncompletedTasks)
	}
</script>

<svelte:head>
	<title>Kitchen sink</title>
	<meta name="description" content="Kitchen sink built using SvelteKit" />
</svelte:head>

<Page>
	<div class="h-[43.75rem] min-h-[30rem] p-1">
		<AddTaskForm {addTodo} />
		<ListGrid {uncompletedTasks} {completedTasks} {removeTask} {toggleDone} />
	</div>
</Page>
