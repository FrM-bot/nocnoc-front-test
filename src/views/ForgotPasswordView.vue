<script setup lang="ts">
import { ref } from 'vue'
import Button from '@/components/ui/button/AppButton.vue'
import Input from '@/components/ui/input/AppInput.vue'
import IconLoader from '@/components/icons/IconLoader.vue'
import IconArrow from '@/components/icons/IconArrow.vue'
import Alert, { type AlertVariant } from '@/components/ui/alert/AppAlert.vue'
import { STATUS_CODE } from '@/lib/enums'
import { forgotPassword } from '@/services'
import type { NewUser } from '@/types'
import BackButton from '@/components/AppBackButton.vue'
const loading = ref(false)

const alert = ref({
  message: '',
  type: '' as AlertVariant
})

function onSubmit(event: Event) {
  const formData = new FormData(event.target as HTMLFormElement)
  const { email } = Object.fromEntries(formData) as Pick<NewUser, 'email'> & {
    verifyPassword: string
  }

  loading.value = true

  forgotPassword({ email })
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
  <div class="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8 relative">
    <div class="absolute top-3 left-3">
      <BackButton>
        <IconArrow />
      </BackButton>
    </div>
    <header class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img
        class="mx-auto max-w-40 w-full bg-pink-500 rounded-md p-1 border-2 border-pink-200"
        src="/logo.png"
        alt="NocNoc"
      />
      <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Change your password
      </h2>
    </header>

    <main class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" v-on:submit.prevent="onSubmit">
        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm font-medium leading-6 text-gray-900"
              >Email</label
            >
          </div>
          <div class="mt-2">
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="example@gmail.com"
              autocomplete="current-email"
              required
            />
          </div>
        </div>

        <Alert :message="alert.message" :variant="alert.type" />

        <div>
          <Button :disabled="loading" type="submit" class="flex gap-2">
            Send email
            <IconLoader v-if="loading" />
          </Button>
        </div>
      </form>
    </main>
  </div>
</template>
