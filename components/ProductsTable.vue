<template>

    <UTable :columns="columns" :rows="props.data">

        <!-- Select the "price" data row and add a "$" in front of it -->
        <template #price-data="{ row }">
            <span>${{ row.price }}</span>
        </template>

        <!-- Select the "created_at" data row and modified its output using the displayDate composable -->
        <template #created_at-data="{ row }">
            <span>{{ displayDate(row.created_at) }}</span>
        </template>

        <!-- Add a delete button to each row in the actions column -->
        <template #actions-data="{ row }">
            <UButton @click="deleteProduct(row.id)" color="gray" variant="ghost" icon="i-heroicons-trash-20-solid" />
            <UButton @click="updateProduct(row.id)" color="gray" variant="ghost" icon="i-heroicons-adjustments-horizontal-20-solid" />
        </template>

    </UTable>

</template>

<script setup lang="ts">

    const errorMessage = ref<string>('');

    // Define the type of the data prop, assuming it's an array of products
    interface Product {
        id: number;
        name: string;
        price: number;
    }

    // Define props
    const props = defineProps<{
        data: Product[];
    }>();

    // Access props directly
    console.log('Products:', props.data);


    // Define the columns for the table
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

    async function deleteProduct(id: string) {

        const { data, error } = await useFetch('/api/deleteProduct', {
            method: 'POST',
            body: { productId: id },
        });

        if (error.value) {

            console.error('Error deleting product:', error.value.message);
            errorMessage.value = 'There was an error deleting the product. Please try again later.';

        } else if (data.value && data.value.success) {
            console.log('Product deleted:', id);
        } else {
            console.error('Unexpected response:', data.value);
        }

        // Emit the update message to the parent component. If there's an error, send the error message
        emit("handleUpdate", errorMessage.value);

    }

    // Navigate to the product update page to update this product
    async function updateProduct(id: string) {
        navigateTo(`/products/${id}`);
    }

    // Define the emit function
    const emit = defineEmits(["handleUpdate"]);

</script>