<script setup lang="ts">
import { ref } from 'vue'
import Button from '@/components/ui/button/AppButton.vue'
import Input from '@/components/ui/input/AppInput.vue'
import IconLoader from '@/components/icons/IconLoader.vue'
import Alert, { type AlertVariant } from '@/components/ui/alert/AppAlert.vue'
import { STATUS_CODE } from '@/lib/enums'
import Link from '@/components/ui/link/AppLink.vue'
import { signUpAdmin } from '@/services'
import type { CreateAdminPasskey, NewUser } from '@/types'
import { Routes } from '@/router'

const loading = ref(false)

const alert = ref({
  message: '',
  type: '' as AlertVariant
})

function onSubmit(event: Event) {
  const formData = new FormData(event.target as HTMLFormElement)
  const data = Object.fromEntries(formData) as NewUser & CreateAdminPasskey

  loading.value = true

  signUpAdmin(data)
    .then((response) => {
      console.log({ response })
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
    .catch((error) => {
      console.error(error)
      alert.value.message = error?.message
      alert.value.type = 'error'
    })
    .finally(() => {
      loading.value = false
    })
}
</script>

<template>
  <div class="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <header class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img class="mx-auto max-w-40 w-full bg-pink-500 rounded-md p-1 border-2 border-pink-200" src="/logo.png" alt="Your Company" />

      <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Create your account
      </h2>
    </header>

    <main class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" v-on:submit.prevent="onSubmit">
        <div>
          <label for="email" class="block text-sm font-medium leading-6 text-gray-900"
            >Email address</label
          >
          <div class="mt-2">
            <Input
              placeholder="example@gmail.com"
              id="email"
              name="email"
              type="email"
              autocomplete="email"
              required
            />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm font-medium leading-6 text-gray-900"
              >Password</label
            >
          </div>
          <div class="mt-2">
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              autocomplete="current-password"
              required
            />
          </div>
        </div>

        <div>
          <div class="mt-2">
            <Input placeholder="Pass code" name="clientPassKey" type="password" required />
            <div class="flex justify-end">
              <p class="text-xs font-medium text-neutral-500 mt-1">Word to create the account.</p>
            </div>
          </div>
        </div>

        <Alert :message="alert.message" :variant="alert.type" />

        <div>
          <Button :disabled="loading" type="submit" class="flex gap-2">
            Sign up
            <IconLoader class="w-4 h-4" v-if="loading" />
          </Button>
        </div>
      </form>
      <p class="mt-10 text-sm text-gray-500">
        Do you have an account?
        <Link :to="Routes.logIn">Log in</Link>
      </p>
    </main>
  </div>
</template>
