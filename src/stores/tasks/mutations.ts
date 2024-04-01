import type { Task } from "@/types"
import type { TasksState } from "./index"

export const mutations = {
  addTask(state: TasksState, task: Task) {
    state.tasks = [...state.tasks, task]
  },
  setTasks(state: TasksState, tasks: Task[]) {
    state.tasks = tasks
  }
}
