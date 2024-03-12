<template>
  <div class="card">
    <Card>
      <template #title>
        <div class="flex flex-wrap gap-2">
          {{ props.title }}
          <Chip :label="props.lang" icon="pi pi-bolt" class="text-sm"/>
        </div>
      </template>
      <template #content>
        <div v-html="description"></div>
      </template>
      <template #footer>
        <Button 
          v-if="isFree" 
          label="Baixar gratuitamente" 
          class="w-full" 
          @click="handleClick"
          icon="pi pishopping-bag"
          icon-pos="right"
        ></Button>
        <Button 
          v-else
          :label="`Comprar por ${amount}`" 
          class="w-full" 
          @click="handleClick"
          icon="pi pishopping-bag"
          icon-pos="right"
        ></Button>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
const {render} = useMarkdown()

const emit = defineEmits<{
  (e: 'tap', id: string): void
}>()

const props = withDefaults(defineProps<{
  id: string
  title: string
  description: string
  price: number
  lang: string
}>(), {
  id: '123',
  title: 'useCurrentUSer.ts',
  description: 'Hook para controllar o <strong>usuário</strong> logado',
  price: 10,
  lang: 'TypeScript'
})

const isFree = computed(() => props.price === 0)
const description = computed(() => render(props.description))
const amount = computed(() => Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(props.price))

const handleClick = () => emit('tap', props.id)

</script>