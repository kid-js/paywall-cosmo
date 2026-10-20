<script setup lang="ts">
import cyrillic400 from '@fontsource/noto-sans-sc/files/noto-sans-sc-cyrillic-400-normal.woff2?url'
import cyrillic700 from '@fontsource/noto-sans-sc/files/noto-sans-sc-cyrillic-700-normal.woff2?url'

useHead({
  link: [cyrillic400, cyrillic700].map((href) => ({
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
