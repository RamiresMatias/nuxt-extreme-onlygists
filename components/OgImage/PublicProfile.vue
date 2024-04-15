<template>
  <div class="w-full h-full flex flex-col justify-center items-center bg-[#f97316]">
    <img :src="props.avatarUrl" alt="Avatar url" width="170" height="170" class="rounded-full" />
    <h1 class="font-[Inter] font-bold text-6xl text-white text-center">{{ props.author }}</h1>
    <p class="font-[Inter] font-regular text-4xl text-white text-center">{{ props.bio }}</p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  author: string
  bio: string
  avatarUrl: string
}>()
</script>