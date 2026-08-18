<script setup>
import { RouterLink } from 'vue-router'
import arrowUpRight from '@/assets/icons/arrow-up-right.svg?raw'
import { useLang } from '@/stores/lang'
import { MODULES } from '@/data/learningModules'

const { t, isBn } = useLang()
</script>

<template>
  <main class="flex flex-col gap-8 px-[42px] py-14">
    <div class="flex flex-col items-start gap-1.5">
      <p class="bg-accent-900 px-3 py-2 font-heading text-base text-accent-50">{{ t.learnPage.eyebrow }}</p>
      <p class="font-heading text-3xl font-bold leading-snug tracking-tight text-brand-500 lg:text-[48px]">
        {{ t.learnPage.headline }}
      </p>
      <p class="max-w-3xl font-heading text-xl text-accent-700 sm:text-2xl">
        {{ t.learnPage.subtitle }}
      </p>
    </div>

    <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="mod in MODULES"
        :key="mod.slug"
        class="flex flex-col justify-between gap-8 border border-accent-100 bg-[#f9fafa] px-3 py-6"
      >
        <div class="flex flex-col gap-1.5">
          <p class="font-heading text-sm font-medium text-brand-500">Module {{ mod.number }}</p>
          <p class="font-heading text-2xl font-medium tracking-tight text-accent-600 sm:text-[32px]">
            {{ isBn ? mod.title.bn : mod.title.en }}
          </p>
          <p class="font-heading text-base text-brand-400">{{ isBn ? mod.subtitle.bn : mod.subtitle.en }}</p>
        </div>
        <RouterLink
          :to="{ name: 'learn-detail', params: { slug: mod.slug } }"
          class="flex w-fit items-center gap-3 rounded border border-brand-500 px-6 py-3 font-heading text-xs font-medium text-brand-500"
        >
          {{ t.learningMaterials.learnMore }}
          <span class="h-4 w-4 [&>svg]:h-full [&>svg]:w-full" v-html="arrowUpRight" />
        </RouterLink>
      </div>
    </div>
  </main>
</template>
