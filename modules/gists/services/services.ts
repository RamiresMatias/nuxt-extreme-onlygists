import type { SupabaseClient } from "@supabase/supabase-js"
import type { Database } from '@/libs/supabase/scheme'
import type { CreateOptions } from '@/modules/gists/services/types'
import { v4 as uuidv4 } from 'uuid'
import { readOneAdapter, type ReadOneRow } from "@/modules/gists/services/adapters"

export default (client: SupabaseClient<Database>) => ({
  async create({title, description, price, content, lang, profileId}: CreateOptions) {
    
    const id = uuidv4()
    const isPaid = price !== 0

    await client.from('gists').insert({
      id,
      title,
      description,
      price,
      content,
      lang,
      profile_id: profileId,
      is_paid: isPaid
    })

    return { id }
  },

  async readOne(id: string) {
    const response = await client
      .from('gists')
      .select('id, title, description, lang, price, is_paid, profiles (id, username)')
      .match({ id })
      .returns<ReadOneRow>()
      .single()

    return readOneAdapter(response.data)
  },

  async readOneContent(id: string) {
    const response = await client
      .from('gists')
      .select('id, content')
      .match({ id })
      .returns<ReadOneRow>()
      .single()

    return readOneAdapter(response.data)
  }
})