<template>
  <div>
    {{ user?.name }}
  </div>
</template>

<script setup lang="ts">
import { myselfKey } from '@/modules/users/composables/useMyself/useMyself'
import type { MyselfContextProvider } from '@/modules/users/composables/useMyself/types'

const { user, loading } = inject(myselfKey) as MyselfContextProvider

</script>