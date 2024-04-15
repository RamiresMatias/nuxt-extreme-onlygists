<template>
  <CreateNew />
</template>

<script setup lang="ts">
import CreateNew from '@/modules/gists/screens/CreateNew/CreateNew.vue'

definePageMeta({
  layout: 'admin',
  middleware: ['auth']
})

useHead({
  title: 'Criar novo gist | 🥺 onlygists'
})
</script>