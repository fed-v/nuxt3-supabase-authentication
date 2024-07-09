<template>
  <u-card class="w-full max-w-lg">

    <template #header>
      Create account
    </template>

    <u-form :state="state" @submit="submit" class="space-y-6">
      <u-form-group label="Email">
        <u-input v-model="state.email" placeholder="Email" />
      </u-form-group>

      <u-form-group label="Password">
        <u-input v-model="state.password" type="password" placeholder="Password" />
      </u-form-group>

      <u-button type="submit">Create account</u-button>
    </u-form>

  </u-card>

</template>
  
<script lang="ts" setup>
  
  import type {FormSubmitEvent} from '#ui/types';

  const state = reactive({
    email: '',
    password: '',
  });

  const supabase = useSupabaseClient();

  async function submit(event: FormSubmitEvent<any>) {

    const { email, password } = event.data;

    await supabase.auth.signUp({
      email,
      password,
    });

    navigateTo('/login');

  }

</script>