<script setup lang="ts">
import Button from '@/components/ui/button/AppButton.vue'
import IconFile from '@/components/icons/IconFile.vue'
import IconMiniCross from '@/components/icons/IconMiniCross.vue'
import IconLoader from '@/components/icons/IconLoader.vue'
import { createTask } from '@/services'
import type { NewTask, Task } from '@/types'
import Alert, { type AlertVariant } from '@/components/ui/alert/AppAlert.vue'
import { ref } from 'vue'
import { STATUS_CODE } from '@/lib/enums'
import { useStore } from 'vuex'
import { TASKS_ACTION } from '@/stores/tasks/actions'

const store = useStore()

const loading = ref(false)

const files = ref<File[]>([])

const alert = ref({
  message: '',
  type: 'warning' as AlertVariant
})

function onSelectFile(event: Event) {
  const input = event.target as HTMLInputElement
  if (!input?.files) return

  for (const file of input.files) {
    console.log(file)
    files.value.push(file)
  }
}

function deleteFile(name: string) {
  files.value = files.value.filter((file) => file.name !== name)
}

function onSubmit(event: Event) {
  const formElement = event.target as HTMLFormElement
  const formData = new FormData(formElement)
  const task = Object.fromEntries(formData) as unknown as NewTask

  loading.value = true

  createTask({
    title: task.title,
    description: task.description,
    files: files.value
  })
    .then((response) => {
      if (response.code === STATUS_CODE.SUCCESS) {
        alert.value.message = 'Task created.'
        alert.value.type = 'success'
        files.value = []
        const newTask = response.data
        store.commit(TASKS_ACTION.ADD_TASK, {
          id: newTask.task.id,
          createdAt: newTask.task.createdAt,
          description: newTask.task.description,
          files: newTask.files,
          title: newTask.task.title,
          updatedAt: newTask.task.updatedAt
        } as unknown as Task)
        
        formElement.reset()
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
}
</script>
<template>
  <form
    class="rounded bg-white border flex flex-col p-3 max-w-lg shadow-lg mx-auto"
    v-on:submit.prevent="onSubmit"
  >
    <input
      class="outline-none focus:bg-neutral-50 p-1 rounded duration-200"
      placeholder="Some example..."
      name="title"
      type="text"
      required
      minlength="4"
    />
    <div class="w-full bg-neutral-200 my-1 h-px" />
    <textarea
      placeholder="Mi description..."
      class="outline-none max-h-60 min-h-14 h-fit focus:bg-neutral-50 p-1 rounded duration-200"
      name="description"
      required
      minlength="4"
    />
    <label class="my-2 h-fit flex">
      <div class="flex flex-col gap-1 w-full">
        <div
          v-for="file in files"
          :key="file.name"
          class="cursor-pointer border p-1 rounded grid grid-cols-[24px_1fr_24px] w-full items-center gap-2"
        >
          <IconFile title="Add file" />
          <span class="truncate">{{ file.name }}</span>
          <Button type="button" class="p-0" variant="error" @click.prevent="deleteFile(file.name)">
            <IconMiniCross />
          </Button>
        </div>
        <div v-if="!files?.length" class="cursor-pointer border p-1 rounded flex w-full gap-2">
          <IconFile title="Add file" />
          <span class="truncate">No chosen files.</span>
        </div>
      </div>
      <input
        accept=".pdf, .jpg, .jpeg, .png"
        class="bg-transparent w-0 h-0"
        type="file"
        name="files"
        multiple
        v-on:change="onSelectFile"
      />
    </label>
    <Button class="flex gap-2 items-center" :disabled="loading">
      <IconLoader class="w-4 h-4" v-if="loading" />
      Add task
    </Button>
    <Alert class="mt-5" :message="alert.message" :variant="alert.type" />
  </form>
</template>
