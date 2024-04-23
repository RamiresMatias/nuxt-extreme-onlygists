<template>
  <PaymentSetupAlert v-if="!isValid && !paymentCreateLoading" :loading="paymentCreateLoading" @setup="handlePaymentSetup" />
  <WidgetGroup v-if="user">
    <WidgetGroupLoader :loading="reportLoading" :amount="3">
      <WidgetCondensed label="Total de Gists" :value="totalGists" />
      <WidgetCondensed label="Gists gratuitos" :value="totalFreeGists" />
      <WidgetCondensed label="Gists pagos" :value="totalPaidGists" />
      <WidgetCondensed label="Gists vendidos" :value="totalSoldGists" />
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
import WidgetGroup from '@/modules/reports/components/Widgets/Group/Group.vue'
import WidgetGroupLoader from '@/modules/reports/components/Widgets/Group/Loader.vue'
import WidgetCondensed from '@/modules/reports/components/Widgets/Condensed/Condensed.vue'
import GistsCardGroup from '@/modules/gists/components/Card/Group/Group.vue'
import GistCardItem from '@/modules/gists/components/Card/Item/Item.vue'
import GistCardGroupLoader from '@/modules/gists/components/Card/Group/Loader.vue'
import PaymentSetupAlert from '@/modules/payments/components/PaymentSetupAlert/PaymentSetupAlert.vue'

import type { MyselfContextProvider } from '@/modules/users/composables/useMyself/types'
import { myselfKey } from '@/modules/users/composables/useMyself/useMyself'
import { useGistsReport } from '@/modules/reports/composables/useGistsReport/useGistsReport'
import { useGistList } from '@/modules/gists/composables/useGistList/useGistList'
import { useStripeAccountCreate } from '@/modules/payments/composables/useStripeAccountCreate/useStripeAccountCreate'
import { useStripeAccountValidate } from '@/modules/payments/composables/useStripeAccountValidate/useStripeAccountValidate'

import { useScroll } from '@vueuse/core'


const { user } = inject(myselfKey) as MyselfContextProvider

const router = useRouter()

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
} = useGistList({ username: user.value?.username! })

const { loading: paymentCreateLoading, create } = useStripeAccountCreate()
const { isValid, validate } = useStripeAccountValidate()

const handleNavigateToDetail = (id: string) => {
  router.push(`/${user.value?.username}/gist/${id}`)
}

const handlePaymentSetup = async () => {
  const response = await create(user.value?.email!)

  if (!response) {
    return
  }

  window.location.href = response.onboardingUrl
}

onMounted(() => {
  validate(user.value?.paymentConnectedAccount)
})
</script>