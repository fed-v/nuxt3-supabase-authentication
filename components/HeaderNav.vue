<template>
    <div class="bg-gray-900 py-6 px-10 flex justify-between">

        <p>Your email address is: {{ user.email }}</p>

        <button @click="signOut" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            Sign out
        </button>

    </div>
</template>

<script setup lang="ts">

    const supabase = useSupabaseClient();
    const user = useSupabaseUser();

    const signOut = async () => {
        await supabase.auth.signOut();
        navigateTo('/login')
    };

</script>

<style scoped>

</style>