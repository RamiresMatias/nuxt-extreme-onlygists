import AuthService from '@/modules/auth/services/services'
import UserServices from '@/modules/users/services/services'
import GistsService from '@/modules/gists/services/services'

import type { Database } from '@/libs/supabase/scheme'
import axios from 'axios'

export function useServices() {

  const supabaseClient = useSupabaseClient<Database>()
  const config = useRuntimeConfig()
  const httpClient = axios.create()

  return {
    auth: AuthService(supabaseClient, {
      redirectUrl: `${config.public.siteUrl}/auth/github`
    }),
    users: UserServices(supabaseClient, httpClient),
    gists: GistsService(supabaseClient)
  }
}