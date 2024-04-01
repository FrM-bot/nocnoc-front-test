import type { TasksState } from "./index"
// import { getTasks } from '@/services/get'

export const getters = {
  getTasks(state: TasksState) {
    return state.tasks
  }
}
