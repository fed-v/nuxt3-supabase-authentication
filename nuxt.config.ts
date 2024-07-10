// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  devtools: { enabled: true },
  
  modules: [
    '@nuxt/ui',
    '@nuxtjs/supabase'
  ],

  
  supabase: {

    // This disables the aggressive redirecting to the login page set by default in the Supabase module 
    // if you want to use your own middleware to handle the redirecting.
    // more info here: https://github.com/nuxt-modules/supabase/issues/227
    //redirect:false,
    redirectOptions: {
      exclude: ["/register"], // exclude the register page from the redirecting to the login page
    },
  }

})
