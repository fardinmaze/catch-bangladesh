<script setup>
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import arrowUpRight from '@/assets/icons/arrow-up-right.svg?raw'
import PdfViewer from '@/components/learn/PdfViewer.vue'
import { useLang } from '@/stores/lang'
import { getModuleBySlug } from '@/data/learningModules'

const route = useRoute()
const { t, isBn } = useLang()

const mod = computed(() => getModuleBySlug(route.params.slug))
</script>

<template>
  <main v-if="mod" class="flex flex-col gap-6 px-[var(--page-gutter)] py-14">
    <RouterLink to="/learn" class="w-fit font-heading text-sm font-medium text-brand-500">
      {{ t.moduleDetail.back }}
    </RouterLink>

    <div class="flex flex-col items-start gap-1.5">
      <p class="bg-accent-900 px-3 py-2 font-heading text-base text-accent-50">Module {{ mod.number }}</p>
      <p class="font-heading text-3xl font-bold leading-snug tracking-tight text-brand-500 lg:text-[48px]">
        {{ isBn ? mod.title.bn : mod.title.en }}
      </p>
      <p class="max-w-3xl font-heading text-xl leading-relaxed text-accent-700 sm:text-2xl">
        {{ isBn ? mod.subtitle.bn : mod.subtitle.en }}
      </p>
    </div>

    <div class="flex flex-wrap items-center gap-3">
      <a
        :href="mod.pdf"
        :download="mod.pdf.split('/').pop()"
        class="flex w-fit items-center gap-3 rounded-button border border-brand-500 px-6 py-3 font-heading text-xs font-medium text-brand-500"
      >
        {{ t.moduleDetail.download }}
      </a>

      <!-- Opens the same PDF in its own tab: a full-window reader that works in every browser -->
      <RouterLink
        :to="{ name: 'learn-read', params: { slug: mod.slug } }"
        target="_blank"
        rel="noopener"
        class="flex w-fit items-center gap-3 rounded-button bg-brand-500 px-6 py-3 font-heading text-xs font-medium text-white"
      >
        {{ t.moduleDetail.fullscreen }}
        <span class="h-4 w-4 [&>svg]:h-full [&>svg]:w-full" v-html="arrowUpRight" />
      </RouterLink>
    </div>

    <PdfViewer :key="mod.slug" :src="mod.pdf" class="h-[80vh] w-full border border-accent-100" />
  </main>

  <main v-else class="flex flex-col gap-4 px-[var(--page-gutter)] py-14">
    <p class="font-heading text-xl text-accent-700">{{ t.moduleDetail.notFound }}</p>
    <RouterLink to="/learn" class="w-fit font-heading text-sm font-medium text-brand-500">
      {{ t.moduleDetail.back }}
    </RouterLink>
  </main>
</template>
