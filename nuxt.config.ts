import vsharp from 'vite-plugin-vsharp'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    // NOTE: 需要配置空值, .env 配置的參數才會覆蓋過來
    stripeSecret: '', // NUXT_STRIPE_SECRET
    public: {
      stripeKey: '' // NUXT_PUBLIC_STRIPE_KEY
    }
  },
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
