import {applyPayoutFeesToGrossValue} from '@/modules/payments/entities/Sale/Sale'

interface UseSalesReportOptions {
  userId: string
}

export function useSalesReport({ userId }: UseSalesReportOptions) {

  const { logAndTrack } = useLogger()
  const services = useServices()
  const loading = ref<boolean>(true)
  const grossRevenue = ref<number>(0)
  const netRevenue = ref<number>(0)

  const fetchRevenue = async () => {
    if(!userId) return
    loading.value = true
    try {
      
      const total = await services.reports.totalRevenue(userId)
      grossRevenue.value = total ?? 0
      netRevenue.value = applyPayoutFeesToGrossValue((total ?? 0))
    } catch (error) {
      logAndTrack(error)
    } finally {
      loading.value = false
    }
  }

  onMounted(() => {
    fetchRevenue()
  })

  return {
    loading,
    grossRevenue,
    netRevenue
  }
}