<template>
  <div class="w-full h-full flex flex-col items-center">
    <MainContent>
      <template #header>
        <HeaderLoader :loading="loading">
          <Header
            v-if="session.isLogged()" 
            :profile-pic
            :nickname
            @navigate-to-new-gist="() => router.push('/app/gists/create')"
            @navigate-to-profile-edit="() => router.push('/app/profile/edit')"
            @navigate-to-sales="() => router.push('/app/sales/all')"
            @navigate-to-reports="() => router.push('/app/panel')"
            @logout="handleLogout"
          />

          <HeaderNotAuthenticated 
            v-else
            @wants-be-creator="handlerWantsToBeCreator"
          />
        </HeaderLoader>
      </template>
      <template #content>
        <Splash :loading="loading">
        <slot />
      </Splash>
      </template>
    </MainContent>
  </div>
</template>

<script setup lang="ts">
import Header from '@/modules/auth/components/Header/Header.vue'
import HeaderNotAuthenticated from '@/modules/landing-page/components/Header/Header.vue'
import HeaderLoader from '@/modules/auth/components/Header/Loader.vue'
import { useSession } from '@/modules/auth/composables/useSession/useSession'
import { useMyself } from '@/modules/users/composables/useMyself/useMyself'

const router = useRouter()

const session = useSession()
const { loading, user } = useMyself()

const nickname = computed(() => user.value?.name 
  ? user.value?.name.split(' ')[0]
  : 'Usuário'
)

const profilePic = computed(() => user.value?.avatarUrl)

const handleLogout = async () => {
  const { error } = await session.logout()
  if(!error) {
    router.push('/')
  }
}

const handlerWantsToBeCreator = () => {
  router.push('/auth/login')
}
</script>

<style scoped>

</style>