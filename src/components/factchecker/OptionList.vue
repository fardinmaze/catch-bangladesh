<script setup>
defineProps({
  options: { type: Array, required: true },
  modelValue: { type: String, default: null },
})
defineEmits(['update:modelValue'])
</script>

<template>
  <div class="flex flex-col gap-3">
    <button
      v-for="opt in options"
      :key="opt.value"
      type="button"
      class="rounded border px-4 py-3.5 text-left font-heading text-base transition-colors"
      :class="
        modelValue === opt.value
          ? 'border-brand-500 bg-brand-50/50 font-semibold text-brand-500'
          : 'border-accent-100 text-accent-700'
      "
      @click="$emit('update:modelValue', opt.value)"
    >
      {{ opt.label }}
    </button>
  </div>
</template>
