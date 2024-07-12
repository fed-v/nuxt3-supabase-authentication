<template>

  <div v-if="user" class="text-center flex flex-col space-y-12">

    <h1 class="text-5xl text-white">Welcome!</h1>

    <div class="rounded-lg divide-y divide-gray-200 dark:divide-gray-800 ring-1 ring-gray-200 dark:ring-gray-800 shadow bg-white dark:bg-gray-900 w-full max-w-lg">
      <ProductsTable :data="products" @handleUpdate="refreshProducts" />
    </div>

  </div>

</template>

<script setup lang="ts">

  const products = ref([]);
  const user = useSupabaseUser();


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
