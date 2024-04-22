export function useStripeAccountValidate() {
  const { logAndTrack } = useLogger()
  const loading = ref<boolean>(false)
  const isValid = ref<boolean>(false)
  const services = useServices()

  const validate = async (accountId?: string) => {

    if(!accountId) {
      isValid.value = false
      return
    }

    loading.value = true
    try {
      const response = await services.payments.isAccountValid(accountId)
      isValid.value = response.data.isValid
    } catch (error) {
      logAndTrack(error)
    } finally {
      loading.value = false
    }

  }
  
  return {
    isValid,
    loading,
    validate
  }
}