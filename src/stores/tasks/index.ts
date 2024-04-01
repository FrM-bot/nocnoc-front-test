import { state } from './state'
import { mutations } from './mutations'
// import { getters } from './getters'
import { actions } from './actions'
import type { Task } from '@/types'
import { createStore } from 'vuex'
// import type { InjectionKey } from 'vue'

export type TasksState = {
  tasks: Task[] | []
}

// export const tasksStoreKey: InjectionKey<Store<TasksState>> = Symbol()

// Create a new store instance.
export const tasksStore = createStore<TasksState>({
  state,
  mutations,
  actions
  // getters,
})

// export function useTasks () {
//   return baseUseStore(tasksStoreKey)
// }
