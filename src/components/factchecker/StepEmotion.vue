<script setup>
import { useLang } from '@/stores/lang'
import OptionList from './OptionList.vue'
import WizardNav from './WizardNav.vue'

const { t } = useLang()
defineProps({ modelValue: { type: String, default: null } })
defineEmits(['update:modelValue', 'next', 'back'])
</script>

<template>
  <section class="flex flex-col gap-6">
    <div class="flex flex-col items-start gap-1.5">
      <p class="w-fit bg-accent-900 px-3 py-2 font-heading text-sm text-accent-50">{{ t.factChecker.emotion.title }}</p>
      <p class="font-heading text-2xl font-bold leading-snug tracking-tight text-brand-500 sm:text-[32px]">
        {{ t.factChecker.emotion.prompt }}
      </p>
    </div>

    <p class="font-heading text-lg leading-relaxed text-accent-700">{{ t.factChecker.emotion.body }}</p>

    <OptionList
      :options="t.factChecker.emotion.options"
      :model-value="modelValue"
      @update:model-value="$emit('update:modelValue', $event)"
    />

    <WizardNav :can-next="!!modelValue" @next="$emit('next')" @back="$emit('back')" />
  </section>
</template>
