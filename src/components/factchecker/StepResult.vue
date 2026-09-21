<script setup>
import { computed, ref, watch } from 'vue'
import { RouterLink } from 'vue-router'
import { useLang } from '@/stores/lang'
import { downloadResultCard } from '@/composables/useResultCard'
import { parseUrl, fetchLinkThumbnail } from '@/composables/useLinkPreview'

const { t } = useLang()

const props = defineProps({
  verdict: { type: String, required: true },
  session: { type: Object, required: true },
})
defineEmits(['restart'])

const VERDICT_META = {
  verified: {
    key: 'verified',
    badge: '✓',
    topBg: '#e8f8ea',
    topText: '#2e7d32',
    pillBg: '#2e7d32',
    pillText: '#ffffff',
  },
  needs_verification: {
    key: 'needsVerification',
    badge: '!',
    topBg: '#fff6e0',
    topText: '#b26a00',
    pillBg: '#f9a825',
    pillText: '#151516',
  },
  misleading_harmful: {
    key: 'misleadingHarmful',
    badge: '✕',
    topBg: '#fdeceb',
    topText: '#f40000',
    pillBg: '#f40000',
    pillText: '#ffffff',
  },
}

const meta = computed(() => VERDICT_META[props.verdict])
const content = computed(() => t.value.factChecker.result[meta.value.key])

const contentTypeLabel = computed(() => {
  const opt = t.value.factChecker.start.options.find((o) => o.value === props.session.content_type)
  return opt ? opt.label : ''
})

const linkPreview = computed(() => parseUrl(props.session.content_url))
const linkThumbnailUrl = ref(null)

watch(
  linkPreview,
  async (preview) => {
    linkThumbnailUrl.value = null
    if (!preview) return
    const href = preview.href
    const thumb = await fetchLinkThumbnail(href)
    if (linkPreview.value?.href === href) linkThumbnailUrl.value = thumb
  },
  { immediate: true },
)

function handleDownload() {
  downloadResultCard({
    badge: meta.value.badge,
    topBg: meta.value.topBg,
    topText: meta.value.topText,
    pillBg: meta.value.pillBg,
    pillText: meta.value.pillText,
    label: content.value.label,
    contentTypeLabel: contentTypeLabel.value,
    body: content.value.body,
    slogan: t.value.footer.slogan,
    filename: `catch-bangladesh-fact-check-${props.verdict}.png`,
    imageUrl: props.session.content_image_url,
    linkPreview: linkPreview.value,
    linkThumbnailUrl: linkThumbnailUrl.value,
  })
}
</script>

<template>
  <section class="flex flex-col gap-6">
    <div class="flex flex-col overflow-hidden rounded-lg border border-accent-100">
      <div class="flex items-center justify-center gap-2 py-3" :style="{ backgroundColor: meta.topBg }">
        <span class="text-xl font-bold leading-none" :style="{ color: meta.topText }">{{ meta.badge }}</span>
        <span class="font-heading text-lg font-semibold" :style="{ color: meta.topText }">{{ content.label }}</span>
      </div>

      <div class="relative h-72 w-full overflow-hidden bg-[#f5f5f6] sm:h-96">
        <img
          v-if="session.content_image_url"
          :src="session.content_image_url"
          alt=""
          class="absolute inset-0 h-full w-full object-cover"
        />
        <img
          v-else-if="linkPreview && linkThumbnailUrl"
          :src="linkThumbnailUrl"
          alt=""
          class="absolute inset-0 h-full w-full object-cover"
        />
        <div v-else-if="linkPreview" class="absolute inset-0 flex items-center justify-center px-6">
          <div class="flex max-w-full items-center gap-3 rounded border border-accent-100 bg-white px-4 py-3">
            <span class="shrink-0 text-2xl leading-none">🔗</span>
            <div class="flex min-w-0 flex-col">
              <p class="truncate font-heading text-sm font-medium text-accent-900">{{ linkPreview.hostname }}</p>
              <p class="truncate font-heading text-xs text-accent-600">{{ linkPreview.href }}</p>
            </div>
          </div>
        </div>
        <div v-else class="absolute inset-0 flex items-center justify-center">
          <span class="font-heading text-sm text-accent-600">{{ contentTypeLabel }}</span>
        </div>

        <div class="absolute inset-0 bg-gradient-to-b from-transparent to-black/70" />

        <div class="absolute inset-x-0 bottom-0 flex flex-col items-start gap-2 px-4 py-4 sm:px-6 sm:py-6">
          <span
            class="rounded-full px-3.5 py-1 font-heading text-sm"
            :style="{ backgroundColor: meta.pillBg, color: meta.pillText }"
          >
            {{ contentTypeLabel }}
          </span>
          <p class="font-heading text-xl font-bold leading-snug text-white sm:text-2xl">{{ content.body }}</p>
        </div>
      </div>

      <div class="flex items-center justify-center bg-accent-900 px-6 py-3">
        <p class="font-heading text-base font-medium text-brand-500 sm:text-lg">{{ t.footer.slogan }}</p>
      </div>
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
        class="rounded-button bg-brand-500 px-6 py-3.5 text-center font-heading text-sm font-medium text-accent-50"
        @click="handleDownload"
      >
        {{ t.factChecker.result.downloadCta }}
      </button>
      <button
        type="button"
        class="rounded-button border border-accent-100 px-6 py-3.5 text-center font-heading text-sm font-medium text-accent-700"
        @click="$emit('restart')"
      >
        {{ t.factChecker.result.restartCta }}
      </button>
    </div>
  </section>
</template>
