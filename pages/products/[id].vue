<template>

    <u-card class="w-full max-w-lg">
  
      <template #header>
        Update product
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
          <u-button type="submit" class="space-y-6">Update</u-button>
        </UButtonGroup>
  
      </u-form>
  
      <p v-if="errorMessage" class="py-4 text-red-500 text-center">{{ errorMessage }}</p>
  
    </u-card>
  
  </template>

<script setup lang="ts">

    import type { FormSubmitEvent } from '#ui/types';

    // Get the product id that was passed as a route parameter
    const { id } = useRoute().params;

    const errorMessage = ref<string>('');
    const state = reactive({
        name: '',
        description: '',
        price: '',
    });

    async function submit(event: FormSubmitEvent<any>) {

        const { name, description, price } = event.data;

        try {

            const { error } = await useFetch('/api/updateProduct', {
                method: 'POST',
                body: {
                    productName: name,
                    productDescription: description,
                    productPrice: price,
                    productId: id
                },
            });

            if(error.value) {
                throw new Error(error.value.message);
            }

            errorMessage.value = '';
            navigateTo('/');

        } catch (err) {
            console.error('Error updating product:', err.message);
            errorMessage.value = err.message;
        }

    }

    async function getSelectedProduct():Promise<void> {

        try {

            const response = await fetch('/api/getProduct', {
                method: 'POST',
                body: JSON.stringify({ productId: id }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();

            if (!response.ok || data.error) {
                errorMessage.value = data.error.message;
            } else {

                // Set the product data to the reactive state so it can be displayed in the form
                state.name = data.data.name;
                state.description = data.data.description;
                state.price = data.data.price;

                errorMessage.value = '';
            
            }

        } catch (error) {
            console.error('Error fetching products:', error);
            errorMessage.value = 'There was an error fetching products. Please try again later.';
        }

    }

    onMounted(() => {
        getSelectedProduct();
    })

</script>

<style scoped>

</style>