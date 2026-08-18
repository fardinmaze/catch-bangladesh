<script setup>
import { RouterLink } from 'vue-router'
import facebookIcon from '@/assets/icons/social/facebook.svg'
import linkedinIcon from '@/assets/icons/social/linkedin.svg'
import snapchatIcon from '@/assets/icons/social/snapchat.svg'
import flickrIcon from '@/assets/icons/social/flickr.svg'
import instagramIcon from '@/assets/icons/social/instagram.svg'
import { useLang } from '@/stores/lang'

const { t } = useLang()

const SOCIALS = [
  { icon: facebookIcon, name: 'Facebook' },
  { icon: linkedinIcon, name: 'LinkedIn' },
  { icon: snapchatIcon, name: 'Snapchat' },
  { icon: flickrIcon, name: 'Flickr' },
  { icon: instagramIcon, name: 'Instagram' },
]
</script>

<template>
  <main class="mx-auto flex w-full max-w-2xl flex-col gap-6 px-6 py-14 sm:px-[42px]">
    <p class="w-fit bg-accent-900 px-3 py-2 font-heading text-sm text-accent-50">{{ t.contactPage.eyebrow }}</p>
    <p class="font-heading text-3xl font-bold leading-snug tracking-tight text-brand-500 lg:text-[40px]">
      {{ t.contactPage.headline }}
    </p>
    <p class="font-heading text-lg leading-relaxed text-accent-700 sm:text-xl">{{ t.contactPage.subtitle }}</p>

    <div class="flex flex-col gap-3 rounded border border-accent-100 bg-[#f9fafa] px-4 py-4">
      <p class="font-heading text-base font-semibold text-accent-900">{{ t.footer.contactHeading }}</p>
      <p class="font-heading text-base text-accent-700">{{ t.footer.address }}</p>
      <p class="font-heading text-base text-accent-700">{{ t.footer.email }}</p>
      <p class="font-heading text-base text-accent-700">{{ t.footer.phone }}</p>
      <p class="font-heading text-base text-accent-700">{{ t.footer.whatsapp }}</p>

      <div class="flex items-center gap-5 pt-2">
        <img v-for="social in SOCIALS" :key="social.name" :src="social.icon" :alt="social.name" class="h-5 w-5" />
      </div>
    </div>

    <div class="flex flex-col gap-2 rounded border border-brand-500 px-4 py-4">
      <p class="font-heading text-base font-semibold text-accent-900">{{ t.contactPage.helpCalloutTitle }}</p>
      <p class="font-heading text-sm leading-relaxed text-accent-700">{{ t.contactPage.helpCalloutBody }}</p>
      <RouterLink to="/help" class="w-fit font-heading text-sm font-semibold text-brand-500">
        {{ t.contactPage.helpCta }}
      </RouterLink>
    </div>
  </main>
</template>
