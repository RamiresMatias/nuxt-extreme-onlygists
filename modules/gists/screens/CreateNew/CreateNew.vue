<template>
  <WidgetDefault title="Qual gist você quer criar?" class="my-5">
    <HeadlineEdit v-model="headline" :errors="errors" @language-change="handleLanguageChange"/>
  </WidgetDefault>

  <WidgetDefault title="Show me the code">
    <ClientOnly>
      <CodeEdit v-model="code" :errors="errors" />
    </ClientOnly>
  </WidgetDefault>

  <Button 
    @click="handleCreateGist" 
    :loading="loading"
    class="mt-5 w-full md:w-auto"
    label="Criar"
    icon="pi pi-plus"
    icon-pos="right"
  />
</template>

<script setup lang="ts">
import { useGistCreate } from '@/modules/gists/composables/useGistCreate/useGistCreate'

import { myselfKey } from '@/modules/users/composables/useMyself/useMyself'

import type { MyselfContextProvider } from '@/modules/users/composables/useMyself/types'

import HeadlineEdit from '@/modules/gists/components/HeadlineEdit/HeadlineEdit.vue'
import CodeEdit from '@/modules/gists/components/CodeEdit/CodeEdit.vue'

const { user } = inject(myselfKey) as MyselfContextProvider

const router = useRouter()

const { loading, errors, headline, code, safeParse, create } = useGistCreate({user})

const handleCreateGist = async () => {
  const isValid = safeParse().success

  if(!isValid) return

  const response = await create()

  if(response?.id) {
    router.push(`/${user.value?.username}/gist/${response.id}`)
  }
}

const handleLanguageChange = (lang: string) => {
  code.value.lang = lang
}
</script>