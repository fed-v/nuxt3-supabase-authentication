<template>

  <u-card class="w-full max-w-lg">

    <template #header>
      Login
    </template>

    <u-form :state="state" @submit="submit" class="space-y-6">

      <u-form-group label="Email">
        <u-input v-model="state.email" placeholder="Email" required />
      </u-form-group>

      <u-form-group label="Password">
        <u-input v-model="state.password" type="password" placeholder="Password" required />
      </u-form-group>

      <UButtonGroup size="sm" orientation="horizontal" class="flex justify-between">
        <u-button type="submit" class="space-y-6">Login</u-button>
        <NuxtLink to="/register">Create an account</NuxtLink>
      </UButtonGroup>
      
    </u-form>

    <p v-if="errorMessage" class="py-4 text-red-500 text-center">{{ errorMessage }}</p>

  </u-card>

</template>

<script lang="ts" setup>

  import type { FormSubmitEvent } from '#ui/types';

  const errorMessage = ref<string>('');
  const state = reactive({
    email: '',
    password: '',
  });

  const supabase = useSupabaseClient();

  async function submit(event: FormSubmitEvent<any>) {

    const { email, password } = event.data;

    try {

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Error signing in:', error.message);
        errorMessage.value = error.message;
      } else {
        errorMessage.value = '';
        navigateTo('/');
      }

    } catch (err) {
      console.error('Error signing in:', err.message);
      errorMessage.value = err.message;
    }
    
  }

</script>
