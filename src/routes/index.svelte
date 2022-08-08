<script context="module" lang="ts">
</script>

<script lang="ts">
	import Page from "$lib/Page.svelte"
	import {staticTasks as tasks} from "$lib/util/task"

	const completedTasks = tasks.filter(({done}) => done)
	const uncompletedTasks = tasks.filter(({done}) => !done)
</script>

<svelte:head>
	<title>Task book</title>
	<meta name="description" content="Task book built using SvelteKit" />
</svelte:head>

<Page>
	<div class="tasks bg-wave min-h-[30rem] text-white">
		<div class="add_task">
			<div class="form_group">
				<input type="text" id="add_task" placeholder="Add a task" value="" />
			</div>
		</div>
		<div class="grid grid-cols-2 ">
			<ul>
				{#each uncompletedTasks as { title }}
					<li>
						{title}
					</li>
				{/each}
			</ul>
		</div>
	</div>
</Page>
<!-- <Counter /> -->
