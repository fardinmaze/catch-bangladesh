<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useLang } from '@/stores/lang'
import { downloadResultCard } from '@/composables/useResultCard'
import { parseUrl } from '@/composables/useLinkPreview'

const { t, isBn } = useLang()

const props = defineProps({
  verdict: { type: String, required: true },
  session: { type: Object, required: true },
})
defineEmits(['restart'])

const VERDICT_META = {
  verified: { key: 'verified', badge: '✓', textClass: 'text-[#2e7d32]', borderClass: 'border-[#2e7d32]', bgClass: 'bg-[#2e7d32]/5' },
  needs_verification: {
    key: 'needsVerification',
    badge: '!',
    textClass: 'text-[#b26a00]',
    borderClass: 'border-[#f9a825]',
    bgClass: 'bg-[#f9a825]/10',
  },
  misleading_harmful: {
    key: 'misleadingHarmful',
    badge: '✕',
    textClass: 'text-brand-500',
    borderClass: 'border-brand-500',
    bgClass: 'bg-brand-50/40',
  },
}

const meta = computed(() => VERDICT_META[props.verdict])
const content = computed(() => t.value.factChecker.result[meta.value.key])

const contentTypeLabel = computed(() => {
  const opt = t.value.factChecker.start.options.find((o) => o.value === props.session.content_type)
  return opt ? opt.label : ''
})

const linkPreview = computed(() => parseUrl(props.session.content_url))

const resultColorHex = computed(() => {
  if (props.verdict === 'verified') return '#2e7d32'
  if (props.verdict === 'needs_verification') return '#f9a825'
  return '#f40000'
})

function handleDownload() {
  downloadResultCard({
    colorHex: resultColorHex.value,
    badge: meta.value.badge,
    label: content.value.label,
    summaryLine: `${t.value.factChecker.result.summaryLabel}: ${contentTypeLabel.value}`,
    body: content.value.body,
    slogan: t.value.footer.slogan,
    filename: `catch-bangladesh-fact-check-${props.verdict}.png`,
    imageUrl: props.session.content_image_url,
    linkPreview: linkPreview.value,
  })
}
</script>

<template>
  <section class="flex flex-col gap-6">
    <div class="flex flex-col items-center gap-3 rounded-lg border-2 px-6 py-10 text-center" :class="[meta.borderClass, meta.bgClass]">
      <span class="text-6xl leading-none" :class="meta.textClass">{{ meta.badge }}</span>
      <p class="font-heading text-2xl font-bold tracking-tight sm:text-[32px]" :class="meta.textClass">
        {{ content.label }}
      </p>
      <p class="font-heading text-xs font-medium uppercase tracking-wide text-accent-600">{{ content.title }}</p>
    </div>

    <div class="flex flex-col gap-3">
      <p class="font-heading text-sm text-accent-600">
        {{ t.factChecker.result.summaryLabel }}: <span class="font-medium text-accent-900">{{ contentTypeLabel }}</span>
      </p>

      <div v-if="session.content_image_url || linkPreview" class="flex flex-col gap-1.5">
        <p class="font-heading text-xs font-semibold uppercase tracking-wide text-accent-600">
          {{ t.factChecker.result.yourContentLabel }}
        </p>
        <img
          v-if="session.content_image_url"
          :src="session.content_image_url"
          alt=""
          class="h-40 w-full rounded border border-accent-100 object-cover sm:w-64"
        />
        <a
          v-else-if="linkPreview"
          :href="linkPreview.href"
          target="_blank"
          rel="noopener"
          class="flex items-center gap-3 rounded border border-accent-100 bg-[#f9fafa] px-4 py-3"
        >
          <span class="text-xl leading-none">🔗</span>
          <div class="flex min-w-0 flex-col">
            <p class="truncate font-heading text-sm font-medium text-accent-900">{{ linkPreview.hostname }}</p>
            <p class="truncate font-heading text-xs text-accent-600">{{ linkPreview.href }}</p>
          </div>
        </a>
      </div>

      <p class="font-heading text-lg leading-relaxed text-accent-700 sm:text-xl">{{ content.body }}</p>
    </div>

    <div
      v-if="verdict === 'misleading_harmful' && session.harm_flags.length > 0"
      class="flex flex-wrap items-center gap-2 rounded border border-accent-100 bg-[#f9fafa] px-4 py-3"
    >
      <span class="font-heading text-sm text-accent-700">{{ content.harmLine }}</span>
      <RouterLink to="/help" class="font-heading text-sm font-semibold text-brand-500">
        {{ t.factChecker.result.helpCta }}
      </RouterLink>
    </div>

    <div class="flex flex-col gap-3">
      <button
        type="button"
        class="rounded bg-brand-500 px-6 py-3.5 text-center font-heading text-sm font-medium text-accent-50"
        @click="handleDownload"
      >
        {{ t.factChecker.result.downloadCta }}
      </button>
      <button
        type="button"
        class="rounded border border-accent-100 px-6 py-3.5 text-center font-heading text-sm font-medium text-accent-700"
        @click="$emit('restart')"
      >
        {{ t.factChecker.result.restartCta }}
      </button>
    </div>
  </section>
</template>
