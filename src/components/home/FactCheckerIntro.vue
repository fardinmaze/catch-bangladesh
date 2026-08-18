<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import arrowUpRight from '@/assets/icons/arrow-up-right.svg?raw'
import { useLang } from '@/stores/lang'

const { t, isBn } = useLang()

const META = [
  { bg: '#f6fdfe', border: '#0057b8', badgeBg: '#e6eff8', color: '#0057b8' },
  { bg: '#f5fff6', border: '#008610', badgeBg: '#c2ffc8', color: '#008610' },
  { bg: '#fffcf5', border: '#bf0022', badgeBg: '#ffedc2', color: '#bf0022' },
]
const NUMERALS_BN = ['১', '২', '৩']
const NUMERALS_EN = ['1', '2', '3']

const STEPS = computed(() =>
  t.value.factCheckerIntro.steps.map((step, i) => ({
    ...step,
    ...META[i],
    n: (isBn.value ? NUMERALS_BN : NUMERALS_EN)[i],
  })),
)
</script>

<template>
  <section class="border-t border-brand-50 bg-white">
    <div class="flex flex-col items-center gap-8 px-[42px] py-14">
      <div class="flex w-full flex-col items-start gap-1.5">
        <p class="bg-accent-900 px-3 py-2 font-heading text-base text-accent-50">{{ t.factCheckerIntro.eyebrow }}</p>
        <p class="font-heading text-3xl font-bold leading-snug tracking-tight text-brand-500 lg:text-[48px]">
          {{ t.factCheckerIntro.headline }}
        </p>
        <p class="font-heading text-xl text-accent-700 sm:text-2xl">
          {{ t.factCheckerIntro.subtitle }}
        </p>
      </div>

      <div class="flex w-full flex-col gap-3 font-heading text-lg leading-relaxed text-accent-700 sm:text-xl">
        <p>{{ t.factCheckerIntro.para1 }}</p>
        <p>{{ t.factCheckerIntro.para2 }}</p>
      </div>

      <p
        class="max-w-3xl text-center font-heading text-xl leading-relaxed text-accent-700 sm:text-[32px]"
        v-html="t.factCheckerIntro.quote"
      />

      <div class="grid w-full gap-px sm:grid-cols-3">
        <div
          v-for="(step, i) in STEPS"
          :key="i"
          class="flex flex-col items-center gap-4 border-l-8 px-3 py-6"
          :style="{ backgroundColor: step.bg, borderColor: step.border }"
        >
          <span
            class="flex items-center justify-center rounded-full px-2 py-1 font-heading text-base"
            :style="{ backgroundColor: step.badgeBg, color: step.color }"
          >
            {{ step.n }}
          </span>
          <div class="flex flex-col items-center gap-1 text-center" :style="{ color: step.color }">
            <p class="font-heading text-2xl font-medium tracking-tight sm:text-[36px]">{{ step.title }}</p>
            <p class="font-heading text-base">{{ step.desc }}</p>
          </div>
        </div>
      </div>

      <div class="flex items-center gap-3">
        <RouterLink
          to="/fact-checker"
          class="flex items-center gap-3 rounded bg-brand-500 px-[18px] py-4 font-heading text-sm font-medium leading-none text-accent-50"
        >
          {{ t.factCheckerIntro.ctaPrimary }}
          <span class="h-4 w-4 [&>svg]:h-full [&>svg]:w-full" v-html="arrowUpRight" />
        </RouterLink>
        <RouterLink
          to="/learn"
          class="rounded border border-brand-500 px-[18px] py-4 font-heading text-sm font-medium leading-none text-brand-500"
        >
          {{ t.factCheckerIntro.ctaSecondary }}
        </RouterLink>
      </div>
    </div>
  </section>
</template>
