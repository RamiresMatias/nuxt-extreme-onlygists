import type { SupabaseClient } from "@supabase/supabase-js"
import type { Database } from '@/libs/supabase/scheme'
import { getMySelfAdapter, searchAddressByZipCodeAdapter } from "./adapters"
import type { AxiosInstance } from 'axios'
import type { SearchAddressResponse } from "./types"
import type { User } from "../entities/User/User"


export default (client: SupabaseClient<Database>, httpClient: AxiosInstance) => ({
  async searchAddressByZipCode(zipCode: string) {
    const url = `https://viacep.com.br/ws/${zipCode}/json/`
    const response = await httpClient.get<SearchAddressResponse>(url)
    const address = searchAddressByZipCodeAdapter(response.data)
    return address
  }, 
  async getMySelf(id: string) {
    const response = await client.from('profiles').select('*').eq('id', id).limit(1).single()
    const user = getMySelfAdapter(response.data)
    return user
  },
  async update(id: string, { name, site, bio, phone, address }: User) {
    await client.from('profiles').update({
      name,
      site,
      bio,
      phone,
      address: {
        zipCode: address.zipCode,
        city: address.city,
        number: address.number,
        state: address.state,
        street: address.street,
        neighborhood: address.neighborhood,
        complement: address.complement
      }
    }).eq('id', id)

    return { id }
  },
  async readOneByUsername(username: string) {
    const response = await client.from('profiles')
      .select()
      .eq('username', username)
      .limit(1)
      .single()

    const user = getMySelfAdapter(response.data)
    return user
  }
})