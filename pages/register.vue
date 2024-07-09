<!-- pages/register.vue -->
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


    <!--<div class="register-container">
      <h1>Create Account</h1>
      <form @submit.prevent="registerUser">
        <div>
          <label for="email">Email</label>
          <input type="email" id="email" v-model="email" required />
        </div>
        <div>
          <label for="password">Password</label>
          <input type="password" id="password" v-model="password" required />
        </div>
        <button type="submit">Create Account</button>
      </form>
      <p v-if="error">{{ error }}</p>
    </div>-->

</template>
  
<script lang="ts" setup>
  
  import type {FormSubmitEvent} from '#ui/types';

  const state = reactive({
    email: '',
    password: '',
  });

  const supabase = useSupabaseClient();
  
  /*const registerUser = async () => {
    error.value = ''
    const { user, session, error: signUpError } = await supabase.auth.signUp({
      email: email.value,
      password: password.value
    })
  
    if (signUpError) {
      error.value = signUpError.message
    } else {
      // Redirect to a different page or show a success message
      router.push('/login')
    }
  }*/


  async function submit(event: FormSubmitEvent<any>) {

    const { email, password } = event.data;

    await supabase.auth.signUp({
      email,
      password,
    });

    navigateTo('/login');

  }
</script>