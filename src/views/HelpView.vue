<script setup>
import { RouterLink } from 'vue-router'
import { useLang } from '@/stores/lang'

const { t } = useLang()
</script>

<template>
  <main class="mx-auto flex w-full max-w-2xl flex-col gap-6 px-6 py-14 sm:px-[42px]">
    <p class="w-fit bg-accent-900 px-3 py-2 font-heading text-sm text-accent-50">{{ t.helpPage.eyebrow }}</p>
    <p class="font-heading text-3xl font-bold leading-snug tracking-tight text-brand-500 lg:text-[40px]">
      {{ t.helpPage.headline }}
    </p>
    <p class="font-heading text-lg leading-relaxed text-accent-700 sm:text-xl">{{ t.helpPage.body }}</p>

    <div class="flex flex-col gap-2 rounded border border-accent-100 bg-[#f9fafa] px-4 py-4">
      <p class="font-heading text-base font-semibold text-accent-900">{{ t.helpPage.contactHeading }}</p>
      <p class="font-heading text-base text-accent-700">{{ t.footer.email }}</p>
      <p class="font-heading text-base text-accent-700">{{ t.footer.phone }}</p>
      <p class="font-heading text-base text-accent-700">{{ t.footer.whatsapp }}</p>
    </div>

    <p class="font-heading text-sm text-accent-600">{{ t.helpPage.note }}</p>

    <div class="flex flex-col gap-3 sm:flex-row">
      <RouterLink
        to="/"
        class="rounded border border-accent-100 px-6 py-3.5 text-center font-heading text-sm font-medium text-accent-700"
      >
        {{ t.helpPage.backHome }}
      </RouterLink>
      <RouterLink
        to="/fact-checker"
        class="rounded bg-brand-500 px-6 py-3.5 text-center font-heading text-sm font-medium text-accent-50"
      >
        {{ t.helpPage.backFactChecker }}
      </RouterLink>
    </div>
  </main>
</template>
