<template>
  <div v-if="props.loading" class="flex flex-col gap-2 py-8 w-full">
    <Skeleton width="100%" height="20rem"></Skeleton>
  </div>
  <slot v-else></slot>
</template>

<script setup lang="ts">
const props = defineProps<{
  loading: boolean
}>()
</script>