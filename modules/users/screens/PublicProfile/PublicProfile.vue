<template>
  <PublicHeadline 
    v-if="user"
    :avatar-url="user.avatarUrl"
    :name="user.name"
    :bio="user.bio"
    :city="user.address?.city"
    :state="user.address?.state"
    class="my-10"
  />
  <PublicHeadlineEmpty v-else />
  <WidgetGroup v-if="user">
    <WidgetGroupLoader :loading="reportLoading" :amount="3">
      <WidgetCondensed label="Total de Gists" :value="totalGists" />
      <WidgetCondensed label="Gists gratuitos" :value="totalFreeGists" />
      <WidgetCondensed label="Gists pagos" :value="totalPaidGists" />
    </WidgetGroupLoader>
  </WidgetGroup>

  <WidgetDefault v-if="gists.length" title="Todos os gists">
    <GistsCardGroup>
      <GistCardGroupLoader :loading="loading" :amount="4">
        <GistCardItem 
          v-for="gist in gists"
          :key="gist.id"
          @tap="handleNavigateToDetail"
          :id="gist.id"
          :title="gist.title"
          :description="gist.description"
          :price="gist.price"
          :lang="gist.lang" 
        />
      </GistCardGroupLoader>
    </GistsCardGroup>
  </WidgetDefault>
</template>

<script setup lang="ts">
import PublicHeadline from '@/modules/users/components/PublicHeadline/PublicHeadline.vue'
import PublicHeadlineEmpty from '@/modules/users/components/PublicHeadline/Empty.vue'
import WidgetGroup from '@/modules/reports/components/Widgets/Group/Group.vue'
import WidgetGroupLoader from '@/modules/reports/components/Widgets/Group/Loader.vue'
import WidgetCondensed from '@/modules/reports/components/Widgets/Condensed/Condensed.vue'
import GistsCardGroup from '@/modules/gists/components/Card/Group/Group.vue'
import GistCardItem from '@/modules/gists/components/Card/Item/Item.vue'
import GistCardGroupLoader from '@/modules/gists/components/Card/Group/Loader.vue'
import { useGistsReport } from '@/modules/reports/composables/useGistsReport/useGistsReport'
import { useGistList } from '@/modules/gists/composables/useGistList/useGistList'
import { useScroll } from '@vueuse/core'

const route = useRoute()
const router = useRouter()
const services = useServices()

const {data: user} = await useAsyncData('user-public-profile', () => {
  const username = route.params.username as string
  return services.users.readOneByUsername(username)
})
const {
  totalFreeGists,
  totalGists,
  totalPaidGists,
  totalSoldGists,
  loading: reportLoading
} = useGistsReport({user, isMyself: false})

const {
  gists,
  loading,
  fetchMoreGistsByUsername
} = useGistList({ username: route.params.username as string })

const { arrivedState } = useScroll(window, {
  offset: { bottom: 100 }
})

watch(
  () => arrivedState.bottom,
  () => {
    if (!arrivedState.bottom && !loading.value) return
    
    fetchMoreGistsByUsername()
  }
)

const handleNavigateToDetail = (id: string) => {
  const {username} = route.params

  router.push(`/${username}/gist/${id}`)
}

defineOgImage({
  component: 'PublicProfile',
  props: {
    avatarUrl: user.value?.avatarUrl,
    author: user.value?.name,
    bio: user.value?.bio
  }
})

useSeoMeta({
  title: `${user.value?.name} - @${user.value?.username}`,
  ogTitle: `${user.value?.name} - @${user.value?.username}`,
  description: `Veja os gists de ${user.value?.name} no onlygists`,
  ogDescription: `Veja os gists de ${user.value?.name} no onlygists`
})
</script>