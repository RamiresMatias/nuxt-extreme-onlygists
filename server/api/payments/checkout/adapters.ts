import type { GistVirtual } from "@/modules/gists/entities/Gist/Gist"
import type { Database } from "@/libs/supabase/scheme"

export type GistTable = Database['public']['Tables']['gists']

export type ReadOneRow = GistTable['Row']

export function readOneSimpleAdapter(data: ReadOneRow | null): Pick<GistVirtual, 'id' | 'price'> | null {
  if(!data) return null

  return {
    id: data.id,
    price: data.price,
  }
}
