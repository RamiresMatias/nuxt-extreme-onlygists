<template>
  <div>
    <PublicHeadline />
    <WidgetGroup>
      <WidgetGroupLoader :loading="false" :amount="3">
        <WidgetCondensed label="Gists do total" :value="10" />
        <WidgetCondensed label="Gists gratuitos" :value="5" />
        <WidgetCondensed label="Gists pagos" :value="5" />
      </WidgetGroupLoader>
    </WidgetGroup>
  </div>
</template>

<script setup lang="ts">
import PublicHeadline from '@/modules/users/components/PublicHeadline/PublicHeadline.vue'
import WidgetGroup from '@/modules/reports/components/Widgets/Group/Group.vue'
import WidgetGroupLoader from '@/modules/reports/components/Widgets/Group/Loader.vue'
import WidgetCondensed from '@/modules/reports/components/Widgets/Condensed/Condensed.vue'
</script>

<style scoped>

</style>