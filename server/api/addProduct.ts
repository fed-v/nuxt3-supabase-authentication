import { createClient } from '@supabase/supabase-js';
import { defineEventHandler } from 'h3';

const config = useRuntimeConfig();
const supabase = createClient(config.public.supabaseUrl, config.public.supabaseKey);

export default defineEventHandler(async (event) => {

    // Read the request body
    const body = await readBody(event);

    // Extract the parameter from the body
    const { productName, productDescription, productPrice } = body;

    // Delete the product from the database    
    const { error } = await supabase
    .from('Products')
    .insert([
        { name: productName, description: productDescription, price: productPrice || 0 },
    ])
    .select();

});