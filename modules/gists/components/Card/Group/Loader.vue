<template>
  <template v-if="props.loading">
    <Skeleton width="100%" height="15rem"></Skeleton>
    <Skeleton width="100%" height="15rem"></Skeleton>
    <Skeleton width="100%" height="15rem"></Skeleton>
    <Skeleton width="100%" height="15rem"></Skeleton>
  </template>
  <slot v-else></slot>
</template>

<script setup lang="ts">
const props = defineProps<{
  loading: boolean
}>()
</script>