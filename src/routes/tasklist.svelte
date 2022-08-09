<script context="module" lang="ts">
</script>

<script lang="ts">
	import AddTaskForm from "$lib/components/task_list/AddTaskForm.svelte"
	import ListGrid from "$lib/components/task_list/ListGrid.svelte"
	import Page from "$lib/Page.svelte"
	import {genRandomString} from "$lib/util/helpers"
	import {
		staticTasks as tasks,
		TaskStatus,
		type ListType,
		type Task,
	} from "$lib/util/task"

	let uncompletedTasks = tasks.filter(({done}) => !done)
	let completedTasks = tasks.filter(({done}) => done)

	const toggleDone = (id: string, type: ListType) => (done: boolean) => {
		if (type === "uncompleted") {
			uncompletedTasks = uncompletedTasks.map((task) =>
				task.id === id ? {...task, done} : task
			)
			const completed = uncompletedTasks.find(({done}) => done)
			if (completed) {
				uncompletedTasks = uncompletedTasks.filter(({id}) => id != completed.id)
				completedTasks = [...completedTasks, completed]
			}
			return true
		}
		completedTasks = completedTasks.map((task) =>
			task.id === id ? {...task, done} : task
		)
		const unCompleted = completedTasks.find(({done}) => !done)
		if (unCompleted) {
			completedTasks = completedTasks.filter(({id}) => id !== unCompleted.id)
			uncompletedTasks = [...uncompletedTasks, unCompleted]
		}
		return true
	}

	const addTodo = (title: string, priority: TaskStatus) => {
		uncompletedTasks = [
			...uncompletedTasks,
			{
				id: (uncompletedTasks.length + completedTasks.length + 1).toString(),
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
</script>

<svelte:head>
	<title>Task list</title>
	<meta name="description" content="Collection of handled/uncompletedTasks" />
</svelte:head>

<Page styles="p-0 flex flex-col justify-center bg-slate-100 ">
	<div class="min-h-[20rem] shadow">
		<AddTaskForm {addTodo} />
		<ListGrid {uncompletedTasks} {completedTasks} {removeTask} {toggleDone} />
	</div>
</Page>
