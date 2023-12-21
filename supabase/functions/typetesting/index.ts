import { createClient } from 'npm:@supabase/supabase-js@2.39.0'
import { Database } from '../_shared/database.types.ts'
import {
  CountriesWithCities,
  getCountriesWithCities,
} from '../_shared/queries.ts'

const supabase = createClient<Database>(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_ANON_KEY')!
)

Deno.serve(async (_req) => {
  const { data, error } = await getCountriesWithCities(supabase)
  if (error) throw error

  const countriesWithCities: CountriesWithCities = data
  const cities = data[0].cities

  return new Response(JSON.stringify({ countriesWithCities, cities }), {
    headers: { 'Content-Type': 'application/json' },
  })
})
