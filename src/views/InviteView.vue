<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue'
import AppInviteUser from '@/components/invite/AppInviteUser.vue'
</script>

<template>
  <AppLayout>
    <div class="h-full my-auto">
      <div class="w-full flex justify-center">
        <h2 class="border-b px-2 pb-0.5 w-fit font-medium text-lg">Invite user</h2>
      </div>
      <AppInviteUser />
    </div>
  </AppLayout>
</template>
