<template>

  <div class="text-center flex flex-col space-y-12" v-if="user">
    <h1 class="text-5xl text-white">Welcome!</h1>

    <p>Your email address is: {{ user.email }}</p>

    <button
      @click="signOut"
      class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
    >Sign out</button>

  </div>

</template>

<script lang="ts" setup>

  const products = ref([]);
  const user = useSupabaseUser();
  const supabase = useSupabaseClient();

  const signOut = async () => {

    await supabase.auth.signOut();
    navigateTo('/login')

  };


  async function getProducts() {

    /* Calling a Supabase table from the client */
    /*const { data, error } = await supabase.from('Products').select();

    if (error) {
      console.error('Error fetching products:', error);
    } else {
      console.log('Products data:', data);
      products.value = data;
    }*/

    /* Calling a Supabase table from using server routes */
    try {
      const response = await fetch('/api/fetchProducts');
      const data = await response.json();
      products.value = data;
      console.log('Products data:', data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }

  }


  onMounted(() => {
    getProducts()
  })

</script>
