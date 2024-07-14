import { createClient } from '@supabase/supabase-js';
import { defineEventHandler } from 'h3';

const config = useRuntimeConfig();
const supabase = createClient(config.public.supabaseUrl, config.public.supabaseKey);

export default defineEventHandler(async (event) => {

    // Read the request body
    const body = await readBody(event);
  
    // Extract the parameter from the body
    const { productId } = body;

    // Delete the product from the database    
    const { data, error } = await supabase
    .from('Products')
    .select()
    .eq('id', productId)
    .single(); // By default, the response is an array, so we use single() to get a single element since we are only getting one product

    if (error) {
        return { success: false, error: { message: error.message }, data: null };
    }

    return { success: true, error: null, data };
    
});