// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2026-10-18',
  devtools: { enabled: true },
  css: [
    '@fontsource/noto-sans-sc/cyrillic-400.css',
    '@fontsource/noto-sans-sc/cyrillic-700.css',
    '@fontsource/noto-sans-sc/latin-400.css',
    '@fontsource/noto-sans-sc/latin-700.css',
    '~/assets/css/main.css',
  ],

  app: {
    head: {
      htmlAttrs: { lang: 'ru' },
      title: 'Космоклуб - открой всю галактику',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
        { name: 'theme-color', content: '#fff9ec' },
      ],
    },
  },
})
