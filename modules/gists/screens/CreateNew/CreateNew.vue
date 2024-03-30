<template>
  <WidgetDefault title="Qual gist você quer criar?" class="my-5">
    <HeadlineEdit />
  </WidgetDefault>

  <WidgetDefault title="Show me the code">
    <ClientOnly>
      <CodeEdit />
    </ClientOnly>
  </WidgetDefault>

</template>

<script setup lang="ts">
import { myselfKey } from '@/modules/users/composables/useMyself/useMyself'

import type { MyselfContextProvider } from '@/modules/users/composables/useMyself/types'

import HeadlineEdit from '@/modules/gists/components/HeadlineEdit/HeadlineEdit.vue'
import CodeEdit from '@/modules/gists/components/CodeEdit/CodeEdit.vue'

const { user, loading } = inject(myselfKey) as MyselfContextProvider
</script>