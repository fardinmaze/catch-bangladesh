<script setup>
import { nextTick, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import arrowUpRight from '@/assets/icons/arrow-up-right.svg?raw'
import arrowLeft from '@/assets/icons/arrow-left.svg?raw'
import arrowRight from '@/assets/icons/arrow-right.svg?raw'
import { useLang } from '@/stores/lang'
import { useCardScroller } from '@/composables/useCardScroller'
import { MODULES } from '@/data/learningModules'

const { t, isBn } = useLang()
const { trackEl, canScrollPrev, canScrollNext, updateScrollState, scrollByCard } = useCardScroller()

onMounted(() => nextTick(updateScrollState))
</script>

<template>
  <section class="border-t border-brand-50 bg-white">
    <div class="flex flex-col gap-8 px-[var(--page-gutter)] py-14">
      <div class="flex flex-col items-start gap-1.5">
        <p class="bg-accent-900 px-3 py-2 font-heading text-base text-accent-50">{{ t.learningMaterials.eyebrow }}</p>
        <p class="font-heading text-3xl font-bold leading-snug tracking-tight text-brand-500 lg:text-[48px]">
          {{ t.learningMaterials.headline }}
        </p>
        <p class="font-heading text-xl text-accent-700 sm:text-2xl">
          {{ t.learningMaterials.subtitle }}
        </p>
      </div>

      <div
        ref="trackEl"
        class="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        @scroll="updateScrollState"
      >
        <div
          v-for="mod in MODULES"
          :key="mod.slug"
          data-card
          class="flex w-[85%] shrink-0 snap-start flex-col justify-between gap-8 border border-accent-100 bg-[#f9fafa] px-3 py-6 sm:w-[300px]"
        >
          <div class="flex flex-col gap-1.5">
            <p class="font-heading text-sm font-medium text-brand-500">Module {{ mod.number }}</p>
            <p class="font-heading text-2xl font-medium tracking-tight text-accent-600 sm:text-[36px]">
              {{ isBn ? mod.title.bn : mod.title.en }}
            </p>
            <p class="font-heading text-base text-brand-400">{{ isBn ? mod.subtitle.bn : mod.subtitle.en }}</p>
          </div>
          <RouterLink
            :to="{ name: 'learn-detail', params: { slug: mod.slug } }"
            class="flex w-fit items-center gap-3 rounded-button border border-brand-500 px-6 py-3 font-heading text-xs font-medium text-brand-500"
          >
            {{ t.learningMaterials.learnMore }}
            <span class="h-4 w-4 [&>svg]:h-full [&>svg]:w-full" v-html="arrowUpRight" />
          </RouterLink>
        </div>
      </div>

      <div class="flex items-center justify-center gap-6">
        <button
          type="button"
          :disabled="!canScrollPrev"
          class="rounded-button bg-white p-4 text-brand-500 shadow-sm transition-opacity disabled:cursor-not-allowed disabled:opacity-30"
          @click="scrollByCard(-1)"
        >
          <span class="block h-4 w-4 [&>svg]:h-full [&>svg]:w-full" v-html="arrowLeft" />
        </button>
        <button
          type="button"
          :disabled="!canScrollNext"
          class="rounded-button bg-white p-4 text-brand-500 shadow-sm transition-opacity disabled:cursor-not-allowed disabled:opacity-30"
          @click="scrollByCard(1)"
        >
          <span class="block h-4 w-4 [&>svg]:h-full [&>svg]:w-full" v-html="arrowRight" />
        </button>
      </div>
    </div>
  </section>
</template>
