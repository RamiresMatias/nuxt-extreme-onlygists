export function useSession() {

  const user = useSupabaseUser()
  const services = useServices()

  const isLogged = async () => {
    const hasUserLogged = Boolean(user.value)
    return hasUserLogged
  }

  const logout = async () => {
    const response: any = await services.auth.signOut()
    return response
  }

  return {
    user,
    logout,
    isLogged  
  }
}