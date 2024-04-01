<script setup lang="ts">
import { cn } from '@/lib/utils'
const InputVariants = {
  primary: "block w-full rounded-md border outline-none py-1.5 px-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-indigo-400 sm:text-sm sm:leading-6 duration-200",
  secondary: 'block w-full rounded-md border outline-none py-1.5 px-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-indigo-400 sm:text-sm sm:leading-6 duration-200'
}

export type InputVariant = keyof typeof InputVariants

const props = withDefaults(defineProps<{
  variant?: InputVariant
}>(), {
  variant: 'primary'
})
</script>

<template>
  <input v-bind="$attrs" :class="cn(InputVariants[props.variant], $attrs?.class as string)"/>
</template>
