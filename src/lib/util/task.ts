import {genRandomString} from "./helpers"

type ListType = "uncompleted" | "completed"
enum TaskStatus {
	High = "HIGH",
	Medium = "MEDIUM",
	Low = "LOW",
}

interface Task {
	id: string
	title: string
	done: boolean
	priority: TaskStatus
}

const staticTasks: Task[] = [
	{
		id: genRandomString(),
		title: "Go to the train station",
		done: false,
		priority: TaskStatus.High,
	},
	{
		id: genRandomString(),
		title: "Eat some lunch",
		done: false,
		priority: TaskStatus.Medium,
	},
	{
		id: genRandomString(),
		title: "Clean the room",
		done: false,
		priority: TaskStatus.Low,
	},
	{
		id: genRandomString(),
		title: "Eat breakfast",
		done: true,
		priority: TaskStatus.Low,
	},
]

export type {Task, ListType}

export {staticTasks, TaskStatus}
