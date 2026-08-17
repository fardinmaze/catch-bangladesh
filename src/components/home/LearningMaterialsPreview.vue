<script setup>
import arrowUpRight from '@/assets/icons/arrow-up-right.svg?raw'
import arrowLeft from '@/assets/icons/arrow-left.svg?raw'
import arrowRight from '@/assets/icons/arrow-right.svg?raw'

const MODULES = [
  { title: 'তথ্য বিভ্রান্তির পরিচিতি', desc: 'তথ্য বিভ্রান্তি আসলে কী, এবং কেন এটি শুধু অনলাইন সমস্যা নয়, বাস্তব জীবনেরও ঝুঁকি' },
  { title: 'মিসইনফরমেশন', desc: 'অনিচ্ছাকৃতভাবে ছড়ানো ভুল তথ্য — মানুষ না জেনেই যা শেয়ার করে ফেলে' },
  { title: 'ডিসইনফরমেশন', desc: 'পরিকল্পিতভাবে তৈরি ও ছড়ানো ভুয়া তথ্য — উদ্দেশ্যই থাকে বিভ্রান্ত করা' },
]
</script>

<template>
  <section class="border-t border-brand-50 bg-white">
    <div class="flex flex-col gap-8 px-[42px] py-14">
      <div class="flex flex-col items-start gap-1.5">
        <p class="bg-accent-900 px-3 py-2 font-heading text-base text-accent-50">শেখার উপকরণ</p>
        <p class="font-heading text-3xl font-bold leading-snug tracking-tight text-brand-500 lg:text-[48px]">
          শিখুন, চিনুন, প্রতিরোধ করুন
        </p>
        <p class="font-heading text-xl text-accent-700 sm:text-2xl">
          তথ্য বিভ্রান্তির ৯টি ধরন সহজ ভাষায় — প্রতিটি বিষয় জানুন উদাহরণ ও বাস্তব প্রয়োগসহ
        </p>
      </div>

      <div class="grid gap-6 sm:grid-cols-3">
        <div
          v-for="mod in MODULES"
          :key="mod.title"
          class="flex flex-col justify-between gap-8 border border-accent-100 bg-[#f9fafa] px-3 py-6"
        >
          <div class="flex flex-col gap-1.5">
            <p class="font-heading text-2xl font-medium tracking-tight text-accent-600 sm:text-[36px]">
              {{ mod.title }}
            </p>
            <p class="font-heading text-base text-brand-400">{{ mod.desc }}</p>
          </div>
          <button
            type="button"
            class="flex w-fit items-center gap-3 rounded border border-brand-500 px-6 py-3 font-heading text-xs font-medium text-brand-500"
          >
            Learn More
            <span class="h-4 w-4 [&>svg]:h-full [&>svg]:w-full" v-html="arrowUpRight" />
          </button>
        </div>
      </div>

      <div class="flex items-center justify-center gap-6">
        <button type="button" class="rounded-xl bg-white p-4 text-brand-500 shadow-sm">
          <span class="block h-4 w-4 [&>svg]:h-full [&>svg]:w-full" v-html="arrowLeft" />
        </button>
        <button type="button" class="rounded-xl bg-white p-4 text-brand-500 shadow-sm">
          <span class="block h-4 w-4 [&>svg]:h-full [&>svg]:w-full" v-html="arrowRight" />
        </button>
      </div>
    </div>
  </section>
</template>
