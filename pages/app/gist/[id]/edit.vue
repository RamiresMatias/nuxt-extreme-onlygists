<template>
  <Edit />
</template>

<script setup lang="ts">
import Edit from '@/modules/gists/screens/Edit/Edit.vue'

definePageMeta({
  layout: 'admin',
  middleware: ['auth']
})

useHead({
  title: 'Editar gist | 🥺 onlygists'
})
</script>