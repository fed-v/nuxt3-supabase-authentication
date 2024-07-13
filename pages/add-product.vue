<template>

  <u-card class="w-full max-w-lg">

    <template #header>
      Add product
    </template>

    <u-form :state="state" @submit="submit" class="space-y-6">

      <u-form-group label="Name">
        <u-input v-model="state.name" placeholder="Name" required />
      </u-form-group>

      <u-form-group label="Description">
        <u-input v-model="state.description" placeholder="Description" required />
      </u-form-group>

      <u-form-group label="Price">
          <u-input v-model="state.price" type="number" placeholder="0" />
      </u-form-group>

      <UButtonGroup size="sm" orientation="horizontal" class="flex justify-between">
        <u-button type="submit" class="space-y-6">Add</u-button>
      </UButtonGroup>

    </u-form>

    <p v-if="errorMessage" class="py-4 text-red-500 text-center">{{ errorMessage }}</p>

  </u-card>

</template>
  
<script lang="ts" setup>

  import type { FormSubmitEvent } from '#ui/types';

  const errorMessage = ref<string>('');
  const state = reactive({
      name: '',
      description: '',
      price: '',
  });


  async function submit(event: FormSubmitEvent<any>) {

    const { name, description, price } = event.data;

    try {

      const { error } = await useFetch('/api/addProduct', {
          method: 'POST',
          body: {
              productName: name,
              productDescription: description,
              productPrice: price,
          },
      });

      if (error.value) {
          throw new Error(error.value.message);
      }

      errorMessage.value = '';
      navigateTo('/');

    } catch (err) {
      console.error('Error creating product:', err.message);
      errorMessage.value = err.message;
    }
    
  }

</script>