<script lang="ts">
	import Page from "$lib/Page.svelte"
	import Title from "$lib/components/Title.svelte"
	import ButtonDefault from "$lib/components/common/ButtonDefault.svelte"

	interface Question {
		question: {q: string; a: string}
		options: string[]
	}
	const questions = [
		{
			question: {
				q: "Who won world cup in football 2020?",
				a: "France",
			},
			options: ["France", "Brazil", "England", "Argentina"],
		},
		{
			question: {
				q: "React was created but what big tech company?",
				a: "Facebook",
			},
			options: ["Google", "Facebook", "Amazoon", "Apple"],
		},
		{
			question: {
				q: "What is the capital city of Irland?",
				a: "Dublin",
			},
			options: ["London", "Rover", "Dublin", "Kiev"],
		},
		{
			question: {
				q: "Largest city in Poland?",
				a: "Warsaw",
			},
			options: ["Krakow", "Lodz", "Warsaw", "Poznan"],
		},
	]
	$: quizIndex = 0

	let answersStack: string[] = []

	$: {
		console.log(answersStack, quizIndex)
	}
</script>

<svelte:head>
	<title>Quiz game</title>
	<meta name="description" content="Quiz game" />
</svelte:head>

<Page>
	<Title text="Quiz game" />

	<div class="border border-red-600 my-5 p-2">
		{#if quizIndex < questions.length - 1}
			<h3 class="mb-2">{questions[quizIndex].question.q}</h3>
		{:else}
			<h3 class="mb-2">{questions[quizIndex - 1].question.q}</h3>
		{/if}
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
								answersStack.push(item)
								quizIndex += 1
							} else {
								answersStack.push(item)
								console.log("END")
							}
						}}
					>
						{item}
					</ButtonDefault>
				</li>
			{/each}
		</ul>
	</div>
</Page>
