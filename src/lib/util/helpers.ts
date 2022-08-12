import type {TaskStatus} from "./task"

const genRandomString = () => (Math.random() + 1).toString(36).substring(7)
const getSelectedTaskStatus = (
	selectedPrio: TaskStatus | null = null,
	index: number,
	staticTaskStatus: TaskStatus[]
) => selectedPrio !== null && staticTaskStatus.indexOf(selectedPrio) === index

export {genRandomString, getSelectedTaskStatus}
