<script lang="ts">
	import {TaskStatus} from "$lib/util/task"

	export let addTodo: (title: string, priority: TaskStatus) => void
	let title: string
	let priority: TaskStatus

	$: isEnabled = () => {
		if (!title) return false
		if (!priority) return false
		return true
	}
</script>

<form
	class="flex flex-col md:flex-row mb-2"
	on:submit={(e) => {
		// TODO remove when working with DB
		e.preventDefault()
	}}
>
	<div class="flex-1 basis-1 p-1">
		<label for="add_task"> <span>Add a new task</span> </label>
		<input
			type="text"
			id="add_task"
			placeholder="Go for a walk..."
			class="w-full  outline-none shadow h-10"
			bind:value={title}
		/>
	</div>
	<div class="flex-1 basis-2 p-1 flex flex-col items-end justify-center ">
		<label for="priority" class="w-full">
			<span class="mr-auto block">Priority</span>
		</label>
		<select
			name=""
			id="priority"
			bind:value={priority}
			class="w-full p-2 outline-none h-10  "
			placeholder="High/Medium/Low"
		>
			<option disabled value={null}> High/Medium/Low </option>
			<option value={TaskStatus.High}> High </option>
			<option value={TaskStatus.Medium}> Medium </option>
			<option value={TaskStatus.Low}> Low </option>
		</select>
	</div>
	<div class="flex-2 basis-1">
		<button
			disabled={!isEnabled()}
			class="border-2 border-l-blue-500  h-full bg-slate-200 text-slate-900 p-1 rounded-none w-full disabled:opacity-60 disabled:cursor-not-allowed"
			on:click={() => addTodo(title, priority)}>Confirm</button
		>
	</div>
</form>
