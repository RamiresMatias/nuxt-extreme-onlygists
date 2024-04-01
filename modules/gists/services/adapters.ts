import type { GistVirtual } from "@/modules/gists/entities/Gist/Gist"
import type { Database } from "@/libs/supabase/scheme"

type GistTable = Database['public']['Tables']['gists']
type ProfileTableRow = Database['public']['Tables']['profiles']

export type ReadOneRow = GistTable['Row'] & {
  profiles: ProfileTableRow['Row'] | null
}

export function readOneAdapter(data: ReadOneRow | null): GistVirtual | null {
  if(!data) return null

  return {
    id: data.id,
    title: data.title,
    profileId: data.profile_id ?? '',
    description: data.description,
    isPaid: data.is_paid,
    price: data.price,
    profiles: {
      id: data.profiles?.id,
      username: data.profiles?.username
    },
    lang: data.lang,
    content: data.content,
    createdAt: new Date(data.created_at)
  }
}