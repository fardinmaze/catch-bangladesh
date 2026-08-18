<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useLang } from '@/stores/lang'
import WizardNav from './WizardNav.vue'

const { t } = useLang()

const props = defineProps({ modelValue: { type: Array, required: true } })
const emit = defineEmits(['update:modelValue', 'next', 'back'])

function toggle(key) {
  const next = props.modelValue.includes(key)
    ? props.modelValue.filter((k) => k !== key)
    : [...props.modelValue, key]
  emit('update:modelValue', next)
}

const hasHarmFlag = computed(() => props.modelValue.length > 0)
</script>

<template>
  <section class="flex flex-col gap-6">
    <div class="flex flex-col items-start gap-1.5">
      <p class="w-fit bg-accent-900 px-3 py-2 font-heading text-sm text-accent-50">
        {{ t.factChecker.harmGate.title }}
      </p>
      <p class="font-heading text-2xl font-bold leading-snug tracking-tight text-brand-500 sm:text-[32px]">
        {{ t.factChecker.harmGate.prompt }}
      </p>
      <p class="font-heading text-lg text-accent-700">{{ t.factChecker.harmGate.intro }}</p>
    </div>

    <div class="flex flex-col gap-3">
      <button
        v-for="q in t.factChecker.harmGate.questions"
        :key="q.key"
        type="button"
        class="flex items-start gap-3 rounded border px-4 py-3.5 text-left font-heading text-base transition-colors"
        :class="
          modelValue.includes(q.key)
            ? 'border-brand-500 bg-brand-50/50 font-semibold text-brand-500'
            : 'border-accent-100 text-accent-700'
        "
        @click="toggle(q.key)"
      >
        <span
          class="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded border text-xs"
          :class="modelValue.includes(q.key) ? 'border-brand-500 bg-brand-500 text-accent-50' : 'border-accent-100'"
        >
          <span v-if="modelValue.includes(q.key)">✓</span>
        </span>
        {{ q.label }}
      </button>
    </div>

    <p class="font-heading text-base font-semibold text-accent-900">{{ t.factChecker.harmGate.closing }}</p>

    <div v-if="hasHarmFlag" class="flex flex-wrap items-center gap-2 rounded border border-accent-100 bg-[#f9fafa] px-4 py-3">
      <span class="font-heading text-sm text-accent-700">{{ t.factChecker.harmGate.helpLine }}</span>
      <RouterLink to="/help" class="font-heading text-sm font-semibold text-brand-500">
        {{ t.factChecker.harmGate.helpCta }}
      </RouterLink>
    </div>

    <WizardNav @next="$emit('next')" @back="$emit('back')" />
  </section>
</template>
