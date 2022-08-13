<script lang="ts">
	export let score: number
	export let amountOfQuestions: number
	export let resetGame: () => void
</script>

<h3>Game is finished</h3>
<p class="mb-2">
	You
	<span
		class="relative z-10 inline-block after:content-[''] after:absolute after:bottom-1 after:left-0 after:h-2 after:w-full after:bg-orange-500 after:opacity-70 -after:translate-x-7  after:rotate-2 after:-z-10"
	>
		scored
		{score}
	</span>/{amountOfQuestions} possible questions
</p>
<button on:click={resetGame}>New game</button>
