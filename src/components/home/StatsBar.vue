<script setup>
import { computed } from 'vue'
import { useLang } from '@/stores/lang'

const { t } = useLang()

const META = [
  { bg: '#fff4f4', valueColor: '#e10000', textColor: '#da2727', rounding: 'rounded-l-xl' },
  { bg: '#f5fff6', valueColor: '#008610', textColor: '#008610', rounding: '' },
  { bg: '#fffcf5', valueColor: '#bf0022', textColor: '#bf0022', rounding: '' },
  { bg: '#f5f8ff', valueColor: '#573fe0', textColor: '#573fe0', rounding: 'rounded-r-xl' },
]

const STATS = computed(() => t.value.statsBar.map((stat, i) => ({ ...stat, ...META[i] })))
</script>

<template>
  <section class="px-[var(--page-gutter)] py-3">
    <div class="flex flex-col overflow-hidden rounded-xl sm:flex-row">
      <div
        v-for="(stat, i) in STATS"
        :key="i"
        class="flex flex-1 flex-col items-center justify-center gap-2 px-3 py-6"
        :class="stat.rounding"
        :style="{ backgroundColor: stat.bg }"
      >
        <p class="font-heading text-4xl font-medium tracking-tight" :style="{ color: stat.valueColor }">
          {{ stat.value }}
        </p>
        <p class="max-w-[220px] text-center font-heading text-base" :style="{ color: stat.textColor }">
          {{ stat.label }}
        </p>
      </div>
    </div>
  </section>
</template>
