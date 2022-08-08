<script lang="ts">
	import {twMerge} from "tailwind-merge"
	export let styles = ""
</script>

<section class={twMerge("border max-w-[56.25rem] m-auto p-1", styles)}>
	<slot />
</section>
