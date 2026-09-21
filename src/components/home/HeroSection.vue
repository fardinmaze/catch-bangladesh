<script setup>
import { RouterLink } from 'vue-router'
import heroBg from '@/assets/photos/hero-bg.png'
import arrowRight from '@/assets/icons/arrow-right-24.svg'
import { useLang } from '@/stores/lang'

const { t } = useLang()
</script>

<template>
  <!--
    Illustration = assets/hero image.png (2167×726). Its people start ~42% across and the left ~40% is pale sky
    meant for the copy. From xl (1280px) the hero is exactly the image's proportions — so it is never cropped —
    and the text column is kept inside that pale left zone. Below xl the illustration is a band above the text,
    so the copy never sits on top of the people.
  -->
  <section class="hero relative flex flex-col overflow-hidden xl:aspect-[2167/726] xl:max-h-[760px] xl:justify-center">
    <div
      aria-hidden="true"
      class="pointer-events-none relative h-56 overflow-hidden sm:h-72 lg:h-96 xl:absolute xl:inset-0 xl:h-auto"
    >
      <img :src="heroBg" alt="" fetchpriority="high" class="h-full w-full object-cover object-right-top" />
    </div>

    <!-- soft white wash behind the copy so it stays legible over the foliage at bottom-left -->
    <div
      aria-hidden="true"
      class="pointer-events-none absolute inset-y-0 left-0 hidden w-[55%] bg-gradient-to-r from-white/75 via-white/45 to-transparent xl:block"
    />

    <!-- 82px side padding (29px on phones, where 82px would leave too little width); from xl the copy is vertically centred on the illustration -->
    <div class="relative px-[29px] pb-10 pt-6 md:px-[82px] xl:py-0">
      <div class="hero-copy flex w-full max-w-[601px] flex-col items-start gap-6">
        <!-- no whitespace around {{ line }} on purpose: the second line's leading space is part of the design -->
        <p
          v-for="(line, i) in t.hero.sloganLines"
          :key="i"
          class="hero-title whitespace-pre-wrap bg-[#e40c09] px-4 py-3 font-heading font-semibold leading-[1.2] text-white xl:whitespace-pre"
        >{{ line }}</p>

        <p class="hero-lead font-heading font-medium leading-[1.52] text-accent-700">
          {{ t.hero.subtitle }}
        </p>

        <div class="flex flex-wrap items-stretch gap-3">
          <!-- Myth vs Fact page isn't built yet; /learn is its parent in the site map, so it goes there for now. -->
          <RouterLink
            to="/learn"
            class="flex items-center justify-center gap-2.5 rounded-button border border-[#ffc2c0] bg-white px-6 py-3 font-nav text-sm font-bold leading-none text-[#cf0000]"
          >
            {{ t.hero.mythCta }}
            <img :src="arrowRight" alt="" class="size-6 shrink-0" />
          </RouterLink>

          <button
            type="button"
            class="flex min-w-[156px] items-center justify-center gap-2.5 rounded-button bg-brand-500 px-6 py-3 font-nav text-sm font-bold leading-none text-white"
          >
            {{ t.hero.pledgePrimary }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-title {
  font-size: 28px;
}
.hero-lead {
  font-size: 18px;
}

@media (min-width: 640px) {
  .hero-title {
    font-size: 36px;
  }
  .hero-lead {
    font-size: 20px;
  }
}

/* xl+: the paragraph lives in the pale left zone (people start at 42% of the width): it starts at the 82px left
   padding and is capped at Figma's 601px. The title bars don't wrap (as in Figma) and may overhang that column;
   the title grows 30px → 58px between 1280px and 1488px wide (Figma's frame width) — the second bar (~600px at
   58px) still clears the first person's face — and holds 58px beyond. Paragraph: 16px → 24px over the same range. */
@media (min-width: 1280px) {
  .hero-copy {
    max-width: none;
    width: min(601px, calc(42vw - 106px));
  }
  .hero-title {
    font-size: clamp(30px, calc(30px + (100vw - 1280px) * 0.1346), 58px);
  }
  .hero-lead {
    font-size: clamp(16px, calc(16px + (100vw - 1280px) * 0.0385), 24px);
  }
}
</style>
