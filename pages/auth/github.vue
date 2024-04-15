<template>
  <OAuthRedirect></OAuthRedirect>
</template>

<script setup lang="ts">
import OAuthRedirect from '@/modules/auth/screens/OAuthRedirect/OAuthRedirect.vue'
definePageMeta({
  layout: 'default'
})

useHead({
  title: 'Redirecionamento... | 🥺 onlygists'
})
</script>