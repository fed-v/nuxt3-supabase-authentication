<template>

  <div v-if="user" class="text-center flex flex-col space-y-12">

    <h1 class="text-5xl text-white">Welcome!</h1>

    <div class="rounded-lg divide-y divide-gray-200 dark:divide-gray-800 ring-1 ring-gray-200 dark:ring-gray-800 shadow bg-white dark:bg-gray-900 w-full max-w-lg">
      <ProductsTable :data="products" @handleUpdate="refreshProducts" />
    </div>

    <NuxtLink to="/add-product" class="text-white bg-blue-500 hover:bg-blue-700 rounded-lg px-4 py-2 w-max self-end">
      Add a product
    </NuxtLink>

    <p v-if="errorMessage" class="text-red-500">{{ errorMessage }}</p>

  </div>

</template>

<script setup lang="ts">

  const products = ref([]);
  const user = useSupabaseUser();
  const errorMessage = ref<string>('');


  async function getProducts():Promise<void> {

    try {

      const response = await fetch('/api/getProducts');
      const data = await response.json();
      products.value = data;

    } catch (error) {
      console.error('Error fetching products:', error);
      errorMessage.value = 'There was an error fetching products. Please try again later.';
    }

  }


  // This function will be called when the child component emits the "handleUpdate" event
  function refreshProducts(errorMsg: string):void {

    // If there's an error message, display it. Otherwise, refresh the products
    errorMsg ? errorMessage.value = errorMsg : getProducts();

  }


  onMounted(() => {
    getProducts();
  })

</script>
