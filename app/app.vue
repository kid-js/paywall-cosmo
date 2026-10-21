<script setup lang="ts">
import cyrillic400 from '@fontsource/noto-sans-sc/files/noto-sans-sc-cyrillic-400-normal.woff2?url'
import cyrillic700 from '@fontsource/noto-sans-sc/files/noto-sans-sc-cyrillic-700-normal.woff2?url'
import latin400 from '@fontsource/noto-sans-sc/files/noto-sans-sc-latin-400-normal.woff2?url'
import latin700 from '@fontsource/noto-sans-sc/files/noto-sans-sc-latin-700-normal.woff2?url'

useHead({
  link: [cyrillic400, cyrillic700, latin400, latin700].map((href) => ({
    href,
    as: 'font',
    rel: 'preload',
    type: 'font/woff2',
    crossorigin: 'anonymous',
  })),
})
</script>

<template>
  <NuxtRouteAnnouncer />
  <NuxtPage />
</template>
