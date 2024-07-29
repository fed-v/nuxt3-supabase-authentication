# Setup Supabase with Nuxt

A simple NuxtJS application that uses Supabase for user creation and authentication as well as a basic Product catalogue only accessible to logged users.

## Tech Stack
[![My Skills](https://skillicons.dev/icons?i=vue,nuxt,supabase,tailwind)](https://skillicons.dev)

## Features

* User authentication
* Route guarding for private pages
* Register user form and submission
* Fetch, delete and create data to the Supabase Product database
* User interface using Nuxt UI component library
* Error management for both HTTP errors and API-specific errors

![Login screen](login.png?raw=true "Login screen")
![Products DB screen](products.png?raw=true "Products DB screen")

## Getting Started

1. Create a new Supabase project at https://supabase.com/

2. Create a new Nuxt.js project

```bash
npx nuxi@latest init <project name>
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

5. Create a `.env` file from `.env.dist` and set it's values

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

In `components/HeaderNav.vue`:

```typescript
const supabase = useSupabaseClient();

const signOut = async () => {

  await supabase.auth.signOut();
  navigateTo('/login')

};
```

10. Fetching data

In `server/api/getProducts`:

```typescript
const config = useRuntimeConfig();
const supabase = createClient(config.public.supabaseUrl, config.public.supabaseKey);

const { data, error } = await supabase.from('Products').select();
```

You just need to call the useSupabaseClient() with the right environmental variables and then use the query methods provided by Supabase (select, insert, delete, update, etc).

11. Error management

It is best practice to ensure that your error handling is robust and capable of managing both HTTP errors and API-specific errors correctly.

In `pages/*`:

```typescript
try {

  const { error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    // Handle API error
  } 

} catch (err) {
  // Handle HTTP error
}
```

In `server/api/*`:

```typescript
const { data, error } = await supabase.from('Products').select();

if (error) {
  return { success: false, error: { message: error.message }, data: null };
}

return { success: true, error: null, data };
```

Done 🚀
