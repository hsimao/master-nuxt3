// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@vueuse/nuxt', '@nuxtjs/supabase', '@nuxtjs/tailwindcss'],
  supabase: {
    redirect: false,
    redirectOptions: {
      login: '/login',
      callback: '/',
      exclude: ['']
    }
  },
  devtools: { enabled: true }
})
