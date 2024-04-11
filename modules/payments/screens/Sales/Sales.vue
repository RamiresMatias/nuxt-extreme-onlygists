<template>
  <WidgetGroup v-if="user">
    <WidgetGroupLoader :loading="loading" :amount="2">
      <WidgetCondensed label="Valor bruto" :value="localeGrossValue" />
      <WidgetCondensed label="Valor para saque" :value="localeNetRevenue" />
    </WidgetGroupLoader>
  </WidgetGroup>
</template>

<script setup lang="ts">
import WidgetGroup from '@/modules/reports/components/Widgets/Group/Group.vue'
import WidgetGroupLoader from '@/modules/reports/components/Widgets/Group/Loader.vue'
import WidgetCondensed from '@/modules/reports/components/Widgets/Condensed/Condensed.vue'

import type { MyselfContextProvider } from '@/modules/users/composables/useMyself/types'
import { myselfKey } from '@/modules/users/composables/useMyself/useMyself'
import { currencyFormatBRL } from '@/libs/currency/format'
import { useSalesReport } from '@/modules/reports/composables/useGistsReport/useSalesReport/useSalesReport'
import { useSalesList } from '@/modules/payments/composables/useSalesList/useSalesList'

const { user } = inject(myselfKey) as MyselfContextProvider

const {
  loading,
  grossRevenue,
  netRevenue
} = useSalesReport({ userId: user.value?.id! })

const { sales, loading: loadingSales } = useSalesList({ userId: user.value?.id! })

const localeGrossValue = computed(() => {
  if (!grossRevenue.value) return 'R$ 0'
  return currencyFormatBRL(grossRevenue.value)
})
const localeNetRevenue = computed(() => {
  if (!netRevenue.value) return 'R$ 0'
  return currencyFormatBRL(netRevenue.value)
})
</script>