<script lang="ts">
	import {page} from "$app/stores"
	const routes = [
		{
			name: "Home",
			url: "/",
		},
		{
			name: "Tasklist",
			url: "/tasklist",
		},
		{
			name: "Posts",
			url: "/posts",
		},
	]
</script>

<nav class="flex justify-center ">
	<ul class="flex  basis-40 justify-evenly">
		{#each routes as { name, url }}
			<li class="hover:scale-105 hover:text-orange-400">
				<a
					href={url}
					class={`${
						$page.url.pathname === url ? "text-orange-500 drop-shadow-lg " : ""
					} `}
				>
					{name}
				</a>
			</li>
		{/each}
	</ul>
</nav>
