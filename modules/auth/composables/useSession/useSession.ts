
export default function useServices() {

  const user = useSupabaseUser()
  const services = useServices()

  const isLogged = async () => {
    const hasUserLogged = Boolean(user.value)
    return hasUserLogged
  }

  const logout = async () => {
    const response: any = await services.logout()
    return response
  }

  return {
    user,
    logout,
    isLogged  
  }
}