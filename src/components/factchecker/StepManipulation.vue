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
      <p class="w-fit bg-accent-900 px-3 py-2 font-heading text-sm text-accent-50">
        {{ t.factChecker.manipulation.title }}
      </p>
      <p class="font-heading text-2xl font-bold leading-snug tracking-tight text-brand-500 sm:text-[32px]">
        {{ t.factChecker.manipulation.prompt }}
      </p>
    </div>

    <div class="overflow-x-auto rounded border border-accent-100">
      <table class="w-full min-w-[520px] border-collapse font-heading text-sm">
        <thead>
          <tr class="bg-accent-50">
            <th
              v-for="(h, i) in t.factChecker.manipulation.comparison.headers"
              :key="i"
              class="border-b border-accent-100 px-3 py-2 text-left font-semibold text-accent-900"
            >
              {{ h }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, i) in t.factChecker.manipulation.comparison.rows" :key="i">
            <td class="border-b border-accent-100 px-3 py-2 align-top font-medium text-accent-900">{{ row.label }}</td>
            <td class="border-b border-accent-100 px-3 py-2 align-top text-accent-700">{{ row.ai }}</td>
            <td class="border-b border-accent-100 px-3 py-2 align-top text-accent-700">{{ row.edited }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <p class="font-heading text-sm leading-relaxed text-status-blue-500">ⓘ {{ t.factChecker.manipulation.note }}</p>

    <OptionList
      :options="t.factChecker.manipulation.options"
      :model-value="modelValue"
      @update:model-value="$emit('update:modelValue', $event)"
    />

    <WizardNav :can-next="!!modelValue" @next="$emit('next')" @back="$emit('back')" />
  </section>
</template>
