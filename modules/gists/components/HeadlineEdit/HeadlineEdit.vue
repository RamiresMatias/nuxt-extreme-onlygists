<template>
  <div class="w-full flex flex-col justify-center gap-8">
    <div class="flex flex-col md:flex-row gap-2">
      <div class="flex flex-col gap-2 flex-1">
        <label for="gist-title">Título</label>
        <InputText type="text" placeholder="useCurrentUser.ts" id="gist-title" v-model="headline.title"></InputText>
        <small v-if="props.errors?.title">{{ props.errors?.title._errors[0] }}</small>
      </div>
      <div class="flex flex-col gap-2">
        <label for="gist-price">Preço</label>
        <SelectButton v-model="headline.price" :options="priceOptions" option-value="price" option-label="name" />
      </div>
    </div>
    <div class="flex flex-col gap-2">
      <label for="gist-description">Documentação</label>
      <Textarea id="gist-description" rows="10" class="w-full" v-model="headline.description" placeholder="useCurrentUser() é um hook..." />
      <small class="text-gray-600">Markdown é suportado.</small>
      <small v-if="props.errors?.description">{{ props.errors?.description._errors[0] }}</small>
    </div>
  </div>
</template>

<script setup lang="ts">
// @ts-ignore--
import getProgrammingLanguage from 'detect-programming-language'
import type { Gist, Headline } from '@/modules/gists/entities/Gist/Gist'
import type { ZodFormattedError } from 'zod'

const props = defineProps<{
  errors?: ZodFormattedError<Gist>
}>()

const emit = defineEmits<{
  (e: 'language-change', lang: string): void
}>()

const headline = defineModel<Headline>({
  required: true,
  default: {
    title: '',
    description: '',
    price: 0,
  }
})

const extension = computed(() => {
  const values = headline.value.title.split('.')
  if (values.length === 0) return ''
  const ext = values.at(-1)
  return `.${ext}`
})

watch(
  () => headline.value.title, 
  () => {
  const mimeType = getProgrammingLanguage(extension.value)
  if (mimeType) emit('language-change', mimeType.toLowerCase())
})

const priceOptions = [
  {name: 'Grátis', price: 0},
  {name: 'R$ 5', price: 5},
  {name: 'R$ 10', price: 10},
  {name: 'R$ 25', price: 25},
]
</script>