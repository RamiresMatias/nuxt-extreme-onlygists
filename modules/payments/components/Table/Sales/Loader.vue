<template>
  <div v-if="props.loading" class="flex flex-col justify-center gap-4 bg-white rounded w-full p-5">
    <div class="flex gap-4">
      <Skeleton width="100%" height="4rem" />
      <Skeleton width="100%" height="4rem" />
      <Skeleton width="100%" height="4rem" />
    </div>
    <Skeleton width="100%" height="10rem" />
  </div>

  <slot v-else />
</template>

<script setup lang="ts">
const props = defineProps<{
  loading: boolean
}>()
</script>