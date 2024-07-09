// plugins/supabase.js or plugins/supabase.ts
import { createClient } from '@supabase/supabase-js';

const config = useRuntimeConfig();

const supabase = createClient(config.public.supabaseUrl, config.public.supabaseKey)

export default defineNuxtPlugin(() => {
  return {
    provide: {
      supabase
    }
  }
})