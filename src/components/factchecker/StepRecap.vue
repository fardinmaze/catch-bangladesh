<script setup>
import { computed } from 'vue'
import { useLang } from '@/stores/lang'
import WizardNav from './WizardNav.vue'

const { t } = useLang()

const props = defineProps({
  session: { type: Object, required: true },
  isTextOnly: { type: Boolean, required: true },
})
defineEmits(['next', 'back'])

const items = computed(() => {
  const labels = t.value.factChecker.recap.items
  const list = [
    { label: labels.source, checked: props.session.source_status === 'found' },
    { label: labels.crossCheck, checked: props.session.cross_check_status === 'found_elsewhere' },
    { label: labels.context, checked: props.session.context_status === 'clear' },
  ]
  if (!props.isTextOnly) {
    list.push({ label: labels.media, checked: props.session.media_status === 'verified_authentic' })
  }
  list.push({ label: labels.harm, checked: props.session.harm_flags.length === 0 })
  return list
})
</script>

<template>
  <section class="flex flex-col gap-6">
    <p class="font-heading text-3xl font-bold leading-snug tracking-tight text-brand-500 lg:text-[40px]">
      {{ t.factChecker.recap.title }}
    </p>

    <ul class="flex flex-col gap-3">
      <li
        v-for="(item, i) in items"
        :key="i"
        class="flex items-center gap-3 rounded border border-accent-100 px-4 py-3 font-heading text-base"
        :class="item.checked ? 'text-accent-900' : 'text-accent-600'"
      >
        <span class="text-xl leading-none" :class="item.checked ? 'text-status-green-600' : 'text-accent-600'">
          {{ item.checked ? '☑' : '☐' }}
        </span>
        {{ item.label }}
      </li>
    </ul>

    <p class="font-heading text-base font-semibold text-accent-900">{{ t.factChecker.recap.closing }}</p>

    <WizardNav :next-label="t.factChecker.recap.cta" @next="$emit('next')" @back="$emit('back')" />
  </section>
</template>
