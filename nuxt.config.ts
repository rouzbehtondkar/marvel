// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
export default defineNuxtConfig({

  devtools: { enabled: true },
  css: [
    '~/assets/css/main.scss',
    '~/assets/css/base.scss',
    '~/assets/css/fonts.scss',
    '~/assets/css/Global.scss',
    '~/assets/css/size.scss',
    '~/assets/scss/color.sass',
    "~/assets/css/tailwind.css",
  ],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  modules: [
    '@pinia/nuxt',
    'nuxt-swiper',
    'nuxt-swiper'
  ], router: {
    middleware: ['auth']
  }


})
