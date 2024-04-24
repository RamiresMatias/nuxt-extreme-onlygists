<template>
  <PublicHeadlineLoader :loading="loading">
    <PublicHeadline
      v-if="gist"
      :title="gist.title"
      :description="gist.description"
      :author="gist.profiles.username"
      :lang="gist.lang"
    />
    <PublicHeadlineLoaderEmpty v-else />
  </PublicHeadlineLoader>

  <GistCodeSnippet 
    v-if="gist"
    :loading="loadingContent"
    :code="gistContent"
    :lang="gist.lang"
    :is-paid="gist.isPaid"
  />

  <div v-if="gist" class="flex flex-col md:flex-row gap-2">
    <Button 
      v-if="gist && user?.username?.toLowerCase() !== usernameRoute"
      :label="`Comprar por ${gist.price}`"
      class="mt-5 w-full md:w-auto"
      icon-pos="right"
      icon="pi pi-shopping-bag"
      @click="handlePay"
    />

    <Button 
      v-if="isLogged() && user?.username === usernameRoute"
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
import PublicHeadlineLoaderEmpty from '@/modules/gists/components/PublicHeadline/Empty.vue'
import GistCodeSnippet from '@/modules/gists/components/CodeSnippet/CodeSnippet.vue'
import LazyDialogPaymentSuccess from '@/modules/payments/components/DialogPaymentSuccess/DialogPaymentSuccess.vue'
import LazyDialogPaymentError from '@/modules/payments/components/DialogPaymentError/DialogPaymentError.vue'

import { useGistContent } from '@/modules/gists/composables/useGistContent/useGistContent'
import { useStripeCheckout } from '@/modules/payments/composables/useStripeCheckout/useStripeCheckout'

import { useSession } from '@/modules/auth/composables/useSession/useSession'
import { myselfKey } from '@/modules/users/composables/useMyself/useMyself'
import type { MyselfContextProvider } from '@/modules/users/composables/useMyself/types'

const services = useServices()
const { isLogged } = useSession()
const { user } = inject(myselfKey) as MyselfContextProvider

const route = useRoute()
const router = useRouter()

const isPaymentSuccessfully = ref<boolean>(false)
const isPaymentFail = ref<boolean>(false)
const gistId = route.params.id as string

const clickHandlerNavigateToGistEdit = () => {
  router.push(`/app/gist/${route.params.id}/edit`)
}

const usernameRoute = computed(() => (route.params.username as string).toLowerCase())

/**
 * @info Carrega a informação no lado do servidor (Server-Side Rendering)
 * facilitando a indexação da página no Google
 */
const { data: gist, pending: loading} = await useAsyncData('gist-detail', () => {
  return services.gists.readOne(gistId)
})
const {gistContent, loading: loadingContent} = useGistContent({gist})

const { checkoutUrl, createCheckoutUrl } = useStripeCheckout()

onMounted(() => {
  const {success_payment, fail_payment} = route.query

  if(success_payment) isPaymentSuccessfully.value = true

  if(fail_payment) isPaymentFail.value = true
})

defineOgImage({
  component: 'GistDetail',
  props: {
    title: `${gist.value?.title} by @${gist.value?.profiles.username}`,
    description: `Veja o gist de ${gist.value?.profiles.name} no onlygists`
  }
})

useSeoMeta({
  title: `${gist.value?.title} by @${gist.value?.profiles.username}`,
  ogTitle: `${gist.value?.title} by @${gist.value?.profiles.username}`,
  description: `Veja o gist de ${gist.value?.profiles.name} no onlygists`,
  ogDescription: `Veja o gist de ${gist.value?.profiles.name} no onlygists`,
})

const handlePay = async () => {
  await createCheckoutUrl({
    username: route.params.username as string,
    gistId: route.params.id as string
  })

  console.log(checkoutUrl.value);
  if (!checkoutUrl.value) return

  window.location.href = checkoutUrl.value
}
</script>