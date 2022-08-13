<script lang="ts">
	import {twMerge} from "tailwind-merge"

	export let text: string
	export let wrapperStyles: string = ""
	export let h1Styles: string = ""
</script>

<slot>
	<div class={twMerge("", wrapperStyles)}>
		<h1
			class={twMerge(
				"relative z-10 inline-block after:content-[''] after:absolute after:bottom-1 after:left-0 after:h-4 after:w-full after:bg-orange-400 after:opacity-60 -after:translate-x-7  after:rotate-2 after:-z-10",
				h1Styles
			)}
		>
			{text}
		</h1>
	</div>
</slot>
