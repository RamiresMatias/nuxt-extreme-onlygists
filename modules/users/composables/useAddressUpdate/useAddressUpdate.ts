import type { User } from '@/modules/users/entities/User/User'
import type { Address } from '@/modules/users/entities/Address/Address'

interface UserAddressUpdateOptions {
  user: Ref<User | undefined>
}

const INITIAL_ADDRESS_INFO = {
  zipCode: '',
  number: '',
  street: '',
  city: '',
  state: '',
  neighborhood: '',
  complement: ''
}

export function useAddressUpdate({ user }: UserAddressUpdateOptions) {

  const services = useServices()
  const { logAndTrack } = useLogger()

  const loading = ref<boolean>(false)
  const address = ref<Address>(INITIAL_ADDRESS_INFO)

  watchEffect(() => {
    if (!user.value) return
    
    address.value = user.value.address ?? INITIAL_ADDRESS_INFO
  })

  const searchZipCode = async () => {
    if(!address.value.zipCode) return

    try {
      loading.value = true
      const data = await services.users.searchAddressByZipCode(address.value.zipCode)
      address.value = data
    } catch (error) {
      logAndTrack(error)
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    address,
    searchZipCode
  }
}