export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    '@vee-validate/nuxt',
    '@ant-design-vue/nuxt'
  ],
  pinia: {
    autoImports: ['defineStore']
  },
  imports: {
    dirs: ['./stores']
  }
})