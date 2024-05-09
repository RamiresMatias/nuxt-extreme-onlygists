import { useServerStripe } from '#stripe/server'
import { serverSupabaseClient } from '#supabase/server'
import { Database } from '@/libs/supabase/scheme'
import { v4 as uuidV4 } from 'uuid'
import JSZip from 'jszip'
import { Resend } from 'resend'
import { useCompiler } from '#vue-email'

interface StripeEvent {
  client_reference_id: string
  customer_details: {
    name: string
    email: string
  }
}

export default defineEventHandler(async (event) => {
  const body = await readRawBody(event)
  const stripe = await useServerStripe(event)
  const config = useRuntimeConfig()

  const { stripeWebhookSecret } = config
  const sig = getHeader(event, 'stripe-signature') ?? ''
  const stripeEvent = stripe.webhooks.constructEvent(body!, sig, stripeWebhookSecret)

  const allowedEvents = ['checkout.session.completed']

  if (!allowedEvents.includes(stripeEvent.type)) {
    return
  }

  const paymentIntentEvent = stripeEvent.data.object as StripeEvent
  const supabase = await serverSupabaseClient<Database>(event)

  const gist = await supabase
    .from('gists')
    .select('content, title, description')
    .eq('id', paymentIntentEvent.client_reference_id)
    .maybeSingle()

  const teste = await supabase
    .from('sales')
    .insert({
      id: uuidV4(),
      customer_email: paymentIntentEvent.customer_details.email,
      gists_id: paymentIntentEvent.client_reference_id
    })

  const zip = new JSZip()
  zip.file(gist.data?.title!, gist.data?.content!)
  zip.file('README.md', gist.data?.description!)

  const buffer = await zip.generateAsync({ type: 'nodebuffer' })
  const resend = new Resend(config.resendKey)

  // const template = await useCompiler('GistSale.vue', {
  //   props: {
  //     name: paymentIntentEvent.customer_details.name
  //   }
  // })

  // resend.emails.send({
  //   from: 'ramires@onlygistscode.com',
  //   to: paymentIntentEvent.customer_details.email,
  //   subject: 'Parabéns para compra do seu Gist',
  //   html: template.html,
  //   attachments: [
  //     {
  //       filename: `${gist.data?.title}.zip`,
  //       content: buffer
  //     }
  //   ]
  // })
})