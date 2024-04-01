<script setup lang="ts">
import { onBeforeMount, ref, computed } from 'vue'
import { getTasks } from '@/services/get'
import Alert, { type AlertVariant } from '@/components/ui/alert/AppAlert.vue'
import { STATUS_CODE } from '@/lib/enums'
import IconLoader from '@/components/icons/IconLoader.vue'
import IconTrash from '@/components/icons/IconTrash.vue'
import Button from '@/components/ui/button/AppButton.vue'
import { useStore } from 'vuex'
import { TASKS_ACTION } from '@/stores/tasks/actions'

const store = useStore()
// const state = computed(() => store.state)
const loading = ref(false)

// const tasks = ref([] as Task[])

const tasks = computed(() => store.state.tasks)

const alert = ref({
  message: '',
  type: 'warning' as AlertVariant
})

function checkIsPDF(fileUrl?: string) {
  return fileUrl?.includes('.pdf')
}

onBeforeMount(() => {
  loading.value = true
  getTasks()
    .then((response) => {
      if (response.code === STATUS_CODE.SUCCESS) {
        // tasks.value = response.data
        store.commit(TASKS_ACTION.SET_TASKS, response.data)
        // store.mutations.setTasks(response.data)
      }
      if (response.code === STATUS_CODE.ERROR) {
        alert.value.message = response.error
        alert.value.type = 'error'
      }
      if (response.code === STATUS_CODE.MESSAGE) {
        alert.value.message = response.message
        alert.value.type = 'warning'
      }
    })
    .catch(console.error)
    .finally(() => {
      loading.value = false
    })
})

function deleteTask(taskId: string) {
  globalThis.window.alert('Todo: Make this feature :)')
}

console.log({ store })
</script>
<template lang="">
  <ul class="my-6 grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-2">
    <li class="" v-for="task in tasks" :key="task.id">
      <div class="border p-2 rounded shadow-lg">
        <h2>
          {{ task?.title }}
        </h2>

        <div class="w-full h-px bg-neutral-200 my-1" />

        <p>
          {{ task?.description }}
        </p>

        <div class="flex gap-1 mt-2 bg-neutral-50 p-1 rounded">
          <p v-if="task.files?.length === 0">No files.</p>
          <!-- <object :data="file.url" type="application/pdf">
          <iframe :src="`https://docs.google.com/viewer?url=${file.url}&embedded=true`"></iframe>
        </object> -->
          <!-- <iframe :src="file.url" width="100%" height="600px"></iframe> -->

          <div v-for="file in task.files" :key="file.url" class="overflow-hidden">
            <picture
              v-if="!checkIsPDF(file.url)"
              class="h-full max-h-14 aspect-square rounded overflow-hidden flex"
            >
              <img class="object-cover flex-1" :src="file.url" :alt="file.originalName" />
            </picture>
            <iframe
              scrolling="no"
              class="rounded w-full object-cover aspect-square"
              v-if="checkIsPDF(file.url)"
              :src="file.url"
            />
          </div>
        </div>

        <div class="flex justify-end mt-2 p-1">
          <Button variant="error" class="w-fit p-1" @click.prevent="deleteTask(task.id)">
            <IconTrash />
          </Button>
        </div>
      </div>
    </li>
  </ul>
  <div class="w-full h-32 grid place-content-center" v-if="loading">
    <IconLoader class="w-4 h-4" />
  </div>
  <Alert class="mt-5" :message="alert.message" :variant="alert.type" />
</template>
