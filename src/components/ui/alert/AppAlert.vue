<script setup lang="ts">
import { cn } from '@/lib/utils'
import IconWarning from '@/components/icons/IconWarning.vue'
const AlertVariants = {
  error: "alert border-pink-500 text-pink-500 shadow-pink-400/20 bg-pink-500/5",
  warning: 'alert border-yellow-500 text-yellow-500 shadow-yellow-400/20 bg-yellow-500/5',
  success: 'alert border-emerald-500 text-emerald-500 shadow-emerald-400/20 bg-emerald-500/5'
}

export type AlertVariant = keyof typeof AlertVariants

const props = withDefaults(defineProps<{
  variant?: AlertVariant,
  message: string
}>(), {
  variant: 'warning',
  message: ''
})
</script>
<template>
  <div
    v-if="props.message"
    :class="cn(AlertVariants[props.variant], $attrs?.class as string)"
  >
    <IconWarning />
    <p>
      {{ props.message }}
    </p>
  </div>
</template>
