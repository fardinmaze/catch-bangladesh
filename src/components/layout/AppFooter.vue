<script setup>
import footerCampaign from '@/assets/photos/footer-campaign.png'
import facebookIcon from '@/assets/icons/social/facebook.svg'
import linkedinIcon from '@/assets/icons/social/linkedin.svg'
import snapchatIcon from '@/assets/icons/social/snapchat.svg'
import flickrIcon from '@/assets/icons/social/flickr.svg'
import instagramIcon from '@/assets/icons/social/instagram.svg'

const SOCIALS = [
  { icon: facebookIcon, name: 'Facebook' },
  { icon: linkedinIcon, name: 'LinkedIn' },
  { icon: snapchatIcon, name: 'Snapchat' },
  { icon: flickrIcon, name: 'Flickr' },
  { icon: instagramIcon, name: 'Instagram' },
]

const COLUMNS = [
  {
    title: 'প্ল্যাটফর্ম',
    links: ['হোম', 'যাচাই করুন', 'শেখার উপকরণ', 'যাচাই আর্কাইভ', 'নির্ভরযোগ্য উৎস'],
  },
  {
    title: 'মডিউল',
    links: ['তথ্য বিভ্রান্তির পরিচিতি', 'ডিপ ফেক ও চিপ ফেক', 'তথ্য যাচাইয়ের টুল', 'সব মডিউল দেখুন →'],
  },
  {
    title: 'সাহায্য ও সহায়তা',
    links: ['সন্দেহজনক কনটেন্ট রিপোর্ট করুন', 'আমি ক্ষতির শিকার — সাহায্য চাই', 'প্রায়শই জিজ্ঞাসিত প্রশ্ন'],
  },
  {
    title: 'সংস্থা সম্পর্কে',
    links: ['আমাদের সম্পর্কে', 'প্রকল্প সম্পর্কে', 'গোপনীয়তা নীতি', 'ব্যবহারের শর্তাবলি'],
  },
]
</script>

<template>
  <footer class="bg-accent-900 px-6 py-12 text-accent-white sm:px-[72px] sm:py-[60px]">
    <div class="mx-auto flex max-w-6xl flex-col gap-10">
      <div class="flex flex-col gap-6">
        <div class="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div class="flex flex-col gap-1">
            <p class="w-fit bg-brand-500 px-6 pb-1 pt-1.5 font-heading text-lg text-accent-50">
              থামুন → যাচাই করুন → তারপর শেয়ার করুন
            </p>
            <p class="max-w-md font-heading text-sm leading-snug text-accent-50">
              অনলাইনে যা দেখছেন, সবকিছুই সত্য নাও হতে পারে। কোনো খবর, ছবি, ভিডিও বা মেসেজ শেয়ার করার আগে
              একটু থামুন। দেখে নিন তথ্যটি ঠিক কি না তারপর সিদ্ধান্ত নিন।
            </p>
          </div>
          <div class="flex h-24 w-full max-w-xs items-center justify-center bg-brand-500 sm:w-80">
            <img :src="footerCampaign" alt="" class="h-full object-contain" />
          </div>
        </div>

        <div class="flex items-center gap-5">
          <img
            v-for="social in SOCIALS"
            :key="social.name"
            :src="social.icon"
            :alt="social.name"
            class="h-5 w-5"
          />
        </div>
      </div>

      <div class="grid gap-8 border-t border-accent-700 pt-10 sm:grid-cols-2 lg:grid-cols-4">
        <div v-for="col in COLUMNS" :key="col.title">
          <p class="font-serif text-2xl">{{ col.title }}</p>
          <ul class="mt-4 flex flex-col gap-2 font-nav text-lg">
            <li v-for="link in col.links" :key="link">{{ link }}</li>
          </ul>
        </div>
      </div>

      <div class="flex flex-col items-center gap-2 border-t border-accent-700 pt-10 text-center">
        <p class="font-serif text-2xl">যোগাযোগ করুন</p>
        <div class="flex flex-col items-center gap-2 font-nav text-lg">
          <p>বাড়ি এসই(সি) ৫/বি (পুরাতন ৮), রোড ১৩৬, গুলশান ১, ঢাকা ১২১২</p>
          <p>aab.mail@actionaid.org</p>
          <div class="flex flex-wrap items-center justify-center gap-6">
            <p>(+৮৮০-২) ৫৫০৪৪৮৫১-৫৭</p>
            <p>+৮৮০ ১৬৩১ ৬৫৪৩০৬ (হোয়াটসঅ্যাপ)</p>
          </div>
        </div>
      </div>

      <p class="border-t border-accent-700 pt-6 text-center font-heading text-base">
        © ২০২৬ ActionAid Bangladesh
      </p>
    </div>
  </footer>
</template>
