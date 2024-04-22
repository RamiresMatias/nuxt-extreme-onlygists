import type { Database } from "@/libs/supabase/scheme"
import type { User } from '@/modules/users/entities/User/User'
import type { Address } from "@/modules/users/entities/Address/Address"
import type { SearchAddressResponse } from "./types"

type ProfileTable = Database['public']['Tables']['profiles']
type Row = ProfileTable['Row']

export function getMySelfAdapter(data: Row | null): User | null {
  if(!data) return null

  const address = data.address as unknown as Address
  return {
    id: data.id,
    avatarUrl: data.avatar_url,
    username: data.username,
    name: data.name,
    site: data.site ?? undefined,
    phone: data.phone ?? undefined,
    address,
    createdAt: new Date(data.created_at),
    bio: data.bio ?? undefined,
    email: data.email,
    paymentConnectedAccount: data.payment_connected_account ?? ''
  }
}

export function searchAddressByZipCodeAdapter(data: SearchAddressResponse): Address {
  return {
    zipCode: data.cep,
    state: data.uf,
    city: data.localidade,
    street: data.logradouro,
    complement: data.complemento,
    neighborhood: data.bairro,
    number: ''
  }
}