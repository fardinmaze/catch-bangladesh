<script setup>
// Full-window reader for a module PDF. The module page's "Full screen" button opens this in a new tab, so the
// same PDF shows even in browsers that would otherwise download a PDF link instead of displaying it.
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import PdfViewer from '@/components/learn/PdfViewer.vue'
import { useLang } from '@/stores/lang'
import { getModuleBySlug } from '@/data/learningModules'

const route = useRoute()
const { t, isBn } = useLang()

const mod = computed(() => getModuleBySlug(route.params.slug))
</script>

<template>
  <div v-if="mod" class="flex h-dvh flex-col bg-accent-50">
    <div class="flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-accent-100 bg-white px-4 py-3 sm:px-6">
      <RouterLink
        :to="{ name: 'learn-detail', params: { slug: mod.slug } }"
        class="font-heading text-sm font-medium text-brand-500"
      >
        {{ t.moduleDetail.backToModule }}
      </RouterLink>
      <p class="min-w-0 flex-1 truncate font-heading text-sm font-semibold text-accent-900">
        Module {{ mod.number }} — {{ isBn ? mod.title.bn : mod.title.en }}
      </p>
      <a
        :href="mod.pdf"
        :download="mod.pdf.split('/').pop()"
        class="rounded-button border border-brand-500 px-4 py-2 font-heading text-xs font-medium text-brand-500"
      >
        {{ t.moduleDetail.download }}
      </a>
    </div>

    <PdfViewer :key="mod.slug" :src="mod.pdf" :max-width="1200" class="min-h-0 flex-1" />
  </div>

  <main v-else class="flex flex-col gap-4 px-6 py-14">
    <p class="font-heading text-xl text-accent-700">{{ t.moduleDetail.notFound }}</p>
    <RouterLink to="/learn" class="w-fit font-heading text-sm font-medium text-brand-500">
      {{ t.moduleDetail.back }}
    </RouterLink>
  </main>
</template>
