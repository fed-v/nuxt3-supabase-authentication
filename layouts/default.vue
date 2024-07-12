<template>
    
  <!-- If the user is logged in, show the header navigation -->
  <HeaderNav v-if="user" />
  
  <div class="w-full h-full min-h-screen bg-gray-900 flex items-center justify-center">
    <NuxtPage />
  </div>

</template>

<script setup lang="ts">

  const user = useSupabaseUser();

</script>
