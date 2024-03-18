import useSession from '@/modules/auth/composables/useSession/useSession'

export default defineNuxtRouteMiddleware(async (to, from) => {
  const session = useSession()
  const isLogged = await session.isLogged()

  if(!isLogged && to.path === '/auth/login') return

  if(!isLogged) {
    console.log('user not authenticated')
    return navigateTo({ path: '/auth/login' })
  }
})