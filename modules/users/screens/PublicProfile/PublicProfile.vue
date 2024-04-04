<template>
  <PublicHeadline 
    v-if="user"
    :avatar-url="user.avatarUrl"
    :name="user.name"
    :bio="user.bio"
    :city="user.address.city"
    :state="user.address.state"
    class="my-10"
  />
  <PublicHeadlineEmpty v-else />
  <WidgetGroup>
    <WidgetGroupLoader :loading="reportLoading" :amount="3">
      <WidgetCondensed label="Total de Gists" :value="totalGists" />
      <WidgetCondensed label="Gists gratuitos" :value="totalFreeGists" />
      <WidgetCondensed label="Gists pagos" :value="totalPaidGists" />
    </WidgetGroupLoader>
  </WidgetGroup>

  <WidgetDefault title="Todos os gists">
    <GistsCardGroup>
      <GistCardGroupLoader :loading="false" :amount="4">
        <GistCardItem 
          @tap="handleNavigateToDetail"
          id="123"
          title="usecurrentuser.ts"
          description="Hook para controlar a **store** do usuário"
          :price="10"
          lang="Typescript" 
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

const handleNavigateToDetail = (id: string) => {
  const {username} = route.params

  router.push(`/${username}/gists/${id}`)
}
</script>