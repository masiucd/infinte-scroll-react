<script lang="ts">
	import Page from "$lib/Page.svelte"
	import Title from "$lib/components/Title.svelte"
	import ButtonDefault from "$lib/components/common/ButtonDefault.svelte"
	import {questions} from "$lib/util/quiz"
	import End from "$lib/components/quiz/End.svelte"

	let amountOfQuestions = questions.length
	$: quizIndex = 0
	$: score = 0
	$: enabled = () => quizIndex !== questions.length
</script>

<svelte:head>
	<title>Quiz game</title>
	<meta name="description" content="Quiz game" />
</svelte:head>

<Page>
	<Title text="Quiz game" />
	<div>
		<div
			class="rounded-md my-5 p-2 bg-orange-100 shadow flex flex-col w-4/5 sm:w-3/5"
		>
			<h4 class="mb-2">
				{questions[
					quizIndex >= amountOfQuestions ? amountOfQuestions - 1 : quizIndex
				].question.q}
			</h4>
			<ul
				class="grid grid-cols-2 max-w-md place-items-center p-2 gap-2 shadow bg-blue-600 rounded-md"
			>
				{#each questions[quizIndex < amountOfQuestions ? quizIndex : quizIndex - 1].options as item}
					<li>
						<ButtonDefault
							disabled={!enabled()}
							styles="text-xl text-white"
							onClick={() => {
								if (quizIndex < amountOfQuestions) {
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

		{#if quizIndex === amountOfQuestions}
			<End
				{score}
				{amountOfQuestions}
				resetGame={() => {
					quizIndex = 0
				}}
			/>
		{/if}
	</div>
</Page>
