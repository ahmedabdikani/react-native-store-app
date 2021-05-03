import { createClient } from '@supabase/supabase-js'
import AsyncStorage from "@react-native-async-storage/async-storage"
// import { SUPABASE_URL, SUPABASE_KEY } from 'react-native-dotenv' 


const SUPABASE_URL = 'https://zriyjjlpytcztjtvbmzr.supabase.co'
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYxNDUzNDc2NCwiZXhwIjoxOTMwMTEwNzY0fQ.OqQxJ2lypuKF5fXqWCzlr97CNp3mTX0l44ssfwQj2nY"


const  supabase = createClient(SUPABASE_URL, SUPABASE_KEY,{localStorage:AsyncStorage,autoRefreshToken:true})

export default supabase