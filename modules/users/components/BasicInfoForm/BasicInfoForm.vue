<template>
  <div class="flex flex-col gap-4">
    <div class="flex flex-col lg:flex-row gap-2">
      <div class="flex flex-col gap-2 flex-1 lg:flex-row">
        <div class="flex flex-col gap-2 flex-1">
          <label for="name">Nome</label>
          <InputText id="name" placeholder="Nome do usuário" v-model="user.name"></InputText>
          <small v-if="props.errors?.name">{{ props.errors?.name?._errors[0] }}</small>
        </div>
        <div class="flex flex-col gap-2 flex-1">
          <label for="site">Site</label>
          <InputText id="site" placeholder="www.meusite.com.br" v-model="user.site"></InputText>
          <small v-if="props.errors?.site">{{ props.errors?.site?._errors[0] }}</small>
        </div>
      </div>
    </div>
    <div class="flex flex-col lg:flex-row gap-2">
      <div class="flex flex-col gap-2 flex-1">
        <div class="flex flex-col gap-2 flex-1">
          <label for="bio">Bio</label>
          <InputText id="bio" placeholder="Software Developer" v-model="user.bio"></InputText>
          <small v-if="props.errors?.bio">{{ props.errors?.bio?._errors[0] }}</small>
        </div>
        <div class="flex flex-col gap-2 flex-1">
          <label for="phone">Phone</label>
          <InputText id="phone" placeholder="(00) 0 0000 0000" v-model="user.phone"></InputText>
          <small v-if="props.errors?.phone">{{ props.errors?.phone?._errors[0] }}</small>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ZodFormattedError } from 'zod'
import type { User } from '@/modules/users/entities/User/User.ts'

const props = defineProps<{
  errors?: ZodFormattedError<User>
}>()

const user = defineModel<User>({
  required: false,
  default: {
    name: '',
    site: '',
    bio: '',
    phone: ''
  }
})
</script>