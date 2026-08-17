<script setup>
import archive1 from '@/assets/photos/archive-1.png'
import archive2 from '@/assets/photos/archive-2.png'
import arrowLeft from '@/assets/icons/arrow-left.svg?raw'
import arrowRight from '@/assets/icons/arrow-right.svg?raw'

const CARDS = [
  {
    image: archive1,
    tag: 'Dis information',
    tagBg: '#e10000',
    score: '১২',
    title: 'কক্সবাজারে ত্রাণ বিতরণ বন্ধ ঘোষণা করেছে প্রশাসন',
  },
  {
    image: archive2,
    tag: 'True Fact',
    tagBg: '#008939',
    score: '৯৪',
    title: 'স্থানীয় নদীতে পানির স্তর বেড়েছে, সতর্কতা জারি',
  },
  {
    image: archive2,
    tag: 'True Fact',
    tagBg: '#008939',
    score: '৯৪',
    title: 'স্থানীয় নদীতে পানির স্তর বেড়েছে, সতর্কতা জারি',
  },
]
</script>

<template>
  <section class="border-t border-brand-50 bg-white">
    <div class="flex flex-col gap-8 px-[42px] py-14">
      <div class="flex flex-col items-start gap-1.5">
        <p class="bg-accent-900 px-3 py-2 font-heading text-base text-accent-50">কমিউনিটি যাচাই আর্কাইভ</p>
        <p class="font-heading text-3xl font-bold leading-snug tracking-tight text-brand-500 lg:text-[48px]">
          অন্যরা যা যাচাই করেছেন
        </p>
        <p class="font-heading text-xl text-accent-700 sm:text-2xl">
          কমিউনিটির মানুষ প্রতিদিন যা যাচাই করছেন — সত্য, মিথ্যা ও সন্দেহজনক তথ্যের বাস্তব উদাহরণ
        </p>
        <p class="mt-2 max-w-3xl font-heading text-lg leading-relaxed text-accent-700">
          এখানে দেখানো হয়েছে কক্সবাজারের মানুষ সম্প্রতি যেসব খবর, ছবি বা মেসেজ যাচাই করেছেন এবং যাচাইয়ের
          পর সেগুলো সত্য প্রমাণিত হয়েছে, নাকি ভুয়া। প্রতিটি কার্ডে থাকছে দাবিটি কী ছিল, যাচাইয়ের ফলাফল কী
          এসেছে, এবং কেন।
        </p>
      </div>

      <div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <div v-for="(card, i) in CARDS" :key="i" class="relative h-[420px] overflow-hidden rounded-xl sm:h-[480px]">
          <img :src="card.image" alt="" class="absolute inset-0 h-full w-full object-cover blur-[2px]" />
          <div class="absolute inset-0 bg-gradient-to-b from-transparent to-black/70" />

          <div
            class="absolute left-4 top-4 flex size-[92px] items-center justify-center rounded-full bg-accent-800 text-accent-50"
          >
            <span class="font-heading text-3xl">{{ card.score }}</span
            ><span class="font-heading text-sm">/১০০</span>
          </div>

          <div class="absolute inset-x-0 bottom-0 flex flex-col items-start gap-2 px-6 py-4">
            <span
              class="rounded-full px-3.5 py-1 font-heading text-sm text-accent-50"
              :style="{ backgroundColor: card.tagBg }"
            >
              {{ card.tag }}
            </span>
            <p class="font-heading text-2xl font-bold leading-snug tracking-tight text-accent-50">
              {{ card.title }}
            </p>
          </div>
        </div>
      </div>

      <div class="flex items-center justify-center gap-6">
        <button type="button" class="rounded-xl bg-accent-50 p-4 text-brand-500">
          <span class="block h-4 w-4 [&>svg]:h-full [&>svg]:w-full" v-html="arrowLeft" />
        </button>
        <button type="button" class="rounded-xl bg-accent-50 p-4 text-brand-500">
          <span class="block h-4 w-4 [&>svg]:h-full [&>svg]:w-full" v-html="arrowRight" />
        </button>
      </div>
    </div>
  </section>
</template>
