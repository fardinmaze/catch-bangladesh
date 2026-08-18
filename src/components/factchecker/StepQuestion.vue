<script setup>
import { computed } from 'vue'
import { useLang } from '@/stores/lang'
import OptionList from './OptionList.vue'
import WizardNav from './WizardNav.vue'

const { t } = useLang()

const props = defineProps({
  stepKey: { type: String, required: true },
  modelValue: { type: String, default: null },
})
defineEmits(['update:modelValue', 'next', 'back'])

const content = computed(() => t.value.factChecker.steps[props.stepKey])
</script>

<template>
  <section class="flex flex-col gap-6">
    <div class="flex flex-col items-start gap-1.5">
      <p class="w-fit bg-accent-900 px-3 py-2 font-heading text-sm text-accent-50">{{ content.title }}</p>
      <p class="font-heading text-2xl font-bold leading-snug tracking-tight text-brand-500 sm:text-[32px]">
        {{ content.prompt }}
      </p>
    </div>

    <ul class="flex flex-col gap-1.5 font-heading text-base text-accent-700">
      <li v-for="(q, i) in content.selfQuestions" :key="i">• {{ q }}</li>
    </ul>

    <div class="flex flex-col gap-1">
      <p class="font-heading text-xs font-semibold uppercase tracking-wide text-status-rose-600">
        {{ t.factChecker.redFlagLabel }}
      </p>
      <p class="font-heading text-sm leading-relaxed text-accent-700">{{ content.redFlag }}</p>
    </div>

    <p class="font-heading text-sm leading-relaxed text-status-blue-500">ⓘ {{ content.guidance }}</p>

    <OptionList
      :options="content.options"
      :model-value="modelValue"
      @update:model-value="$emit('update:modelValue', $event)"
    />

    <WizardNav :can-next="!!modelValue" @next="$emit('next')" @back="$emit('back')" />
  </section>
</template>
