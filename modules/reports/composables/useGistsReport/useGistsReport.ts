import type {User} from '@/modules/users/entities/User/User'

interface UseGistsReportOptions {
  user: Ref<User | undefined | null>
  isMyself: boolean
}

export function useGistsReport({ user, isMyself}: UseGistsReportOptions) {
  const services = useServices()
  const { logAndTrack } = useLogger()

  const loading = ref<boolean>(true)
  const userId = ref<string>()

  const totalGists = ref<number>(0)
  const totalFreeGists = ref<number>(0)
  const totalPaidGists = ref<number>(0)
  const totalSoldGists = ref<number>(0)

  const fetchGistsReport = async () => {
    if(!userId.value) return

    loading.value = true

    try {
      
      const requests = [
        services.reports.totalGistsPublished(userId.value),
        services.reports.totalFreeGistPublished(userId.value),
        services.reports.totalPaidGistPublished(userId.value),
      ]

      if (isMyself) {
        requests.push(services.reports.totalSoldGistPublished(userId.value))
      }

      const [total, free, paid, sold] = await Promise.all(requests)

      totalGists.value = total ?? 0
      totalFreeGists.value = free ?? 0
      totalPaidGists.value = paid ?? 0
      totalSoldGists.value = sold ?? 0

    } catch (error) {
      logAndTrack(error)
    } finally {
      loading.value = false
    }
  }

  watchEffect(() => {
    if (!user.value) return

    userId.value = user.value.id
    fetchGistsReport()
  })

  return {
    totalGists,
    totalFreeGists,
    totalPaidGists,
    totalSoldGists,
    loading,
    fetchGistsReport
  }
}