<template>
  <NuxtLayout>
    <Toast />
    <NuxtPage></NuxtPage>
  </NuxtLayout>
</template>

<script setup lang="ts">
const colorMode = useColorMode()

colorMode.preference = 'light'

useHead({
  title: '🥺 onlygists'
})

useSeoMeta({
  title: '🥺 onlygists - Compartilhe e monetize trechos de código.',
  ogTitle: '🥺 onlygists - Compartilhe e monetize trechos de código.',
  ogDescription: 'Compartilhe e monetize trechos de código. Ganhe uma renda extra com os códigos que você faz no dia-a-dia',
  description: 'Compartilhe e monetize trechos de código. Ganhe uma renda extra com os códigos que você faz no dia-a-dia'
})
</script>