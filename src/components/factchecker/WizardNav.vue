<script setup>
import { useLang } from '@/stores/lang'

const { t } = useLang()

defineProps({
  canNext: { type: Boolean, default: true },
  canBack: { type: Boolean, default: true },
  nextLabel: { type: String, default: '' },
})
defineEmits(['next', 'back'])
</script>

<template>
  <div class="flex items-center gap-3 pt-2">
    <button
      v-if="canBack"
      type="button"
      class="rounded-button border border-accent-100 px-6 py-3 font-heading text-sm font-medium text-accent-700"
      @click="$emit('back')"
    >
      {{ t.factChecker.nav.back }}
    </button>
    <button
      type="button"
      class="flex-1 rounded-button bg-brand-500 px-6 py-3 text-center font-heading text-sm font-medium text-accent-50 transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
      :disabled="!canNext"
      @click="$emit('next')"
    >
      {{ nextLabel || t.factChecker.nav.next }}
    </button>
  </div>
</template>
