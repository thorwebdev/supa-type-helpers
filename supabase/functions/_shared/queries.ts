import { SupabaseClient, QueryData } from 'npm:@supabase/supabase-js@2.39.0'
import { Database } from './database.types.ts'

export function getCountriesWithCities(client: SupabaseClient<Database>) {
  return client.from('countries').select(`
  id,
  name,
  cities (
    id,
    name
  )
`)
}
export type CountriesWithCities = QueryData<
  ReturnType<typeof getCountriesWithCities>
>

export function getCountryById(client: SupabaseClient<Database>, id: number) {
  return client
    .from('countries')
    .select(
      `
  id,
  name,
  cities (
    id,
    name
  )
`
    )
    .eq('id', id)
    .single()
}

export type CountryWithCities = QueryData<ReturnType<typeof getCountryById>>
