<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue'
import AddTaskForm from '@/components/tasks/AddTaskForm.vue'
import TaskList from '@/components/tasks/TaskList.vue'
</script>

<template>
  <AppLayout>
    <AddTaskForm />
    <section class="mt-8">
      <h2 class="w-1/2 border-b pb-1">Tasks</h2>
      <TaskList />
    </section>
  </AppLayout>
</template>
