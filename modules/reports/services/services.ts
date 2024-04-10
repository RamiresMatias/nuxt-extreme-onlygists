import type { SupabaseClient } from "@supabase/supabase-js"
import type { Database } from '@/libs/supabase/scheme'
import { totalRevenueAdapter } from "@/modules/reports/services/adapters"
import type { RevenueRow } from "@/modules/reports/services/adapters"

export default (client: SupabaseClient<Database>) => ({
  async totalGistsPublished(userId: string) {
    const response = await client
      .from('gists')
      .select('*', { count: 'exact', head: true})
      .match({ profile_id: userId })

    return response.count
  },
  async totalFreeGistPublished(userId: string) {
    const response = await client
      .from('gists')
      .select('*', { count: 'exact', head: true})
      .match({ profile_id: userId, is_paid: false })

    return response.count
  },
  async totalPaidGistPublished(userId: string) {
    const response = await client
      .from('gists')
      .select('*', { count: 'exact', head: true})
      .match({ profile_id: userId, is_paid: true })

    return response.count
  },
  async totalSoldGistPublished(userId: string) {
    const response = await client
      .from('sales')
      .select('*, gists(profile_id)', { count: 'exact', head: true})
      .match({ 'gists.profile_id': userId })

    return response.count
  },
  async totalRevenue(userId: string) {
    const response = await client
      .from('sales')
      .select('gists(price, profile_id')
      .match({ 'gists.profile_id': userId})
      .returns<RevenueRow[]>()

    return totalRevenueAdapter(response.data)
  }
})