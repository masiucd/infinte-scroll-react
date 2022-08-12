async function GET({params}) {
	const xs = ["bob", "mia", "fred"]
	return {
		status: 200,
		body: {
			data: xs,
		},
	}
}

export {GET}
