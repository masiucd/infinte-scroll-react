<script lang="ts">
	import Page from "$lib/Page.svelte"
	import Title from "$lib/components/Title.svelte"
	import ButtonDefault from "$lib/components/common/ButtonDefault.svelte"
	import {questions} from "$lib/util/quiz"

	$: quizIndex = 0
	$: score = 0
</script>

<svelte:head>
	<title>Quiz game</title>
	<meta name="description" content="Quiz game" />
</svelte:head>

<Page>
	<Title text="Quiz game" />

	<div>
		<div class="rounded-md my-5 p-2 bg-orange-100 shadow flex flex-col w-3/5 ">
			<h4 class="mb-2">
				{questions[
					quizIndex >= questions.length ? questions.length - 1 : quizIndex
				].question.q}
			</h4>
			<ul
				class="grid grid-cols-2 max-w-md place-items-center p-2 gap-2 shadow bg-blue-600 rounded-md"
			>
				{#each questions[quizIndex < questions.length ? quizIndex : quizIndex - 1].options as item}
					<li>
						<ButtonDefault
							disabled={quizIndex === questions.length}
							styles="text-xl text-white"
							onClick={() => {
								if (quizIndex < questions.length) {
									if (item === questions[quizIndex].question.a) {
										score += 1
									}
									quizIndex += 1
								}
							}}
						>
							{item}
						</ButtonDefault>
					</li>
				{/each}
			</ul>
		</div>

		{#if quizIndex === questions.length}
			<h3>Game is finished</h3>
			<p class="mb-2">
				You
				<span
					class="relative z-10 inline-block after:content-[''] after:absolute after:bottom-1 after:left-0 after:h-2 after:w-full after:bg-orange-500 after:opacity-70 -after:translate-x-7  after:rotate-2 after:-z-10"
				>
					scored
					{score}
				</span>/{questions.length} possible questions
			</p>
			<button
				on:click={() => {
					quizIndex = 0
				}}>New game</button
			>
		{/if}
	</div>
</Page>
