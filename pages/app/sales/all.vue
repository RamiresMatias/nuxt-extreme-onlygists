<template>
  <Sales />
</template>

<script setup lang="ts">
import Sales from '@/modules/payments/screens/Sales/Sales.vue'

definePageMeta({
  layout: 'admin',
  middleware: ['auth']
})

useHead({
  title: 'Vendas | 🥺 onlygists'
})
</script>