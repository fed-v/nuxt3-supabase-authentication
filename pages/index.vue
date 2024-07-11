<template>

  <div class="text-center flex flex-col space-y-12" v-if="user">

    <h1 class="text-5xl text-white">Welcome!</h1>

    <p>Your email address is: {{ user.email }}</p>

    <button
      @click="signOut"
      class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
    >Sign out</button>

    <ProductsTable :data="products" @handleUpdate="refreshProducts" />

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


  async function getProducts():Promise<void> {

    try {
      const response = await fetch('/api/getProducts');
      const data = await response.json();
      products.value = data;
    } catch (error) {
      console.error('Error fetching products:', error);
    }

  }


  function refreshProducts():void {
    getProducts();
  }


  onMounted(() => {
    getProducts();
  })

</script>
