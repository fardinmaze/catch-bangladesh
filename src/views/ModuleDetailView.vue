<script setup>
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useLang } from '@/stores/lang'
import { getModuleBySlug } from '@/data/learningModules'

const route = useRoute()
const { t, isBn } = useLang()

const mod = computed(() => getModuleBySlug(route.params.slug))
</script>

<template>
  <main v-if="mod" class="flex flex-col gap-6 px-[42px] py-14">
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

    <a
      :href="mod.pdf"
      :download="mod.pdf.split('/').pop()"
      class="flex w-fit items-center gap-3 rounded border border-brand-500 px-6 py-3 font-heading text-xs font-medium text-brand-500"
    >
      {{ t.moduleDetail.download }}
    </a>

    <div class="h-[80vh] w-full border border-accent-100 bg-[#f9fafa]">
      <object :data="mod.pdf" type="application/pdf" class="h-full w-full">
        <embed :src="mod.pdf" type="application/pdf" class="h-full w-full" />
        <p class="flex h-full flex-col items-center justify-center gap-3 p-6 text-center font-heading text-base text-accent-700">
          {{ isBn ? 'আপনার ব্রাউজারে পিডিএফ দেখানো যাচ্ছে না।' : "Your browser can't display this PDF inline." }}
          <a :href="mod.pdf" target="_blank" rel="noopener" class="font-medium text-brand-500 underline">
            {{ isBn ? 'নতুন ট্যাবে খুলুন' : 'Open it in a new tab' }}
          </a>
        </p>
      </object>
    </div>
  </main>

  <main v-else class="flex flex-col gap-4 px-[42px] py-14">
    <p class="font-heading text-xl text-accent-700">{{ t.moduleDetail.notFound }}</p>
    <RouterLink to="/learn" class="w-fit font-heading text-sm font-medium text-brand-500">
      {{ t.moduleDetail.back }}
    </RouterLink>
  </main>
</template>
