import type { SupabaseClient } from "@supabase/supabase-js"
import type { Database } from '@/libs/supabase/scheme'
import { readAllSalesAdapter, type ReadAllSalesRow } from "@/modules/payments/services/adapters"
import type { AxiosInstance } from "axios"
import type { CreateCheckoutOptions, CreateCheckoutResponse, CreatePayoutAccounResponse, IsAccountValidResponse } from "@/modules/payments/services/types"

export default (client: SupabaseClient<Database>, httpClient: AxiosInstance) => ({
  async readAllSales(userId: string) {
    const response = await client
      .from('sales')
      .select('id, customer_email, created_at, gists(title, profile_id, price)')
      .eq('gists.profile_id', userId)
      .returns<ReadAllSalesRow[]>()

    return readAllSalesAdapter(response.data)
  },
  async createCheckout({ username, gistId }: CreateCheckoutOptions) {
    const response = await httpClient.post<CreateCheckoutResponse>('/payments/checkout', {
      username,
      gistId
    })

    return response
  },
  async createPayoutAccount(email: string) {
    const response = await httpClient.post<CreatePayoutAccounResponse>('/payments/accounts', { email })
    return response
  },
  async isAccountValid(accountId: string) {
    const response = await httpClient.get<IsAccountValidResponse>(`/payments/accounts/${accountId}/valid`)
    return response
  }
})