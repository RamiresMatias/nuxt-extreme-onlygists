<template>
  <div v-if="props.loading" class="flex flex-col gap-2 py-8">
    <Skeleton width="18rem" height="2rem"></Skeleton>
    <div class="flex flex-col gap-2">
      <Skeleton width="9rem" height="1rem"></Skeleton>
      <Skeleton width="7rem" height="2rem"></Skeleton>
    </div>

    <div class="flex items-center gap-2">
      <Skeleton size="1rem" shape="circle"></Skeleton>
      <Skeleton width="7rem" height="1rem"></Skeleton>
    </div>
  </div>
  <slot v-else />
</template>

<script setup lang="ts">
const props = defineProps<{
  loading: boolean
}>()
</script>