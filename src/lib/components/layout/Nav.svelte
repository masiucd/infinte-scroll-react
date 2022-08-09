<script lang="ts">
	const routes = [
		{
			name: "Home",
			url: "/",
		},
		{
			name: "Tasklist",
			url: "/tasklist",
		},
	]
</script>

<nav class="flex justify-center ">
	<ul class="flex  basis-40 justify-evenly">
		{#each routes as { name, url }}
			<li class="hover:scale-105 hover:text-orange-400">
				<a href={url}>
					{name}
				</a>
			</li>
		{/each}
	</ul>
</nav>
