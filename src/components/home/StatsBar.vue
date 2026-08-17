<script setup>
const STATS = [
  {
    value: '৭৮%',
    label: 'তরুণ উত্তরদাতা প্রতিদিন সামাজিক যোগাযোগমাধ্যমে ভুল তথ্যের মুখোমুখি হন',
    bg: '#fff4f4',
    valueColor: '#e10000',
    textColor: '#da2727',
    rounding: 'rounded-l-xl',
  },
  {
    value: '৬৩%',
    label: 'যাচাই না করেই কোনো না কোনো পোস্ট শেয়ার করেছেন বলে স্বীকার করেন',
    bg: '#f5fff6',
    valueColor: '#008610',
    textColor: '#008610',
    rounding: '',
  },
  {
    value: '১ মিনিট',
    label: 'গড় সময় লাগে আমাদের চেকলিস্ট দিয়ে একটি তথ্য যাচাই করতে',
    bg: '#fffcf5',
    valueColor: '#bf0022',
    textColor: '#bf0022',
    rounding: '',
  },
  {
    value: '৫,০০০+',
    label: 'প্রশিক্ষিত ও সচেতন তরুণ স্বেচ্ছাসেবক (লক্ষ্যমাত্রা)',
    bg: '#f5f8ff',
    valueColor: '#573fe0',
    textColor: '#573fe0',
    rounding: 'rounded-r-xl',
  },
]
</script>

<template>
  <section class="px-[42px] py-3">
    <div class="flex flex-col overflow-hidden rounded-xl sm:flex-row">
      <div
        v-for="stat in STATS"
        :key="stat.label"
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
