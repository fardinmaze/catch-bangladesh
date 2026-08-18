<script setup>
import heroBg from '@/assets/photos/hero-bg.png'
import { useLang } from '@/stores/lang'

const { t } = useLang()
</script>

<template>
  <section
    class="relative flex min-h-[360px] flex-col justify-end bg-cover bg-center px-[42px] py-3 sm:min-h-[500px] lg:min-h-[600px]"
    :style="{ backgroundImage: `url(${heroBg})` }"
  >
    <div class="flex flex-col items-start gap-4 py-3">
      <p
        class="bg-brand-500 px-6 pb-1 pt-1.5 font-heading text-3xl font-medium leading-snug tracking-tight text-accent-50 sm:text-4xl lg:text-[48px]"
      >
        {{ t.hero.slogan }}
      </p>
      <p class="max-w-[991px] font-heading text-lg leading-relaxed text-accent-700 sm:text-xl lg:text-2xl">
        {{ t.hero.subtitle }}
      </p>
      <div class="flex items-center gap-3">
        <button
          type="button"
          class="rounded bg-brand-500 px-[18px] py-4 font-heading text-sm font-medium leading-none text-accent-50"
        >
          {{ t.hero.pledgePrimary }}
        </button>
        <button
          type="button"
          class="rounded border border-brand-500 px-[18px] py-4 font-heading text-sm font-medium leading-none text-brand-500"
        >
          {{ t.hero.pledgeSecondary }}
        </button>
      </div>
    </div>
  </section>
</template>
