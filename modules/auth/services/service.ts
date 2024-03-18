import type { SupabaseClient } from "@supabase/supabase-js";

interface ServiceOptions {
  redirectUrl: string
}

export default (client: SupabaseClient, options: ServiceOptions) => ({
  async signinWithGithub() {
    const response = await client.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: options.redirectUrl
      }
    })
    return response
  },

  async signOut() {
    const response = await client.auth.signOut()
    return response
  }
})