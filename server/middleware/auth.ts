import { serverSupabaseUser } from '#supabase/server'

export interface AuthContext {
  isAuthenticated: boolean
  user: { id: string } | null
}

export default defineEventHandler(async (event) => {
  const url = getRequestURL(event)
  const user = await serverSupabaseUser(event)

  const isWebHook = url.pathname.startsWith('/webhooks')
  const isApiCall = url.pathname.startsWith('/api')

  if (isWebHook || !isApiCall) return

  const contextAuth: AuthContext = {
    user,
    isAuthenticated: Boolean(user)
  }

  event.context.auth = contextAuth
})