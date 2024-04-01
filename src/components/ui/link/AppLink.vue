<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

defineOptions({
  inheritAttrs: false,
})

const props = defineProps({
  ...RouterLink.props,
  inactiveClass: String,
})

const isExternalLink = computed(() => {
  return typeof props?.to === 'string' && props?.to?.startsWith('http')
})
</script>

<template>
  <a class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500" v-if="isExternalLink" v-bind="$attrs" :href="to" target="_blank">
    <slot />
  </a>
  <RouterLink
    v-else
    v-bind="$props"
    custom
    v-slot="{ isActive, href, navigate }"
  >
    <a
      v-bind="$attrs"
      :href="href"
      @click="navigate"
      :class="isActive ? activeClass : inactiveClass"
      class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
    >
      <slot />
    </a>
  </RouterLink>
</template>