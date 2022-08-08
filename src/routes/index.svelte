<script context="module" lang="ts">
</script>

<script lang="ts">
	import TaskList from "$lib/components/TaskList.svelte"
	import Page from "$lib/Page.svelte"
	import {staticTasks as tasks, TaskStatus} from "$lib/util/task"

	let uncompletedTasks = tasks.filter(({done}) => !done)
	let completedTasks = tasks.filter(({done}) => done)

	const addTodo = () => {
		console.log("Click")
		uncompletedTasks = [
			...uncompletedTasks,
			{
				id: 9,
				title: "Task 9",
				done: false,
				priority: TaskStatus.Low,
			},
		]
	}
	console.log(uncompletedTasks)
</script>

<svelte:head>
	<title>Task book</title>
	<meta name="description" content="Task book built using SvelteKit" />
</svelte:head>

<Page>
	<div
		class="tasks bg-shapes h-[43.75rem] min-h-[30rem] bg-stone-200 bg-opacity-90 "
	>
		<div class="add_task">
			<div class="form_group">
				<input type="text" id="add_task" placeholder="Add a task" value="" />
			</div>
			<button on:click={addTodo}>Confirm</button>
		</div>
		<div class="grid grid-cols-2 h-full items-center gap-4">
			<TaskList tasks={uncompletedTasks} />

			<TaskList tasks={completedTasks} />
		</div>
	</div>
</Page>
<!-- <Counter /> -->
