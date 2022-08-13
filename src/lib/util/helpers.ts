import type {TaskStatus} from "./task"
import {twMerge} from "tailwind-merge"

const genRandomString = () => (Math.random() + 1).toString(36).substring(7)
const getSelectedTaskStatus = (
	selectedPrio: TaskStatus | null = null,
	index: number,
	staticTaskStatus: TaskStatus[]
) => selectedPrio !== null && staticTaskStatus.indexOf(selectedPrio) === index

const composeStyles = (styles: string, incoming = "") =>
	twMerge(styles, incoming)

export {genRandomString, getSelectedTaskStatus, composeStyles}
