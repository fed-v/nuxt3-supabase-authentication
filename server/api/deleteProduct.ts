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
    const { error } = await supabase
    .from('Products')
    .delete()
    .eq('id', productId);

    if (error) {
        throw createError({ statusCode: 500, message: error.message });
    }

});