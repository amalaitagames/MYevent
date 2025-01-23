
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://wyhjrxktijlgrtfdagsu.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)


export function databaseConnexion() {
    supabase.getChannels()
}