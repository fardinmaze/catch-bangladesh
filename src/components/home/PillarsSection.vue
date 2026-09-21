<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import pillarsBg from '@/assets/photos/pillars-section-bg.png'
import checklistIcon from '@/assets/icons/checklist.svg?raw'
import puzzleIcon from '@/assets/icons/puzzle.svg?raw'
import marketingIcon from '@/assets/icons/marketing-advertising.svg?raw'
import arrowUpRight from '@/assets/icons/arrow-up-right.svg?raw'
import { useLang } from '@/stores/lang'

gsap.registerPlugin(ScrollTrigger)

const { t } = useLang()

const META = [
  { icon: checklistIcon, bg: '#f5fff6', color: '#008610', rounding: '' },
  { icon: puzzleIcon, bg: '#fffcf5', color: '#bf0022', rounding: '' },
  { icon: marketingIcon, bg: '#f5f8ff', color: '#573fe0', rounding: 'rounded-r-xl' },
]

const PILLARS = computed(() => t.value.pillarsSection.pillars.map((pillar, i) => ({ ...pillar, ...META[i] })))

// GSAP-driven crossfade: the right column is a short (150vh) track; a sticky
// viewport inside it pins in place (in sync with the left column's own
// sticky position) while three stacked panels fade in/out, so only one panel
// is ever visible at a time. The pin only lasts ~80vh of scrolling, so the
// first change starts almost immediately and never looks stuck.
const trackEl = ref(null)
const panelEls = []
let mm

onMounted(() => {
  mm = gsap.matchMedia()
  mm.add('(min-width: 1024px)', () => {
    const panels = panelEls.filter(Boolean)
    if (panels.length < 3 || !trackEl.value) return

    gsap.set(panels, { autoAlpha: 0, y: 24 })
    gsap.set(panels[0], { autoAlpha: 1, y: 0 })

    const headerOffset = () =>
      parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) || 0

    // The sticky viewport is 70dvh tall and pins at the header's bottom edge, so it releases when the
    // track's bottom reaches header + 70dvh — end the scrub exactly there so animation and pin finish together.
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: trackEl.value,
        start: () => `top top+=${headerOffset()}`,
        end: () => `bottom top+=${headerOffset() + window.innerHeight * 0.7}`,
        scrub: 0.4,
        invalidateOnRefresh: true,
      },
    })

    // Timeline is 1 long: panel 1 → 2 at 20–35%, panel 2 → 3 at 55–70%, then the last panel holds for the
    // remaining 30% so it is readable before the section unpins.
    tl.to(panels[0], { autoAlpha: 0, y: -24, duration: 0.15 }, 0.2)
      .to(panels[1], { autoAlpha: 1, y: 0, duration: 0.15 }, 0.2)
      .to(panels[1], { autoAlpha: 0, y: -24, duration: 0.15 }, 0.55)
      .to(panels[2], { autoAlpha: 1, y: 0, duration: 0.15 }, 0.55)
      .set({}, {}, 1)

    return () => tl.scrollTrigger?.kill()
  })
})

onUnmounted(() => {
  mm?.revert()
})
</script>

<template>
  <section class="relative border-t border-brand-100 bg-white">
    <div aria-hidden="true" class="pointer-events-none absolute inset-0 -z-10">
      <div class="sticky top-[var(--header-h)] h-[70dvh] overflow-hidden">
        <img :src="pillarsBg" alt="" class="h-full w-full object-cover opacity-[0.24]" />
      </div>
    </div>

    <div class="grid gap-10 px-[var(--page-gutter)] py-14 lg:py-0 lg:grid-cols-2">
      <div class="flex flex-col items-start justify-center gap-3 lg:sticky lg:top-[var(--header-h)] lg:h-[70dvh]">
        <p class="bg-accent-700 px-3 py-1.5 font-heading text-base text-accent-50">
          {{ t.pillarsSection.eyebrow }}
        </p>
        <p class="font-heading text-3xl font-bold leading-snug tracking-tight text-brand-500 lg:text-[48px]">
          {{ t.pillarsSection.headline }}
        </p>
        <RouterLink
          to="/fact-checker"
          class="flex items-center gap-3 rounded-button bg-brand-500 px-[18px] py-4 font-heading text-sm font-medium leading-none text-accent-50"
        >
          {{ t.pillarsSection.ctaButton }}
          <span class="h-4 w-4 [&>svg]:h-full [&>svg]:w-full" v-html="arrowUpRight" />
        </RouterLink>
      </div>

      <div>
        <!-- Mobile/tablet: plain stacked flow, no pinning/crossfade -->
        <div class="flex flex-col gap-6 lg:hidden">
          <div class="flex flex-col justify-center gap-3">
            <p class="font-heading text-xl font-medium tracking-tight text-brand-500 sm:text-2xl">
              {{ t.pillarsSection.subhead1 }}
            </p>
            <p
              v-for="(para, i) in t.pillarsSection.body1"
              :key="i"
              class="text-justify font-heading text-lg leading-relaxed text-accent-700"
            >
              {{ para }}
            </p>
          </div>
          <div class="flex flex-col justify-center gap-3">
            <p class="font-heading text-xl font-medium tracking-tight text-brand-500 sm:text-2xl">
              {{ t.pillarsSection.subhead2 }}
            </p>
            <p
              v-for="(para, i) in t.pillarsSection.body2"
              :key="i"
              class="text-justify font-heading text-lg leading-relaxed text-accent-700"
            >
              {{ para }}
            </p>
          </div>

          <div class="flex flex-col justify-center gap-4">
            <p class="font-heading text-xl font-medium tracking-tight text-brand-500 sm:text-2xl">
              {{ t.pillarsSection.pillarsHeading }}
            </p>
            <div class="flex flex-col">
              <div
                v-for="(pillar, i) in PILLARS"
                :key="i"
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

        <!-- Desktop: tall scroll track with a sticky viewport crossfading one panel at a time -->
        <div ref="trackEl" class="relative hidden lg:block lg:h-[150vh]">
          <div class="sticky top-[var(--header-h)] flex h-[70dvh] items-center overflow-hidden">
            <div class="relative w-full">
              <div :ref="(el) => (panelEls[0] = el)" class="absolute inset-0 flex flex-col justify-center gap-3">
                <p class="font-heading text-xl font-medium tracking-tight text-brand-500 sm:text-2xl">
                  {{ t.pillarsSection.subhead1 }}
                </p>
                <p
                  v-for="(para, i) in t.pillarsSection.body1"
                  :key="i"
                  class="text-justify font-heading text-lg leading-relaxed text-accent-700"
                >
                  {{ para }}
                </p>
              </div>

              <div :ref="(el) => (panelEls[1] = el)" class="absolute inset-0 flex flex-col justify-center gap-3">
                <p class="font-heading text-xl font-medium tracking-tight text-brand-500 sm:text-2xl">
                  {{ t.pillarsSection.subhead2 }}
                </p>
                <p
                  v-for="(para, i) in t.pillarsSection.body2"
                  :key="i"
                  class="text-justify font-heading text-lg leading-relaxed text-accent-700"
                >
                  {{ para }}
                </p>
              </div>

              <div :ref="(el) => (panelEls[2] = el)" class="absolute inset-0 flex flex-col justify-center gap-4">
                <p class="font-heading text-xl font-medium tracking-tight text-brand-500 sm:text-2xl">
                  {{ t.pillarsSection.pillarsHeading }}
                </p>
                <div class="flex flex-col">
                  <div
                    v-for="(pillar, i) in PILLARS"
                    :key="i"
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
        </div>
      </div>
    </div>
  </section>
</template>
