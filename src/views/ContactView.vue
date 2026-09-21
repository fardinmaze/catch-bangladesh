<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
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

const FIELD =
  'w-full rounded border border-accent-100 bg-white px-4 py-3 font-heading text-sm text-accent-900 placeholder:text-accent-600 focus:border-brand-500 focus:outline-none'

const name = ref('')
const email = ref('')
const message = ref('')
const sent = ref(false)

// There is no backend: "Send" opens the visitor's own email app with the message pre-filled to the office address.
function submit() {
  const subject = `${t.value.contactPage.form.subject} — ${name.value}`
  const body = `${message.value}\n\n—\n${name.value}\n${email.value}`
  window.location.href = `${CONTACT_HREF.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  sent.value = true
}
</script>

<template>
  <main class="flex w-full flex-col gap-8 px-6 py-14 sm:px-[var(--page-gutter)]">
    <div class="flex max-w-2xl flex-col gap-6">
      <p class="w-fit bg-accent-900 px-3 py-2 font-heading text-sm text-accent-50">{{ t.contactPage.eyebrow }}</p>
      <p class="font-heading text-3xl font-bold leading-snug tracking-tight text-brand-500 lg:text-[40px]">
        {{ t.contactPage.headline }}
      </p>
      <p class="font-heading text-lg leading-relaxed text-accent-700 sm:text-xl">{{ t.contactPage.subtitle }}</p>
    </div>

    <div class="grid items-start gap-6 lg:grid-cols-2">
      <form
        class="flex flex-col gap-5 rounded border border-accent-100 bg-white px-4 py-6 sm:px-6"
        @submit.prevent="submit"
      >
        <p class="font-heading text-xl font-semibold text-accent-900">{{ t.contactPage.form.heading }}</p>

        <div class="flex flex-col gap-2">
          <label for="contact-name" class="font-heading text-sm font-semibold text-accent-900">
            {{ t.contactPage.form.nameLabel }}
          </label>
          <input
            id="contact-name"
            v-model.trim="name"
            type="text"
            name="name"
            required
            autocomplete="name"
            :placeholder="t.contactPage.form.namePlaceholder"
            :class="FIELD"
          />
        </div>

        <div class="flex flex-col gap-2">
          <label for="contact-email" class="font-heading text-sm font-semibold text-accent-900">
            {{ t.contactPage.form.emailLabel }}
          </label>
          <input
            id="contact-email"
            v-model.trim="email"
            type="email"
            name="email"
            required
            autocomplete="email"
            :placeholder="t.contactPage.form.emailPlaceholder"
            :class="FIELD"
          />
        </div>

        <div class="flex flex-col gap-2">
          <label for="contact-message" class="font-heading text-sm font-semibold text-accent-900">
            {{ t.contactPage.form.messageLabel }}
          </label>
          <textarea
            id="contact-message"
            v-model.trim="message"
            name="message"
            rows="6"
            maxlength="1000"
            required
            :placeholder="t.contactPage.form.messagePlaceholder"
            :class="[FIELD, 'resize-y']"
          />
        </div>

        <button
          type="submit"
          class="w-fit rounded-button bg-brand-500 px-6 py-3.5 text-center font-nav text-sm font-bold text-white"
        >
          {{ t.contactPage.form.send }}
        </button>

        <p v-if="sent" role="status" class="font-heading text-sm leading-relaxed text-accent-700">
          {{ t.contactPage.form.sentNote }}
        </p>
      </form>

      <div class="flex flex-col gap-6">
        <div class="flex flex-col gap-3 rounded border border-accent-100 bg-[#f9fafa] px-4 py-4">
          <p class="font-heading text-base font-semibold text-accent-900">{{ t.footer.contactHeading }}</p>
          <p class="font-heading text-base text-accent-700">{{ t.footer.address }}</p>
          <p class="font-heading text-base text-accent-700">
            <a :href="CONTACT_HREF.email" class="underline-offset-4 hover:underline">{{ t.footer.email }}</a>
          </p>
          <p class="font-heading text-base text-accent-700">{{ t.footer.phone }}</p>
          <p class="font-heading text-base text-accent-700">
            <a
              :href="CONTACT_HREF.whatsapp"
              target="_blank"
              rel="noopener"
              class="underline-offset-4 hover:underline"
            >
              {{ t.footer.whatsapp }}
            </a>
          </p>

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
      </div>
    </div>
  </main>
</template>
