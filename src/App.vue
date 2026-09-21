<script setup>
import { useRoute } from 'vue-router'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'

const route = useRoute()
</script>

<template>
  <AppHeader v-if="!route.meta.bare" />
  <RouterView />
  <AppFooter v-if="!route.meta.bare" />
</template>
