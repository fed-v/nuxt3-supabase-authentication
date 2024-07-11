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

        <!-- Add a delete button to each row -->
        <template #actions-data="{ row }">
            <UButton @click="deleteProduct(row.id)" color="gray" variant="ghost" icon="i-heroicons-trash-20-solid" />
        </template>

    </UTable>

</template>

<script setup lang="ts">

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

        const { data: product, error } = await useFetch('/api/deleteProduct', {
        method: 'POST',
        body: { productId: id },
        });

        // It's throwing an error despite the product being deleted?
        /*if (error) {
        console.error('Error deleting product:', error);
        } else {
        console.log('Product deleted:', product);
        getProducts();
        }*/

        // Emit the update message to the parent component
        emit("handleUpdate");

    }

    // Define the emit function
    const emit = defineEmits(["handleUpdate"]);

</script>