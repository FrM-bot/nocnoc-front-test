<script setup lang="ts">
import { cn } from '@/lib/utils'

const Rotations = {
  top: '-rotate-180',
  bottom: 'rotate-0',
  right: '-rotate-90',
  left: 'rotate-90'
}

type Directions = keyof typeof Rotations

const { direction } = withDefaults(
  defineProps<{
    direction?: Directions
  }>(),
  {
    direction: 'left'
  }
)
</script>
<template>
  <svg
    v-bind="$attrs"
    viewBox="0 0 21 21"
    xmlns="http://www.w3.org/2000/svg"
    :class="cn('h-8 w-8', $attrs.class as string | undefined, Rotations[direction])"
  >
    <path
      d="m8.5.5-4 4-4-4"
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      transform="translate(6 8)"
    />
  </svg>
</template>
