import { createClient } from '@supabase/supabase-js';
import { defineEventHandler } from 'h3';

const config = useRuntimeConfig();
const supabase = createClient(config.public.supabaseUrl, config.public.supabaseKey);

export default defineEventHandler(async (event) => {

  const { data, error } = await supabase.from('Products').select();

  if (error) {
    throw createError({ statusCode: 500, message: error.message });
  }

  return data;
  
});
