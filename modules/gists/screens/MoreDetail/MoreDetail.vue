<template>
  <PublicHeadlineLoader :loading="true">
    <PublicHeadline />
  </PublicHeadlineLoader>
  <GistCodeSnippet />

  <div class="flex flex-col md:flex-row gap-2">
    <Button 
      label="Comprar por 10"
      class="mt-5 w-full md:w-auto"
      icon-pos="right"
      icon="pi pi-shopping-bag"    
    />

    <Button 
      v-if="isLogged() && user?.username === route.params.username"
      label="Editar este gist"
      class="mt-5 w-full md:w-auto"
      icon-pos="right"
      icon="pi pi-pencil"
      @click="clickHandlerNavigateToGistEdit()"    
    />
  </div>

  <LazyDialogPaymentSuccess v-model:visible="isPaymentSuccessfully" />
  <LazyDialogPaymentError v-model:visible="isPaymentFail" />
</template>

<script setup lang="ts">
import PublicHeadline from '@/modules/gists/components/PublicHeadline/PublicHeadline.vue'
import PublicHeadlineLoader from '@/modules/gists/components/PublicHeadline/Loader.vue'
import GistCodeSnippet from '@/modules/gists/components/CodeSnippet/CodeSnippet.vue'
import LazyDialogPaymentSuccess from '@/modules/payments/components/DialogPaymentSuccess/DialogPaymentSuccess.vue'
import LazyDialogPaymentError from '@/modules/payments/components/DialogPaymentError/DialogPaymentError.vue'

import { useSession } from '@/modules/auth/composables/useSession/useSession'
import { myselfKey } from '@/modules/users/composables/useMyself/useMyself'
import type { MyselfContextProvider } from '@/modules/users/composables/useMyself/types'

const { isLogged } = useSession()
const { user } = inject(myselfKey) as MyselfContextProvider

const isPaymentSuccessfully = ref<boolean>(false)
const isPaymentFail = ref<boolean>(false)

const route = useRoute()
const router = useRouter()

const clickHandlerNavigateToGistEdit = () => {
  router.push(`/app/gist/${route.params.id}/edit`)
}

onMounted(() => {
  const {success_payment, fail_payment} = route.query

  if(success_payment) isPaymentSuccessfully.value = true

  if(fail_payment) isPaymentFail.value = true
})
</script>