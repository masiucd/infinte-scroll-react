<script lang="ts">
	import Test from "../components/test.svelte";

	let name = "Marcell";
	let isOn = false;
	const toggleName = () => {
		isOn = !isOn;
		return isOn ? (name = "Marcell") : (name = "Marcello");
	};
</script>

<h1>Task book built with Svelete and Svelte-kit</h1>
<p>{name}</p>
<button on:click={toggleName}>Toggle</button>
<Test count={100} />
