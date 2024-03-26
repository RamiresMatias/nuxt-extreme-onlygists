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
    <BasicInfoForm v-model="user" :errors="errors" />
  </WidgetDefault>
  <WidgetDefault title="Endereço" class="mt-5">
    <AddressForm 
      v-model="address" 
      @trigger-address-search="handleZipCodeSearch()" 
      :loading="addressLoading" 
    />
  </WidgetDefault>

  <Button
    @click="handleUpdateProfile()"
    :loading="updateLoading"
    class="mt-5 w-full md:w-auto"
    label="Atualizar"
    icon="pi pi-pencil"
    icon-pos="right"
  ></Button>
</template>

<script setup lang="ts">
import HeadlineEdit from '@/modules/users/components/HeadlineEdit/HeadlineEdit.vue'
import HeadlineEditLoader from '@/modules/users/components/HeadlineEdit/Loader.vue'
import BasicInfoForm from '@/modules/users/components/BasicInfoForm/BasicInfoForm.vue'
import AddressForm from '@/modules/users/components/AddressForm/AddressForm.vue'

import type { MyselfContextProvider } from '@/modules/users/composables/useMyself/types'

import { myselfKey } from '@/modules/users/composables/useMyself/useMyself'
import { useUsersProfileAction } from '@/modules/users/composables/useUsersProfileAction/useUsersProfileAction'
import { useAddressUpdate } from '@/modules/users/composables/useAddressUpdate/useAddressUpdate'
import { useUserUpdate } from '@/modules/users/composables/useUserUpdate/useUserUpdate'

const router = useRouter()

const { share } = useUsersProfileAction()
const { user, loading } = inject(myselfKey) as MyselfContextProvider
const { loading: addressLoading, searchZipCode, address } = useAddressUpdate({ user })
const { loading: updateLoading, safeParse, update, errors } = useUserUpdate({ user })

const handleNavigateToProfile = (username: string) => {
  router.push(`/${username}`)
}
const handleShare = (username: string) => share(username)

const handleZipCodeSearch = () => {
  searchZipCode()
}

const handleUpdateProfile = () => {
  const isValid = safeParse().success

  if(!isValid || !user.value) return

  user.value.address = address.value
  update()
}
</script>