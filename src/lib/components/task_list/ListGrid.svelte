<script lang="ts">
	import type {ListType, Task, TaskStatus} from "$lib/util/task"
	import {staticTaskStatus, staticTasks as tasks} from "$lib/util/task"
	import ButtonDefault from "../common/ButtonDefault.svelte"
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

	let selectedPrio: TaskStatus | null = null
	let tasksByPrio: Task[] = []
	$: if (selectedPrio !== null) {
		tasksByPrio = tasks.filter((t) => t.priority === selectedPrio)
	} else {
		tasksByPrio = []
	}

	$: {
		console.log(selectedPrio, tasksByPrio)
	}
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
	<div>
		<h3 class="text-2xl">View tasks by priority</h3>
		<ul class="flex gap-3">
			{#each staticTaskStatus as taskStatus}
				<li>
					<ButtonDefault
						onClick={() => {
							selectedPrio = taskStatus
							return true
						}}
					>
						<span>{taskStatus}</span>
					</ButtonDefault>
				</li>
			{/each}
			<li>
				<ButtonDefault
					onClick={() => {
						selectedPrio = null
						return true
					}}
				>
					<span>NONE</span>
				</ButtonDefault>
			</li>
		</ul>
	</div>
	<div>
		<ul>
			{#if tasksByPrio.length > 0}
				{#each tasksByPrio as task}
					<li>{task.title}</li>
				{/each}
			{/if}
		</ul>
	</div>
</div>
