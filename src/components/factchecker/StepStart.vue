<script setup>
import { computed, ref, watch } from 'vue'
import { useLang } from '@/stores/lang'
import { parseUrl } from '@/composables/useLinkPreview'
import OptionList from './OptionList.vue'
import WizardNav from './WizardNav.vue'

const { t } = useLang()

const props = defineProps({
  modelValue: { type: String, default: null },
  contentUrl: { type: String, default: null },
  contentImageUrl: { type: String, default: null },
})
const emit = defineEmits(['update:modelValue', 'update:contentUrl', 'selectImage', 'next'])

const urlDraft = ref(props.contentUrl || '')
watch(
  () => props.contentUrl,
  (val) => {
    if (val !== urlDraft.value) urlDraft.value = val || ''
  },
)

function onUrlInput() {
  emit('update:contentUrl', urlDraft.value)
}

const linkPreview = computed(() => parseUrl(urlDraft.value))

function onFileChange(e) {
  const file = e.target.files?.[0] || null
  emit('selectImage', file)
}
</script>

<template>
  <section class="flex flex-col gap-6">
    <div class="flex flex-col items-start gap-1.5">
      <p class="w-fit bg-accent-900 px-3 py-2 font-heading text-sm text-accent-50">
        {{ t.factChecker.start.eyebrow }}
      </p>
      <p class="font-heading text-3xl font-bold leading-snug tracking-tight text-brand-500 lg:text-[40px]">
        {{ t.factChecker.start.headline }}
      </p>
      <p class="font-heading text-lg text-accent-700 sm:text-xl">{{ t.factChecker.start.subtitle }}</p>
    </div>

    <OptionList
      :options="t.factChecker.start.options"
      :model-value="modelValue"
      @update:model-value="$emit('update:modelValue', $event)"
    />

    <div class="flex flex-col gap-4 border-t border-accent-100 pt-6">
      <p class="font-heading text-sm font-semibold text-accent-900">{{ t.factChecker.start.attachmentHeading }}</p>

      <div class="flex flex-col gap-2">
        <label class="font-heading text-sm text-accent-700">{{ t.factChecker.start.linkLabel }}</label>
        <input
          v-model="urlDraft"
          type="text"
          inputmode="url"
          :placeholder="t.factChecker.start.linkPlaceholder"
          class="rounded border border-accent-100 px-4 py-3 font-heading text-sm text-accent-900 focus:border-brand-500 focus:outline-none"
          @input="onUrlInput"
        />
        <div v-if="linkPreview" class="flex items-center gap-3 rounded border border-accent-100 bg-[#f9fafa] px-4 py-3">
          <span class="text-xl leading-none">🔗</span>
          <div class="flex min-w-0 flex-col">
            <p class="truncate font-heading text-sm font-medium text-accent-900">{{ linkPreview.hostname }}</p>
            <p class="truncate font-heading text-xs text-accent-600">{{ linkPreview.href }}</p>
          </div>
        </div>
      </div>

      <div class="flex flex-col gap-2">
        <label class="font-heading text-sm text-accent-700">{{ t.factChecker.start.imageLabel }}</label>
        <label
          class="flex w-fit cursor-pointer items-center gap-2 rounded border border-brand-500 px-4 py-2.5 font-heading text-sm font-medium text-brand-500"
        >
          {{ t.factChecker.start.imageButtonText }}
          <input type="file" accept="image/*" class="hidden" @change="onFileChange" />
        </label>
        <img
          v-if="contentImageUrl"
          :src="contentImageUrl"
          alt=""
          class="h-32 w-32 rounded border border-accent-100 object-cover"
        />
      </div>
    </div>

    <WizardNav :can-back="false" :can-next="!!modelValue" @next="$emit('next')" />
  </section>
</template>
