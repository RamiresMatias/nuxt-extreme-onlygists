<template>
  <HeadlineEditLoader :loading="loading">
    <HeadlineEdit 
      :username="user?.username!" 
      :avatar-url="user?.avatarUrl!" 
      @navigate-to-profile="handleNavigateToProfile"
      @share="handleShare"
      class="my-10"
    />
  </HeadlineEditLoader>
  <WidgetDefault title="Informações básicas">
    <BasicInfoForm />
  </WidgetDefault>
  <WidgetDefault title="Endereço" class="mt-5">
    <AddressForm />
  </WidgetDefault>
</template>

<script setup lang="ts">
import HeadlineEdit from '@/modules/users/components/HeadlineEdit/HeadlineEdit.vue'
import HeadlineEditLoader from '@/modules/users/components/HeadlineEdit/Loader.vue'
import BasicInfoForm from '@/modules/users/components/BasicInfoForm/BasicInfoForm.vue'
import AddressForm from '@/modules/users/components/AddressForm/AddressForm.vue'
import type { MyselfContextProvider } from '@/modules/users/composables/useMyself/types'
import { myselfKey } from '@/modules/users/composables/useMyself/useMyself'

const { user, loading } = inject(myselfKey) as MyselfContextProvider

const handleNavigateToProfile = () => {}
const handleShare = () => {}
</script>