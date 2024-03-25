<template>
  <div class="flex flex-col gap-4">
    <div class="flex flex-col lg:flex-row gap-2">
      <div class="flex flex-col gap-2 flex-1 lg:flex-row">
        <div class="flex flex-col gap-2 flex-1">
          <label for="zipCode">
            CEP
            <i v-if="props.loading" class="pi pi-spinner text-gray-500 animate-spin" />
          </label>
          <InputText 
            id="zipCode" 
            placeholder="00000-000" 
            v-maska 
            data-maska="#####-###" 
            v-model="address.zipCode"
            @blur="() => emit('trigger-address-search')"
          ></InputText>
        </div>
        <div class="flex flex-col gap-2 flex-1">
          <label for="number">Número</label>
          <InputText 
            id="number" 
            placeholder="000" 
            v-model="address.number"
          ></InputText>
        </div>
      </div>
    </div>
    <div class="flex flex-col lg:flex-row gap-2">
      <div class="flex flex-col gap-2 flex-1">
        <label for="city">Cidade</label>
        <InputText id="city" placeholder="Xique-xique" v-model="address.city"></InputText>
      </div>
      <div class="flex flex-col gap-2 flex-1">
        <label for="state">Estado</label>
        <InputText id="state" placeholder="Bahia" v-model="address.state"></InputText>
      </div>
    </div>
    <div class="flex flex-col lg:flex-row gap-2">
      <div class="flex flex-col gap-2 flex-1">
        <label for="neighborhood">Bairro</label>
        <InputText id="neighborhood" placeholder="Bairro..." v-model="address.neighborhood"></InputText>
      </div>
      <div class="flex flex-col gap-2 flex-1">
        <label for="complement">Complemento</label>
        <InputText id="complement" placeholder="Complemento..." v-model="address.complement"></InputText>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ZodFormattedError } from 'zod'
import type { Address } from '@/modules/users/entities/Address/Address.ts'

const props = defineProps<{
  loading: boolean
}>()

const address = defineModel<Address>({
  required: true,
  default: {
    zipCode: '',
    number: '',
    street: '',
    city: '',
    state: '',
    neighborhood: '',
    complement: ''
  },
})

const emit = defineEmits<{
  (e: 'trigger-address-search')
}>()
</script>