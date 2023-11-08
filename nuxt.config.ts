// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@vueuse/nuxt',
    '@nuxtjs/supabase',
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt'
  ],
  supabase: {
    redirect: false,
    redirectOptions: {
      login: '/login',
      callback: '/',
      exclude: ['']
    }
  },
  nitro: {
    prerender: {
      routes: ['/landing']
    }
  },
  devtools: { enabled: true },
  devServer: {
    host: '0'
  }
})
