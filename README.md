# Setup Supabase with Nuxt

How to install Supabase with Nuxt.js.

## Getting Started

1. Create a new Supabase project

2. Create a new Nuxt.js project

```bash
npx nuxi@latest init supabase-nuxt
```

3. Install Supabase module

```bash
npm install @nuxtjs/supabase --save-dev
```

4. Add Supabase module to `nuxt.config.js`

```js
export default {
  modules: [
    '@nuxtjs/supabase',
  ],
}
```

5. Add Supabase URL and Key to `.env`

```
SUPABASE_URL=https://<your_supabase_url>
SUPABASE_KEY=<your_supabase_key>
```

6. Connect your login form to Supabase

In `pages/login.vue`:

```typescript
const supabase = useSupabaseClient();

async function submit(event: FormSubmitEvent<any>) {
  const { email, password } = event.data;

  await supabase.auth.signInWithPassword({
    email,
    password,
  });

  navigateTo('/')
}
```

7. Add exceptions to the default redirect to /login

In `nuxt.config.ts`:

```typescript
supabase: {
  redirectOptions: {
    exclude: ["/register"]
  },
}
```

By default, Supabase provides a middleware out of the box which will redirect any page to /login if a user has not logged in. By excluding /register you are able to hit that page without being redirected. 

8. Register a new user

In `pages/register.vue`:

```typescript
const supabase = useSupabaseClient();

  async function submit(event: FormSubmitEvent<any>) {

    const { email, password } = event.data;

    await supabase.auth.signUp({
      email,
      password,
    });

    navigateTo('/login');

  }
```

9. To logout

In `pages/index.vue`:

```typescript
const supabase = useSupabaseClient();

const signOut = async () => {

  await supabase.auth.signOut();
  navigateTo('/login')

};
```
Done 🚀
