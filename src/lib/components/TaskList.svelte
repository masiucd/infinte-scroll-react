<script lang="ts">
	import type {Task} from "$lib/util/task"
	export let tasks: Task[]
</script>

<ul class="bg-red-200 mx-2">
	{#each tasks as { title }}
		<li>
			<p>{title}</p>
		</li>
	{/each}
</ul>
