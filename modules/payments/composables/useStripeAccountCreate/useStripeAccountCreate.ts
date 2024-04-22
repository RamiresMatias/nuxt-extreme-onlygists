export function useStripeAccountCreate() {

  const { logAndTrack } = useLogger()
  const loading = ref<boolean>(false)
  const services = useServices()

  const create = async (email: string) => {
    loading.value = true
    try {
      const response = await services.payments.createPayoutAccount(email)
      return response.data
    } catch (error) {
      logAndTrack(error)
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    create
  }
}