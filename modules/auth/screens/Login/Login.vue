<template>
  <section class="w-full h-screen flex flex-col items-center justify-center gap-5 bg-gray-50">
    <Logo />
    <SocialForm 
      :loading 
      @wants-login-with-github="handleGithubLogin"
    />
  </section>
</template>

<script setup lang="ts">
import SocialForm from '@/modules/auth/components/SocialForm/SocialForm.vue'

const loading = ref<boolean>(false)
const services = useServices()

const handleGithubLogin = async () => {
  loading.value = true

  services.auth.signinWithGithub()
}
</script>