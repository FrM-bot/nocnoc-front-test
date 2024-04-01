<script setup lang="ts">
import { watch } from 'vue'
import { getCookie } from '@/lib/utils'
import { COOKIE_NAME } from '@/lib/enums'
import router, { Routes } from '@/router'
import AppFooter from '@/components/footer/AppFooter.vue'
import AppHeader from '@/components/header/AppHeader.vue'


const token = getCookie(COOKIE_NAME.ACCESS_TOKEN) || ''

watch(
  token,
  async () => {
    if (!token) router.push(Routes.logIn)
  },
  { immediate: true }
)
</script>
<template>
  <AppHeader />
  <main class="max-w-6xl flex-1 mx-auto min-h-[70vh] px-4 xl:px-0 py-6">
    <slot />
  </main>
  <AppFooter />
</template>