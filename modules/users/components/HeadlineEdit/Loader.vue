<template>
  <div v-if="props.loading" class="flex flex-col gap-2 items-center py-8">
    <Skeleton shape="circle" size="10rem"></Skeleton>
    <Skeleton width="18rem" size="2rem"></Skeleton>

    <div class="flex gap-2">
      <Skeleton width="8rem" size="2rem"></Skeleton>
      <Skeleton width="8rem" size="2rem"></Skeleton>
    </div>
  </div>
  <slot v-else/>
</template>

<script setup lang="ts">
const props = defineProps<{
  loading: boolean
}>()
</script>