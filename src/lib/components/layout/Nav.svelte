<script lang="ts">
	import {page} from "$app/stores"
	import {composeStyles} from "$lib/util/helpers"

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
		{
			name: "Quiz",
			url: "/quiz",
		},
	]
</script>

<nav class="flex justify-center ">
	<ul class="flex w-2/5 justify-evenly">
		{#each routes as { name, url }}
			<li class="hover:scale-105 hover:text-orange-400">
				<a
					href={url}
					class={composeStyles(
						$page.url.pathname === url ? "text-orange-500 drop-shadow-lg " : "",
						""
					)}
				>
					{name}
				</a>
			</li>
		{/each}
	</ul>
</nav>
