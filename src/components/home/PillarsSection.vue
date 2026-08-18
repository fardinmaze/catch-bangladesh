<script setup>
import { computed } from 'vue'
import checklistIcon from '@/assets/icons/checklist.svg?raw'
import puzzleIcon from '@/assets/icons/puzzle.svg?raw'
import marketingIcon from '@/assets/icons/marketing-advertising.svg?raw'
import arrowUpRight from '@/assets/icons/arrow-up-right.svg?raw'
import { useLang } from '@/stores/lang'

const { t } = useLang()

const META = [
  { icon: checklistIcon, bg: '#f5fff6', color: '#008610', rounding: '' },
  { icon: puzzleIcon, bg: '#fffcf5', color: '#bf0022', rounding: '' },
  { icon: marketingIcon, bg: '#f5f8ff', color: '#573fe0', rounding: 'rounded-r-xl' },
]

const PILLARS = computed(() => t.value.pillarsSection.pillars.map((pillar, i) => ({ ...pillar, ...META[i] })))
</script>

<template>
  <section class="border-t border-brand-100 bg-white">
    <div class="grid gap-10 px-[42px] py-14 lg:grid-cols-2">
      <div class="flex flex-col items-start justify-center gap-3 lg:sticky lg:top-[var(--header-h)] lg:h-[432px]">
        <p class="bg-accent-700 px-3 py-1.5 font-heading text-base text-accent-50">
          {{ t.pillarsSection.eyebrow }}
        </p>
        <p class="font-heading text-3xl font-bold leading-snug tracking-tight text-brand-500 lg:text-[48px]">
          {{ t.pillarsSection.headline }}
        </p>
        <button
          type="button"
          class="flex items-center gap-3 rounded bg-brand-500 px-[18px] py-4 font-heading text-sm font-medium leading-none text-accent-50"
        >
          {{ t.pillarsSection.ctaButton }}
          <span class="h-4 w-4 [&>svg]:h-full [&>svg]:w-full" v-html="arrowUpRight" />
        </button>
      </div>

      <div class="flex flex-col gap-6">
        <div class="flex flex-col justify-center gap-3 lg:h-[432px]">
          <p class="font-heading text-xl font-medium tracking-tight text-brand-500 sm:text-2xl">
            {{ t.pillarsSection.subhead1 }}
          </p>
          <p class="text-justify font-heading text-lg leading-relaxed text-accent-700">
            {{ t.pillarsSection.body1 }}
          </p>
        </div>
        <div class="flex flex-col justify-center gap-3 lg:h-[432px]">
          <p class="font-heading text-xl font-medium tracking-tight text-brand-500 sm:text-2xl">
            {{ t.pillarsSection.subhead2 }}
          </p>
          <p class="text-justify font-heading text-lg leading-relaxed text-accent-700">
            {{ t.pillarsSection.body2 }}
          </p>
        </div>

        <div class="flex flex-col justify-center gap-4 lg:h-[432px]">
          <p class="font-heading text-xl font-medium tracking-tight text-brand-500 sm:text-2xl">
            {{ t.pillarsSection.pillarsHeading }}
          </p>
          <div class="flex flex-col">
            <div
              v-for="(pillar, i) in PILLARS"
              :key="i"
              class="flex items-center gap-4 px-3 py-6"
              :class="pillar.rounding"
              :style="{ backgroundColor: pillar.bg }"
            >
              <span
                class="h-14 w-14 shrink-0 [&>svg]:h-full [&>svg]:w-full"
                :style="{ color: pillar.color }"
                v-html="pillar.icon"
              />
              <div class="flex flex-1 flex-col gap-2" :style="{ color: pillar.color }">
                <p class="font-heading text-xl font-medium tracking-tight">{{ pillar.title }}</p>
                <p class="font-heading text-xs leading-relaxed">{{ pillar.desc }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
