<script setup>
import checklistIcon from '@/assets/icons/checklist.svg?raw'
import puzzleIcon from '@/assets/icons/puzzle.svg?raw'
import marketingIcon from '@/assets/icons/marketing-advertising.svg?raw'
import arrowUpRight from '@/assets/icons/arrow-up-right.svg?raw'

const PILLARS = [
  {
    icon: checklistIcon,
    title: 'যাচাই প্ল্যাটফর্ম',
    desc: 'ধাপে ধাপে চেকলিস্ট দিয়ে যে কেউ নিজে থেকেই তথ্য, ছবি বা ভিডিওর সত্যতা পরীক্ষা করতে পারবেন কোনো প্রযুক্তিগত দক্ষতা ছাড়াই',
    bg: '#f5fff6',
    color: '#008610',
    rounding: '',
  },
  {
    icon: puzzleIcon,
    title: 'প্রশিক্ষণ',
    desc: 'স্থানীয় তরুণদের সরাসরি প্রশিক্ষণ দেওয়া হয় যাতে তারা নিজেরাই ভুল তথ্য শনাক্ত করতে পারেন এবং তাদের পরিবার ও বন্ধুদের শেখাতে পারেন যাতে প্রকল্প শেষ হওয়ার পরও এই জ্ঞান কমিউনিটিতে টিকে থাকে',
    bg: '#fffcf5',
    color: '#bf0022',
    rounding: '',
  },
  {
    icon: marketingIcon,
    title: 'ফেসবুক ক্যাম্পেইন',
    desc: 'যেখানে মানুষ সবচেয়ে বেশি ভুল তথ্যের মুখোমুখি হয়, সেখানেই সচেতনতা পৌঁছে দেওয়া হয় সহজ, শেয়ারযোগ্য ও বাংলায় তৈরি কনটেন্টের মাধ্যমে',
    bg: '#f5f8ff',
    color: '#573fe0',
    rounding: 'rounded-r-xl',
  },
]
</script>

<template>
  <section class="border-t border-brand-100 bg-white">
    <div class="grid gap-10 px-[42px] py-14 lg:grid-cols-2">
      <div class="flex flex-col items-start gap-3 lg:sticky lg:top-6 lg:self-start">
        <p class="bg-accent-700 px-3 py-1.5 font-heading text-base text-accent-50">
          আমরা কী করছি, কেন করছি, এবং কীভাবে করছি
        </p>
        <p class="font-heading text-3xl font-bold leading-snug tracking-tight text-brand-500 lg:text-[48px]">
          তথ্য বিভ্রান্তির বিরুদ্ধে একটি টেকসই, কমিউনিটি-চালিত উদ্যোগ
        </p>
        <button
          type="button"
          class="mt-2 flex items-center gap-3 rounded bg-brand-500 px-[18px] py-4 font-heading text-sm font-medium leading-none text-accent-50"
        >
          Explore Fact Cheker
          <span class="h-4 w-4 [&>svg]:h-full [&>svg]:w-full" v-html="arrowUpRight" />
        </button>
      </div>

      <div class="flex flex-col gap-6">
        <div>
          <p class="font-heading text-xl font-medium tracking-tight text-brand-500 sm:text-2xl">
            একটি বাংলাভাষী তথ্য যাচাই ও সচেতনতা প্ল্যাটফর্ম
          </p>
          <p class="mt-3 text-justify font-heading text-lg leading-relaxed text-accent-700">
            এই প্ল্যাটফর্ম কক্সবাজারের তরুণ সম্প্রদায়ের জন্য তৈরি একটি ডিজিটাল হাতিয়ার যেখানে যে কেউ একটি
            খবর, ছবি, ভিডিও বা ফরোয়ার্ড করা মেসেজ কয়েকটি সহজ ধাপে যাচাই করতে পারেন, ভুল তথ্য চিনতে শিখতে
            পারেন, এবং প্রয়োজনে সন্দেহজনক কনটেন্ট রিপোর্ট করতে পারেন।
          </p>
        </div>
        <div>
          <p class="font-heading text-xl font-medium tracking-tight text-brand-500 sm:text-2xl">
            কারণ ভুল তথ্য এখানে বাস্তব ক্ষতি করে
          </p>
          <p class="mt-3 text-justify font-heading text-lg leading-relaxed text-accent-700">
            এই প্ল্যাটফর্ম কক্সবাজারের তরুণ সম্প্রদায়ের জন্য তৈরি একটি ডিজিটাল হাতিয়ার — যেখানে যে কেউ একটি
            খবর, ছবি, ভিডিও বা ফরোয়ার্ড করা মেসেজ কয়েকটি সহজ ধাপে যাচাই করতে পারেন। এটি শুধু একটি ওয়েবসাইট
            নয় — প্রশিক্ষণ, ফেসবুক ক্যাম্পেইন ও স্থানীয় স্বেচ্ছাসেবকদের নিয়ে গড়া একটি পূর্ণাঙ্গ উদ্যোগের অংশ।
          </p>
        </div>

        <div>
          <p class="mb-4 font-heading text-xl font-medium tracking-tight text-brand-500 sm:text-2xl">
            তিনটি স্তম্ভের মাধ্যমে
          </p>
          <div class="flex flex-col">
            <div
              v-for="pillar in PILLARS"
              :key="pillar.title"
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
