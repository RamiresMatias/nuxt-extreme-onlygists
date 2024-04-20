import { useServerStripe } from '#stripe/server'
import { serverSupabaseClient } from '#supabase/server'
import { Database } from '@/libs/supabase/scheme'

interface RequestOptions {
  email: string
}

export default defineEventHandler(async (event) => {
  const payload = await readBody<RequestOptions>(event)

  if (!payload.email) {
    throw createError({ status: 400, message: 'Email é obrigatório' })
  }

  if (!event.context.auth.isAuthenticated) {
    throw createError({ status: 401, message: 'usuário não autenticado' })
  }

  const config = useRuntimeConfig()
  const stripe = await useServerStripe(event)
  const supabase = await serverSupabaseClient<Database>(event)

  const account = await stripe.accounts.create({
    type: 'express',
    email: payload.email,
    country: 'BR',
    business_type: 'individual'
  })

  await supabase.from('profiles').update({
    payment_connected_account: account.id
  }).eq('email', payload.email)

  const accountLink = await stripe.accountLinks.create({
    account: account.id,
    refresh_url: `${config.public.siteUrl}/app/panel`,
    return_url: `${config.public.siteUrl}/app/panel`,
    type: 'account_onboarding'
  })

  return {
    accountId: account.id,
    onboardingUrl: accountLink.url
  }
})