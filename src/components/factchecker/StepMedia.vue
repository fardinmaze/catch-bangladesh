<script setup>
import { computed } from 'vue'
import { useLang } from '@/stores/lang'
import OptionList from './OptionList.vue'
import WizardNav from './WizardNav.vue'

const { t } = useLang()

const props = defineProps({
  contentType: { type: String, default: null },
  modelValue: { type: String, default: null },
})
defineEmits(['update:modelValue', 'next', 'back'])

const branch = computed(() => (props.contentType === 'video' ? 'video' : 'image'))
const content = computed(() => t.value.factChecker.media)
const branchContent = computed(() => content.value[branch.value])
</script>

<template>
  <section class="flex flex-col gap-6">
    <div class="flex flex-col items-start gap-1.5">
      <p class="w-fit bg-accent-900 px-3 py-2 font-heading text-sm text-accent-50">{{ content.title }}</p>
      <p class="font-heading text-2xl font-bold leading-snug tracking-tight text-brand-500 sm:text-[32px]">
        {{ branchContent.prompt }}
      </p>
    </div>

    <p class="font-heading text-sm leading-relaxed text-status-blue-500">ⓘ {{ branchContent.guidance }}</p>

    <ul v-if="branch === 'video'" class="flex flex-col gap-1.5 font-heading text-base text-accent-700">
      <li v-for="(q, i) in branchContent.selfQuestions" :key="i">• {{ q }}</li>
    </ul>

    <div v-else class="flex flex-col gap-2">
      <div class="flex flex-wrap gap-3">
        <a
          v-for="tool in content.tools"
          :key="tool.label"
          :href="tool.url"
          target="_blank"
          rel="noopener"
          class="rounded-button border border-brand-500 px-4 py-2 font-heading text-sm font-medium text-brand-500"
        >
          {{ tool.label }} →
        </a>
      </div>
      <p class="font-heading text-xs text-accent-600">{{ content.dataNotice }}</p>
    </div>

    <div class="flex flex-col gap-1">
      <p class="font-heading text-xs font-semibold uppercase tracking-wide text-status-rose-600">
        {{ t.factChecker.redFlagLabel }}
      </p>
      <p class="font-heading text-sm leading-relaxed text-accent-700">{{ branchContent.redFlag }}</p>
    </div>

    <OptionList
      :options="content.options"
      :model-value="modelValue"
      @update:model-value="$emit('update:modelValue', $event)"
    />

    <WizardNav :can-next="!!modelValue" @next="$emit('next')" @back="$emit('back')" />
  </section>
</template>
