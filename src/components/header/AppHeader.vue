<script lang="ts" setup>
import LogOut from '@/components/header/LogOutButton.vue'
import Link from '@/components/ui/link/AppLink.vue'
import { Routes } from '@/router'
</script>
<template>
  <header class="w-full py-4 bg-neutral-50 border-b">
    <div class="max-w-6xl flex-1 mx-auto px-4 xl:px-0 flex justify-between items-center">
      <Link :to="Routes.home">
        <h1 class="p-1 rounded border-2 border-white bg-pink-500 shadow-lg" title="NocNoc">
          <img src="/logo.png" alt="App logo" width="64" height="64" />
        </h1>
      </Link>
      <div class="flex items-center gap-3">
        <nav>
          <ul class="flex items-center gap-3">
            <li>
              <Link :to="Routes.invite"> Invite </Link>
            </li>
          </ul>
        </nav>
        <LogOut />
      </div>
    </div>
  </header>
</template>
