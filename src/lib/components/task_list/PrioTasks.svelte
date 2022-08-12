<script lang="ts">
	import {staticTaskStatus, TaskStatus, type Task} from "$lib/util/task"
	import ButtonDefault from "../common/ButtonDefault.svelte"
	import FilteredTaskItems from "./FilteredTaskItems.svelte"

	export let merged: Task[]

	let selectedPrio: TaskStatus | null = null
	let tasksByPrio: Task[] = []
	$: if (selectedPrio !== null) {
		tasksByPrio = merged.filter((t) => t.priority === selectedPrio)
	} else {
		tasksByPrio = []
	}
</script>

<div>
	<h4 class="text-xl border-b-4 border-orange-400 inline-block mb-1">
		View tasks by priority
	</h4>
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
<FilteredTaskItems {tasksByPrio} />
