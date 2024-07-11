<template>

  <div class="text-center flex flex-col space-y-12" v-if="user">

    <h1 class="text-5xl text-white">Welcome!</h1>

    <p>Your email address is: {{ user.email }}</p>

    <button
      @click="signOut"
      class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
    >Sign out</button>

    <UTable :columns="columns" :rows="products">

      <!-- Select the "price" data row and add a "$" in front of it -->
      <template #price-data="{ row }">
        <span>${{ row.price }}</span>
      </template>

      <!-- Select the "created_at" data row and modified its output using the displayDate composable -->
      <template #created_at-data="{ row }">
        <span>{{ displayDate(row.created_at) }}</span>
      </template>

      <!-- Add a delete button to each row -->
      <template #actions-data="{ row }">
        <UButton @click="deleteProduct(row.id)" color="gray" variant="ghost" icon="i-heroicons-trash-20-solid" />
      </template>

    </UTable>

  </div>

</template>

<script lang="ts" setup>

  const products = ref([]);
  const user = useSupabaseUser();
  const supabase = useSupabaseClient();

  const columns = [{
    key: 'name',
    label: 'Product name'
  }, {
    key: 'price',
    label: 'Price',
    sortable: true
  },{
    key: 'description',
    label: 'Description'
  }, {
    key: 'created_at',
    label: 'Created at'
  },{
    key: 'actions', // This is a custom key that will hold the delete button
  }];

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
      const response = await fetch('/api/getProducts');
      const data = await response.json();
      products.value = data;
    } catch (error) {
      console.error('Error fetching products:', error);
    }

  }


  async function deleteProduct(id: string) {

    const { data: product, error } = await useFetch('/api/deleteProduct', {
      method: 'POST',
      body: { productId: id },
    });

    if (error) {
      console.error('Error deleting product:', error);
    } else {
      console.log('Product deleted:', product);
      getProducts();
    }

  }


  onMounted(() => {
    getProducts()
  })

</script>
