import {createClient} from '@supabase/supabase-js'

const supabaseURL = 'https://dsucnnxapbhfbscxjnbb.supabase.co'
const supabaseAnonKey= 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRzdWNubnhhcGJoZmJzY3hqbmJiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc3Njc1NDAsImV4cCI6MjA3MzM0MzU0MH0.SxCaXHobOM8fg71u7OPrAYc6Gq2u8t1FIZMEg9l5AI8'
console.log(supabaseURL)

export const supabase = createClient(supabaseURL,supabaseAnonKey)