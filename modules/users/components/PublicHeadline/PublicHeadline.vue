<template>
  <div class="w-full flex flex-col justify-center items-center gap-2">
    <div class="w-24 md:w-32 rounded-full overflow-hidden">
      <img :src="props.avatarUrl" alt="Foto do usuário" class="w-full" />
    </div>
    <h1 class="font-[Inter] text-gray-700 text-center font-bold text-2xl md:text-3xl">{{ props.name }}</h1>
    <p v-if="props.bio" class="font-[Inter] text-gray-700 text-center font-normal md:text-lg">{{ props.bio }}</p>
    <p v-if="props?.city && props.state" class="font-[Inter] text-gray-500 text-center font-normal text-sm md:text-base">
      <i class="pi pi-map-maker"></i>
      {{ props.city }}, {{ props.state }}
    </p>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  name: string
  avatarUrl: string
  bio?: string
  city?: string
  state?: string
}>(), {
  name: 'Ramires Matias',
  avatarUrl: 'https://avatars.githubusercontent.com/u/50179118?v=4',
  bio: 'Frontend Developer',
  city: 'Goiânia',
  state: 'GO'
})
</script>