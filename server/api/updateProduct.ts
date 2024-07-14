import { createClient } from '@supabase/supabase-js';
import { defineEventHandler } from 'h3';

const config = useRuntimeConfig();
const supabase = createClient(config.public.supabaseUrl, config.public.supabaseKey);

export default defineEventHandler(async (event) => {

    // Read the request body
    const body = await readBody(event);

    // Extract the parameter from the body
    const { productName, productDescription, productPrice, productId } = body;

    // Add product to database    
    const { error } = await supabase
    .from('Products')
    .update([
        { name: productName, description: productDescription, price: productPrice }
    ])
    .eq('id', productId)
    .select();

    if (error) {
        return { success: false, error: error.message };
    }
    
    return { success: true };

});