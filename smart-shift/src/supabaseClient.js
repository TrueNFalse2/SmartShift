import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://hkvzevieovnmihzqajsz.supabase.co'
// המפתח הזה חייב להיות בדיוק מה שמופיע ב-Publishable API Key שלך
const supabaseAnonKey = 'sb_publishable_h0Dx98lbxpR8PvNt3mNKkQ_zfr-H_M-'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)