<script setup>
import { computed, nextTick, onMounted } from 'vue'
import archive1 from '@/assets/photos/archive-1.png'
import archive2 from '@/assets/photos/archive-2.png'
import arrowLeft from '@/assets/icons/arrow-left.svg?raw'
import arrowRight from '@/assets/icons/arrow-right.svg?raw'
import { useLang } from '@/stores/lang'
import { useCardScroller } from '@/composables/useCardScroller'

const { t } = useLang()
const { trackEl, canScrollPrev, canScrollNext, updateScrollState, scrollByCard } = useCardScroller()

const IMAGES = [archive1, archive2, archive1, archive2, archive1, archive2]
const TAG_COLORS = {
  'ডিসইনফরমেশন': '#e10000',
  Disinformation: '#e10000',
  'সত্য তথ্য': '#008939',
  'True Fact': '#008939',
  'মিসইনফরমেশন': '#b26a00',
  Misinformation: '#b26a00',
  'ম্যালইনফরমেশন': '#8e1b1b',
  Malinformation: '#8e1b1b',
}

const CARDS = computed(() =>
  t.value.communityArchive.cards.map((card, i) => ({
    ...card,
    image: IMAGES[i % IMAGES.length],
    tagBg: TAG_COLORS[card.tag] ?? '#424243',
  })),
)

onMounted(() => nextTick(updateScrollState))
</script>

<template>
  <section class="border-t border-brand-50 bg-white">
    <div class="flex flex-col gap-8 px-[42px] py-14">
      <div class="flex flex-col items-start gap-1.5">
        <p class="bg-accent-900 px-3 py-2 font-heading text-base text-accent-50">{{ t.communityArchive.eyebrow }}</p>
        <p class="font-heading text-3xl font-bold leading-snug tracking-tight text-brand-500 lg:text-[48px]">
          {{ t.communityArchive.headline }}
        </p>
        <p class="font-heading text-xl text-accent-700 sm:text-2xl">
          {{ t.communityArchive.subtitle }}
        </p>
        <p class="mt-2 max-w-3xl font-heading text-lg leading-relaxed text-accent-700">
          {{ t.communityArchive.para }}
        </p>
      </div>

      <div
        ref="trackEl"
        class="flex gap-8 overflow-x-auto scroll-smooth snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        @scroll="updateScrollState"
      >
        <div
          v-for="(card, i) in CARDS"
          :key="i"
          data-card
          class="relative h-[420px] w-[85%] shrink-0 snap-start overflow-hidden rounded-xl sm:h-[480px] sm:w-[380px] lg:w-[400px]"
        >
          <img :src="card.image" alt="" class="absolute inset-0 h-full w-full object-cover blur-[2px]" />
          <div class="absolute inset-0 bg-gradient-to-b from-transparent to-black/70" />

          <div
            class="absolute left-4 top-4 flex size-[92px] items-center justify-center rounded-full bg-accent-800 text-accent-50"
          >
            <span class="font-heading text-3xl">{{ card.score }}</span
            ><span class="font-heading text-sm">{{ t.communityArchive.scoreSuffix }}</span>
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
        <button
          type="button"
          :disabled="!canScrollPrev"
          class="rounded-xl bg-accent-50 p-4 text-brand-500 transition-opacity disabled:cursor-not-allowed disabled:opacity-30"
          @click="scrollByCard(-1)"
        >
          <span class="block h-4 w-4 [&>svg]:h-full [&>svg]:w-full" v-html="arrowLeft" />
        </button>
        <button
          type="button"
          :disabled="!canScrollNext"
          class="rounded-xl bg-accent-50 p-4 text-brand-500 transition-opacity disabled:cursor-not-allowed disabled:opacity-30"
          @click="scrollByCard(1)"
        >
          <span class="block h-4 w-4 [&>svg]:h-full [&>svg]:w-full" v-html="arrowRight" />
        </button>
      </div>
    </div>
  </section>
</template>
