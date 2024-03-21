import type { User } from "@/modules/users/entities/User/User"
import {useSession} from '@/modules/auth/composables/useSession/useSession'
import type { MyselfContextProvider } from "./types"
import type { InjectionKey } from "vue"

// Serve como identificador único para objetos em toda aplicação
export const myselfKey = Symbol('myself')as InjectionKey<MyselfContextProvider> 

export function useMyself() {
  const { logAndTrack } = useLogger()
  const services = useServices()
  const session = useSession()
  const loading = ref<Boolean>(true)
  const user = ref<User>()

  provide<MyselfContextProvider>(myselfKey, { user, loading })

  const fetchUser = async () => {
    loading.value = true
    try {
      
      const response = await services.users.getMySelf(session.user.value?.id!)
      if(!response) return
      user.value = response
    } catch (error) {
      logAndTrack(error)
    } finally {
      loading.value = false
    }
  }

  onMounted(() => {
    fetchUser()  
  })

  return {
    loading,
    user
  }
}