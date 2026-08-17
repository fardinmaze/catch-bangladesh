<script setup>
import { computed } from 'vue'
import { useLang } from '@/stores/lang'
import logoActionAid from '@/assets/logo-actionaid.png'

const { isBn, setLang } = useLang()

const NAV_LINKS = [
  { key: 'home', href: '/', labelBn: 'হোম', labelEn: 'Home' },
  { key: 'learn', href: '/learn', labelBn: 'শিখুন', labelEn: 'Learn' },
  { key: 'resources', href: '/resources', labelBn: 'নির্ভরযোগ্য উৎস', labelEn: 'Resources' },
]

const activeKey = 'home'

const ctaLabel = computed(() => (isBn.value ? 'ফ্যাক্ট চেকার মডিউল' : 'Fact Checker Module'))
</script>

<template>
  <header
    class="flex items-center justify-between gap-8 bg-white px-[42px] py-3 drop-shadow-[-4px_0px_5px_rgba(0,0,0,0.08)]"
  >
    <a href="/" class="shrink-0">
      <img :src="logoActionAid" alt="ActionAid" class="h-5 w-auto object-contain" />
    </a>

    <nav class="flex shrink-0 items-center gap-8 font-nav">
      <a
        v-for="link in NAV_LINKS"
        :key="link.key"
        :href="link.href"
        class="whitespace-nowrap text-base leading-normal"
        :class="
          link.key === activeKey
            ? 'font-semibold text-brand-500'
            : 'font-medium text-accent-900'
        "
      >
        {{ isBn ? link.labelBn : link.labelEn }}
      </a>
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

      <a
        href="/fact-checker"
        class="rounded whitespace-nowrap bg-brand-500 px-[18px] py-4 text-center text-sm font-medium leading-none text-accent-50"
      >
        {{ ctaLabel }}
      </a>
    </div>
  </header>
</template>
