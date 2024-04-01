import type { Task } from '@/types'

export const enum TASKS_ACTION {
  SET_TASKS = 'setTasks',
   ADD_TASK = 'addTask',
}
// TODO: type params
export const actions = {
  setTasks({ commit }: unknown, tasks: Task[]) {
    commit(TASKS_ACTION.SET_TASKS, tasks)
  },
  addTasks({ commit }: unknown, task: Task) {
    commit(TASKS_ACTION.ADD_TASK, task)
  }
}
