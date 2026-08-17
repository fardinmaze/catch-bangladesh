<script setup>
import arrowUpRight from '@/assets/icons/arrow-up-right.svg?raw'

const STEPS = [
  {
    n: '১',
    title: 'নির্বাচন করুন',
    desc: 'আপনি কী যাচাই করতে চান পোস্ট, ছবি, ভিডিও নাকি মেসেজ',
    bg: '#f6fdfe',
    border: '#0057b8',
    badgeBg: '#e6eff8',
    color: '#0057b8',
  },
  {
    n: '২',
    title: 'ধাপে ধাপে উত্তর দিন',
    desc: 'উৎস, তারিখ, প্রেক্ষাপট ও মিডিয়া সম্পর্কে কয়েকটি সহজ প্রশ্নের উত্তর দিন',
    bg: '#f5fff6',
    border: '#008610',
    badgeBg: '#c2ffc8',
    color: '#008610',
  },
  {
    n: '৩',
    title: 'ফলাফল পান',
    desc: 'তথ্যটি যাচাই করা, আরও যাচাই প্রয়োজন, নাকি বিভ্রান্তিকর স্পষ্ট উত্তর পাবেন',
    bg: '#fffcf5',
    border: '#bf0022',
    badgeBg: '#ffedc2',
    color: '#bf0022',
  },
]
</script>

<template>
  <section class="border-t border-brand-50 bg-white">
    <div class="flex flex-col items-center gap-8 px-[42px] py-14">
      <div class="flex w-full flex-col items-start gap-1.5">
        <p class="bg-accent-900 px-3 py-2 font-heading text-base text-accent-50">ফ্যাক্ট-চেকিং টুল</p>
        <p class="font-heading text-3xl font-bold leading-snug tracking-tight text-brand-500 lg:text-[48px]">
          সন্দেহ হচ্ছে? এখনই যাচাই করুন
        </p>
        <p class="font-heading text-xl text-accent-700 sm:text-2xl">
          আপনার হাতের কাছেই একটি সহজ টুল — এক মিনিটে সত্য-মিথ্যা যাচাই করুন
        </p>
      </div>

      <div class="flex w-full flex-col gap-3 font-heading text-lg leading-relaxed text-accent-700 sm:text-xl">
        <p>
          প্রতিদিন আমাদের সামনে আসে অসংখ্য পোস্ট, ছবি, ভিডিও আর ফরোয়ার্ড করা মেসেজ। সবকিছু সত্য নয়, আবার
          সবকিছু মিথ্যাও নয় — সমস্যা হলো, না যাচাই করে বোঝার উপায় নেই।
        </p>
        <p>
          তাই আমরা তৈরি করেছি একটি ধাপে ধাপে যাচাই চেকলিস্ট, যেখানে আপনি নিজেই — কোনো প্রযুক্তিগত জ্ঞান
          ছাড়াই — যেকোনো তথ্যের সত্যতা পরীক্ষা করতে পারবেন। উৎস কী, তথ্যটি কোথা থেকে এসেছে, ছবি বা ভিডিওটি
          আসল কি না, এবং শেয়ার করলে কারও ক্ষতি হবে কি না — সবকিছু একসাথে যাচাই হয়ে যাবে কয়েকটি সহজ
          প্রশ্নের মাধ্যমে।
        </p>
      </div>

      <p class="max-w-3xl text-center font-heading text-xl leading-relaxed text-accent-700 sm:text-[32px]">
        কোনো ভুল উত্তর নেই, এটি একটি পরীক্ষা নয়<br />
        এটি আপনাকে সঠিক প্রশ্ন জিজ্ঞেস করতে সাহায্য করার একটি হাতিয়ার।
      </p>

      <div class="grid w-full gap-px sm:grid-cols-3">
        <div
          v-for="step in STEPS"
          :key="step.n"
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
        <button
          type="button"
          class="flex items-center gap-3 rounded bg-brand-500 px-[18px] py-4 font-heading text-sm font-medium leading-none text-accent-50"
        >
          Fact Check Now
          <span class="h-4 w-4 [&>svg]:h-full [&>svg]:w-full" v-html="arrowUpRight" />
        </button>
        <button
          type="button"
          class="rounded border border-brand-500 px-[18px] py-4 font-heading text-sm font-medium leading-none text-brand-500"
        >
          Explore Our Learning Materials
        </button>
      </div>
    </div>
  </section>
</template>
