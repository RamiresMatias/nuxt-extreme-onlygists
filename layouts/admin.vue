<template>
  <div class="w-full h-full flex flex-col items-center">
    <MainContent>
      <template #header>
        <Header 
          profile-pic="ramiresmatias"
          nickname="nickname"
          @navigate-to-new-gist="() => router.push('/app/gists/create')"
          @navigate-to-profile-edit="() => router.push('/app/profile/edit')"
          @navigate-to-sales="() => router.push('/app/sales/all')"
          @navigate-to-reports="() => router.push('/app/panel')"
          @logout="handleLogout"
        />
      </template>
      <template #content>
        <slot></slot>
      </template>
    </MainContent>
  </div>
</template>

<script setup lang="ts">
import Header from '@/modules/auth/components/Header/Header.vue';
import { useSession } from '@/modules/auth/composables/useSession/useSession'

const router = useRouter()

const session = useSession()

const handleLogout = async () => {
  const { error } = await session.logout()
  if(!error) {
    router.push('/')
  }
}
</script>

<style scoped>

</style>