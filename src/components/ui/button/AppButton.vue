<script setup lang="ts">
import { cn } from '@/lib/utils'
const ButtonVariants = {
  primary:
    'button bg-indigo-500 text-white hover:bg-indigo-400/10 hover:border-indigo-400 hover:text-indigo-400 focus-visible:outline-indigo-600 border border-indigo-500 hover:shadow-indigo-400/40 border border-indigo-100',
  success:
    'button bg-emerald-500 text-white hover:bg-emerald-400/10 hover:border-emerald-400 hover:text-emerald-400 focus-visible:outline-emerald-600 border border-emerald-500 hover:shadow-emerald-400/40 border border-emerald-100',
  error:
    'button bg-pink-500 text-white hover:bg-pink-400/10 hover:border-pink-400 hover:text-pink-400 focus-visible:outline-pink-500 border border-pink-500 hover:shadow-pink-400/40 border border-pink-100'
}

export type ButtonVariant = keyof typeof ButtonVariants

const props = withDefaults(
  defineProps<{
    variant?: ButtonVariant
  }>(),
  {
    variant: 'primary'
  }
)
</script>

<template>
  <button v-bind="$attrs" :class="cn(ButtonVariants[props.variant], $attrs?.class as string)">
    <slot />
  </button>
</template>
