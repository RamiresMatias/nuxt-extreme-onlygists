<template>
  <PublicHeadline />
  <WidgetGroup>
    <WidgetGroupLoader :loading="false" :amount="3">
      <WidgetCondensed label="Gists do total" :value="10" />
      <WidgetCondensed label="Gists gratuitos" :value="5" />
      <WidgetCondensed label="Gists pagos" :value="5" />
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
import WidgetGroup from '@/modules/reports/components/Widgets/Group/Group.vue'
import WidgetGroupLoader from '@/modules/reports/components/Widgets/Group/Loader.vue'
import WidgetCondensed from '@/modules/reports/components/Widgets/Condensed/Condensed.vue'
import GistsCardGroup from '@/modules/gists/components/Card/Group/Group.vue'
import GistCardItem from '@/modules/gists/components/Card/Item/Item.vue'
import GistCardGroupLoader from '@/modules/gists/components/Card/Group/Loader.vue'

const route = useRoute()
const router = useRouter()

const handleNavigateToDetail = (id: string) => {
  const {username} = route.params

  router.push(`/${username}/gists/${id}`)
}
</script>