interface Question {
	question: {q: string; a: string}
	options: string[]
}
const questions: Question[] = [
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
export {questions, type Question}
