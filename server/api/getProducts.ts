import { createClient } from '@supabase/supabase-js';
import { defineEventHandler } from 'h3';

const config = useRuntimeConfig();
const supabase = createClient(config.public.supabaseUrl, config.public.supabaseKey);

export default defineEventHandler(async (event) => {

  const { data, error } = await supabase.from('Products').select();

  if (error) {
    return { success: false, error: { message: error.message }, data: null };
  }

  return { success: true, error: null, data };
  
});
