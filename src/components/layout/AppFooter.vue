<script setup>
import logoActionAid from '@/assets/logo-actionaid.png'
import facebookIcon from '@/assets/icons/social/facebook.svg'
import linkedinIcon from '@/assets/icons/social/linkedin.svg'
import snapchatIcon from '@/assets/icons/social/snapchat.svg'
import flickrIcon from '@/assets/icons/social/flickr.svg'
import instagramIcon from '@/assets/icons/social/instagram.svg'
import { useLang } from '@/stores/lang'
import { CONTACT_HREF } from '@/data/contact'

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
  <footer class="bg-accent-900 px-6 py-12 text-accent-white sm:px-[72px] sm:py-[60px] xl:px-[var(--page-gutter)]">
    <div class="flex flex-col gap-10">
      <div class="flex flex-col gap-6">
        <div class="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <img :src="logoActionAid" alt="ActionAid" class="h-6 w-auto shrink-0 object-contain" />
          <div class="flex flex-col gap-1 sm:items-end sm:text-right">
            <p class="w-fit bg-brand-500 px-6 pb-1 pt-1.5 font-heading text-lg text-accent-50">
              {{ t.footer.slogan }}
            </p>
            <p class="max-w-md font-heading text-sm leading-snug text-accent-50">
              {{ t.footer.subtitle }}
            </p>
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
        <div v-for="col in t.footer.columns" :key="col.title">
          <p class="font-serif text-2xl">{{ col.title }}</p>
          <ul class="mt-4 flex flex-col gap-2 font-nav text-lg">
            <li v-for="link in col.links" :key="link">{{ link }}</li>
          </ul>
        </div>
      </div>

      <div class="flex flex-col items-center gap-2 border-t border-accent-700 pt-10 text-center">
        <p class="font-serif text-2xl">{{ t.footer.contactHeading }}</p>
        <div class="flex flex-col items-center gap-2 font-nav text-lg">
          <p>{{ t.footer.address }}</p>
          <p>
            <a :href="CONTACT_HREF.email" class="underline-offset-4 hover:underline">{{ t.footer.email }}</a>
          </p>
          <div class="flex flex-wrap items-center justify-center gap-6">
            <p>{{ t.footer.phone }}</p>
            <p>
              <a
                :href="CONTACT_HREF.whatsapp"
                target="_blank"
                rel="noopener"
                class="underline-offset-4 hover:underline"
              >
                {{ t.footer.whatsapp }}
              </a>
            </p>
          </div>
        </div>
      </div>

      <p class="border-t border-accent-700 pt-6 text-center font-heading text-base">
        {{ t.footer.copyright }}
      </p>
    </div>
  </footer>
</template>
