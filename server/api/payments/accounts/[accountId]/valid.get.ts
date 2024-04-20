import { useServerStripe } from '#stripe/server'

export default defineEventHandler(async (event) => {
  const accountId = getRouterParam(event, 'accountId')

  if (!accountId) {
    throw createError({ status: 400, message: '`accountId` é obrigatório' })
  }

  if (!event.context.auth.isAuthenticated) {
    throw createError({ status: 401, message: 'usuário não autenticado' })
  }

  const stripe = await useServerStripe(event)
  const account = await stripe.accounts.retrieve(accountId)

  return {
    isValid: account.details_submitted
  }
})