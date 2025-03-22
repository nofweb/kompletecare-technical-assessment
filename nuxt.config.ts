// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: ["bootstrap/dist/css/bootstrap.min.css","bootstrap-icons/font/bootstrap-icons.css", "assets/css/styles.css"],


  modules: [],

  runtimeConfig: {
    public: {
      apiUrl: process.env.API_URL || 'https://testdrive.kompletecare.com'
    }
  }


})
