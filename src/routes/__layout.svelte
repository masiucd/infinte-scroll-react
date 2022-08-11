<script lang="ts">
	import Nav from "$lib/components/layout/Nav.svelte"
	import "../app.css"
</script>

<header class="">
	<h3 class="my-2 text-center">
		<a
			href="/"
			class="text-2xl uppercase text-orange-400 drop-shadow-lg hover:drop-shadow-2xl"
			>svelte kitchen sink</a
		>
	</h3>
	<Nav />
</header>

<main class="min-h-[calc(100vh-9rem)] ">
	<slot />
</main>

<footer class="" />
