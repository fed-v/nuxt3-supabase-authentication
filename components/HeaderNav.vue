<template>

    <div class="bg-gray-900 py-6 px-10 flex justify-between fixed w-full">

        <p v-if="user">Your email address is: {{ user.email }}</p>
        
        <div class="flex flex-col">

            <button @click="signOut" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-max self-end">
                Sign out
            </button>
            
            <p v-if="errorMessage" class="text-red-600">
                {{ errorMessage }}
            </p>
            
        </div>

    </div>

</template>

<script setup lang="ts">

    const supabase = useSupabaseClient();
    const user = useSupabaseUser();
    const errorMessage = ref<string>('');

    const signOut = async () => {

        try {

            const { error } = await supabase.auth.signOut();

            if (error) {
                throw error;
            }

            navigateTo('/login');
        
        } catch (error) {
            console.error('Error signing out:', error);
            errorMessage.value = 'Error signing out. Please try again.';
        }

    };

</script>