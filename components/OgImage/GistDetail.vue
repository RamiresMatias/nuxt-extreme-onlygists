<template>
  <div class="w-full h-full flex flex-col justify-center items-center bg-[#f97316]">
    <h1 class="font-[Inter] font-bold text-6xl text-white text-center">{{ props.title }}</h1>
    <p class="font-[Inter] font-regular text-4xl text-white text-center">{{ props.description }}</p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string
  description: string
}>()
</script>