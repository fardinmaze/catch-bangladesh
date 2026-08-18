<script setup>
import { computed } from 'vue'
import { useLang } from '@/stores/lang'
import { useFactChecker } from '@/composables/useFactChecker'
import { toStepNumeral } from '@/composables/useBanglaNumerals'
import StepStart from '@/components/factchecker/StepStart.vue'
import StepEmotion from '@/components/factchecker/StepEmotion.vue'
import StepQuestion from '@/components/factchecker/StepQuestion.vue'
import StepMedia from '@/components/factchecker/StepMedia.vue'
import StepManipulation from '@/components/factchecker/StepManipulation.vue'
import StepHarmGate from '@/components/factchecker/StepHarmGate.vue'
import StepRecap from '@/components/factchecker/StepRecap.vue'
import StepResult from '@/components/factchecker/StepResult.vue'

const { t, isBn } = useLang()
const { session, stepIndex, stepList, currentStep, isTextOnly, verdict, goNext, goBack, setContentImage, reset } =
  useFactChecker()

const totalSteps = computed(() => stepList.value.length - 1)
const progressLabel = computed(() => {
  const current = Math.min(stepIndex.value + 1, totalSteps.value)
  return `${t.value.factChecker.progress.stepLabel} ${toStepNumeral(current, isBn.value)}/${toStepNumeral(totalSteps.value, isBn.value)}`
})
</script>

<template>
  <main class="mx-auto flex w-full max-w-2xl flex-col gap-8 px-6 py-14 sm:px-[42px]">
    <div v-if="currentStep !== 'result'" class="flex flex-col gap-1.5">
      <p class="font-heading text-xs font-medium text-accent-600">{{ progressLabel }}</p>
      <div class="h-1.5 w-full overflow-hidden rounded-full bg-accent-50">
        <div
          class="h-full rounded-full bg-brand-500 transition-all duration-300"
          :style="{ width: `${((stepIndex + 1) / stepList.length) * 100}%` }"
        />
      </div>
    </div>

    <StepStart
      v-if="currentStep === 'start'"
      v-model="session.content_type"
      :content-url="session.content_url"
      :content-image-url="session.content_image_url"
      @update:content-url="session.content_url = $event"
      @select-image="setContentImage"
      @next="goNext"
    />

    <StepEmotion v-else-if="currentStep === 'emotion'" v-model="session.emotion" @next="goNext" @back="goBack" />

    <StepQuestion
      v-else-if="currentStep === 'source'"
      step-key="source"
      v-model="session.source_status"
      @next="goNext"
      @back="goBack"
    />

    <StepQuestion
      v-else-if="currentStep === 'crossCheck'"
      step-key="crossCheck"
      v-model="session.cross_check_status"
      @next="goNext"
      @back="goBack"
    />

    <StepQuestion
      v-else-if="currentStep === 'context'"
      step-key="context"
      v-model="session.context_status"
      @next="goNext"
      @back="goBack"
    />

    <StepMedia
      v-else-if="currentStep === 'media'"
      :content-type="session.content_type"
      v-model="session.media_status"
      @next="goNext"
      @back="goBack"
    />

    <StepManipulation
      v-else-if="currentStep === 'manipulation'"
      v-model="session.manipulation_status"
      @next="goNext"
      @back="goBack"
    />

    <StepHarmGate
      v-else-if="currentStep === 'harmGate'"
      v-model="session.harm_flags"
      @next="goNext"
      @back="goBack"
    />

    <StepRecap
      v-else-if="currentStep === 'recap'"
      :session="session"
      :is-text-only="isTextOnly"
      @next="goNext"
      @back="goBack"
    />

    <StepResult v-else-if="currentStep === 'result'" :verdict="verdict" :session="session" @restart="reset" />
  </main>
</template>
