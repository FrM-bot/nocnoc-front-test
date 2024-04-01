<script setup lang="ts">
import Input from '@/components/ui/input/AppInput.vue'
import Button from '@/components/ui/button/AppButton.vue'
import IconSend from '@/components/icons/IconSend.vue'
import type { NewUser } from '@/types'
import Alert, { type AlertVariant } from '@/components/ui/alert/AppAlert.vue'
import { ref } from 'vue'
import { inviteUser } from '@/services'
import { STATUS_CODE } from '@/lib/enums'
import IconLoader from '@/components/icons/IconLoader.vue'

const loading = ref(false)

const alert = ref({
  message: '',
  type: 'warning' as AlertVariant
})
function onSubmit(event: Event) {
  const formData = new FormData(event.target as HTMLFormElement)
  const user = Object.fromEntries(formData) as Pick<NewUser, 'email'>

  loading.value = true

  inviteUser(user)
    .then((response) => {
      if (response.code === STATUS_CODE.SUCCESS) {
        alert.value.message = response.data.message
        alert.value.type = 'success'
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
  <form class="max-w-sm my-8 mx-auto" v-on:submit.prevent="onSubmit">
    <div>
      <label for="email" class="block text-sm font-medium leading-6 text-gray-900"
        >Email address</label
      >
      <div class="mt-1 grid grid-cols-[1fr,42px] gap-1">
        <Input
          placeholder="example@gmail.com"
          id="email"
          name="email"
          type="email"
          autocomplete="email"
          required
        />
        <Button class="p-1 flex justify-center items-center">
          <IconSend v-if="!loading" />
          <IconLoader v-if="loading" />
        </Button>
      </div>
      <p class="text-xs text-neutral-500 font-medium my-1">Send invitation email</p>
    </div>
    <Alert :message="alert.message" :variant="alert.type" />
  </form>
</template>
