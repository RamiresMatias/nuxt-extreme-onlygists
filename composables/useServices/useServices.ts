import AuthService from '@/modules/auth/services/service'
import UserServices from '@/modules/users/services/services'
import type { Database } from '@/libs/supabase/scheme'

export function useServices() {

  const supabaseClient = useSupabaseClient<Database>()
  const config = useRuntimeConfig()
  return {
    auth: AuthService(supabaseClient, {
      redirectUrl: `${config.public.siteUrl}/auth/github`
    }),
    users: UserServices(supabaseClient)
  }
}