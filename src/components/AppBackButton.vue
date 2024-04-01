<script setup lang="ts">
import Button from '@/components/ui/button/AppButton.vue'
import { useRouter } from "vue-router"
const router = useRouter()
</script>
<template>
    <Button @click.prevent="router.back()" class='w-fit p-1'>
        <slot />
    </Button>
</template>