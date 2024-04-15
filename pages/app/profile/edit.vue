<template>
  <EditProfile />
</template>

<script setup lang="ts">
import EditProfile from '@/modules/users/screens/EditProfile/EditProfile.vue'

definePageMeta({
  layout: 'admin',
  middleware: ['auth']
})

useHead({
  title: 'Editar perfil | 🥺 onlygists'
})
</script>