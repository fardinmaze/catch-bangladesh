<script setup>
import { computed, onMounted, onUnmounted, ref, useTemplateRef, watch } from 'vue'
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

// Mobile side drawer holding the nav links + language toggle
const drawerOpen = ref(false)
function openDrawer() {
  drawerOpen.value = true
}
function closeDrawer() {
  drawerOpen.value = false
}
function handleKeydown(e) {
  if (e.key === 'Escape') closeDrawer()
}

watch(
  () => route.fullPath,
  () => closeDrawer(),
)
watch(drawerOpen, (open) => {
  document.documentElement.style.overflow = open ? 'hidden' : ''
})

onMounted(() => {
  syncHeaderHeight()
  window.addEventListener('scroll', handleScroll, { passive: true })
  window.addEventListener('resize', syncHeaderHeight)
  window.addEventListener('keydown', handleKeydown)
})
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('resize', syncHeaderHeight)
  window.removeEventListener('keydown', handleKeydown)
  document.documentElement.style.overflow = ''
})
</script>

<template>
  <header
    ref="headerEl"
    class="sticky top-0 z-50 flex items-center justify-between gap-8 bg-white px-4 py-3 drop-shadow-[-4px_0px_5px_rgba(0,0,0,0.08)] transition-transform duration-300 sm:px-6 lg:px-[42px]"
    :class="hidden ? '-translate-y-full' : 'translate-y-0'"
  >
    <RouterLink to="/" class="shrink-0">
      <img :src="logoActionAid" alt="ActionAid" class="h-5 w-auto object-contain" />
    </RouterLink>

    <nav class="hidden shrink-0 items-center gap-8 font-nav lg:flex">
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

    <div class="hidden shrink-0 items-center gap-8 lg:flex">
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

    <div class="flex shrink-0 items-center gap-3 lg:hidden">
      <RouterLink
        to="/fact-checker"
        class="rounded whitespace-nowrap bg-brand-500 px-3 py-2.5 text-center text-xs font-medium leading-none text-accent-50"
      >
        {{ ctaLabel }}
      </RouterLink>

      <button
        type="button"
        aria-label="Open menu"
        class="flex h-9 w-9 shrink-0 items-center justify-center text-accent-900"
        @click="openDrawer"
      >
        <svg viewBox="0 0 24 24" fill="none" class="h-6 w-6">
          <path
            d="M4 6h16M4 12h16M4 18h16"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
          />
        </svg>
      </button>
    </div>
  </header>

  <Teleport to="body">
    <div
      class="fixed inset-0 z-[60] bg-black/40 transition-opacity duration-300 lg:hidden"
      :class="drawerOpen ? 'opacity-100' : 'pointer-events-none opacity-0'"
      :inert="!drawerOpen"
      @click="closeDrawer"
    />

    <aside
      class="fixed inset-y-0 right-0 z-[70] flex w-[80%] max-w-xs flex-col gap-8 bg-white px-6 py-6 shadow-xl transition-transform duration-300 lg:hidden"
      :class="drawerOpen ? 'translate-x-0' : 'translate-x-full'"
      :inert="!drawerOpen"
    >
      <div class="flex items-center justify-between">
        <img :src="logoActionAid" alt="ActionAid" class="h-5 w-auto object-contain" />
        <button
          type="button"
          aria-label="Close menu"
          class="flex h-9 w-9 shrink-0 items-center justify-center text-accent-900"
          @click="closeDrawer"
        >
          <svg viewBox="0 0 24 24" fill="none" class="h-6 w-6">
            <path
              d="M6 6l12 12M18 6L6 18"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
            />
          </svg>
        </button>
      </div>

      <nav class="flex flex-col gap-6 font-nav text-lg">
        <RouterLink
          v-for="link in NAV_LINKS"
          :key="link.key"
          :to="link.to"
          class="whitespace-nowrap leading-normal"
          :class="
            link.key === activeKey
              ? 'font-semibold text-brand-500'
              : 'font-medium text-accent-900'
          "
        >
          {{ isBn ? link.labelBn : link.labelEn }}
        </RouterLink>
      </nav>

      <div class="mt-auto flex items-center gap-3 font-nav text-base leading-normal">
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
    </aside>
  </Teleport>
</template>
