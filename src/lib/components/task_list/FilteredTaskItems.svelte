<script lang="ts">
	import type {Task} from "$lib/util/task"

	export let tasksByPrio: Task[]
</script>

<div>
	<ul>
		{#if tasksByPrio.length > 0}
			{#each tasksByPrio as { done, title }}
				<li class="flex gap-2">
					<p class={`${done ? "line-through text-blue-600 " : ""}`}>
						{title}
					</p>
					<p>{done ? "✔️" : "◻︎"}</p>
				</li>
			{/each}
		{/if}
	</ul>
</div>
