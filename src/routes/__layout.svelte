<script lang="ts">
	import Nav from "$lib/components/layout/Nav.svelte"
	import "../app.css"
	const d = new Date().getFullYear()
</script>

<header class="h-[6rem] shadow">
	<h3 class="my-2 text-center">
		<a
			href="/"
			class="text-2xl uppercase text-orange-400 drop-shadow-lg hover:drop-shadow-2xl"
			>svelte kitchen sink</a
		>
	</h3>
	<Nav />
</header>

<main class="min-h-[calc(100vh-12rem)] ">
	<slot />
</main>

<footer class="h-[4.7rem] shadow flex justify-center items-center">
	<small> © Svelte kitchen sink built with Sveltekit {d} </small>
</footer>
