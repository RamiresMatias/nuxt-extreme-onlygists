<template>
  <div>
    <PublicProfile />
  </div>
</template>

<script setup lang="ts">
import PublicProfile from '~/modules/users/screens/PublicProfile/PublicProfile.vue'

definePageMeta({
  layout: 'checkout'
})

useHead({
  title: 'Perfil do usuário | 🥺 onlygists'
})
</script>

<style scoped>

</style>