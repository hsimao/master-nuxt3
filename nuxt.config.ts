import vsharp from 'vite-plugin-vsharp'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@vueuse/nuxt',
    '@nuxtjs/supabase',
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@nuxt/image'
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
  vite: {
    plugins: [vsharp()]
  },
  devtools: { enabled: true },
  devServer: {
    host: '0'
  }
})
