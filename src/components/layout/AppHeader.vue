<script setup>
import { computed, onMounted, onUnmounted, ref, useTemplateRef } from 'vue'
import { useRoute } from 'vue-router'
import { useLang } from '@/stores/lang'
import logoActionAid from '@/assets/logo-actionaid.png'

const { isBn, setLang } = useLang()
const route = useRoute()

const NAV_LINKS = [
  { key: 'home', to: '/', labelBn: 'হোম', labelEn: 'Home' },
  { key: 'learn', to: '/learn', labelBn: 'শিখুন', labelEn: 'Learn' },
  { key: 'contact', to: '/contact', labelBn: 'যোগাযোগ', labelEn: 'Contact' },
]

const activeKey = computed(() => {
  if (route.path === '/') return 'home'
  if (route.path.startsWith('/learn')) return 'learn'
  if (route.path.startsWith('/contact')) return 'contact'
  return ''
})

const ctaLabel = computed(() => (isBn.value ? 'ফ্যাক্ট চেকার মডিউল' : 'Fact Checker Module'))

const headerEl = useTemplateRef('headerEl')
const hidden = ref(false)
let lastY = 0
let ticking = false

function syncHeaderHeight() {
  if (headerEl.value) {
    document.documentElement.style.setProperty('--header-h', `${headerEl.value.offsetHeight}px`)
  }
}

function handleScroll() {
  if (ticking) return
  ticking = true
  requestAnimationFrame(() => {
    const y = Math.max(window.scrollY, 0)
    if (y < 40) {
      hidden.value = false
    } else if (y > lastY) {
      hidden.value = true
    } else if (y < lastY) {
      hidden.value = false
    }
    lastY = y
    ticking = false
  })
}

onMounted(() => {
  syncHeaderHeight()
  window.addEventListener('scroll', handleScroll, { passive: true })
  window.addEventListener('resize', syncHeaderHeight)
})
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('resize', syncHeaderHeight)
})
</script>

<template>
  <header
    ref="headerEl"
    class="sticky top-0 z-50 flex items-center justify-between gap-8 bg-white px-[42px] py-3 drop-shadow-[-4px_0px_5px_rgba(0,0,0,0.08)] transition-transform duration-300"
    :class="hidden ? '-translate-y-full' : 'translate-y-0'"
  >
    <RouterLink to="/" class="shrink-0">
      <img :src="logoActionAid" alt="ActionAid" class="h-5 w-auto object-contain" />
    </RouterLink>

    <nav class="flex shrink-0 items-center gap-8 font-nav">
      <RouterLink
        v-for="link in NAV_LINKS"
        :key="link.key"
        :to="link.to"
        class="whitespace-nowrap text-base leading-normal"
        :class="
          link.key === activeKey
            ? 'font-semibold text-brand-500'
            : 'font-medium text-accent-900'
        "
      >
        {{ isBn ? link.labelBn : link.labelEn }}
      </RouterLink>
    </nav>

    <div class="flex shrink-0 items-center gap-8">
      <div class="flex items-center gap-3 font-nav text-base leading-normal">
        <button
          type="button"
          class="font-semibold"
          :class="isBn ? 'text-brand-500' : 'text-accent-600'"
          @click="setLang('bn')"
        >
          BN
        </button>
        <button
          type="button"
          class="font-medium"
          :class="!isBn ? 'text-brand-500' : 'text-accent-600'"
          @click="setLang('en')"
        >
          EN
        </button>
      </div>

      <RouterLink
        to="/fact-checker"
        class="rounded whitespace-nowrap bg-brand-500 px-[18px] py-4 text-center text-sm font-medium leading-none text-accent-50"
      >
        {{ ctaLabel }}
      </RouterLink>
    </div>
  </header>
</template>
