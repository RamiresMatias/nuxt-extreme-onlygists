import type { Database } from "@/libs/supabase/scheme"
import type { SaleVirtual } from '@/modules/payments/entities/Sale/Sale'

type SaleTable = Database['public']['Tables']['sales']
type GistTable = Database['public']['Tables']['gists']

export type ReadAllSalesRow = SaleTable['Row'] & {
  gists: GistTable['Row'] | null
}

export function readAllSalesAdapter(values: ReadAllSalesRow[] | null): SaleVirtual[] | [] {
  if(!values) return []

  return values.map(data => ({
    id: data.id,
    gistId: data.gists_id ?? '',
    customerEmail: data.customer_email,
    gists: {
      title: data.gists?.title ?? '',
      price: data.gists?.price ?? 0,
    },
    createdAt: new Date(data.created_at)
  }))
}

