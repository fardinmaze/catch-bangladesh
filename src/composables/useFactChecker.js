import { reactive, computed, ref } from 'vue'

const ALL_STEPS = ['start', 'emotion', 'source', 'crossCheck', 'context', 'media', 'manipulation', 'harmGate', 'recap', 'result']
const TEXT_ONLY_STEPS = ALL_STEPS.filter((step) => step !== 'media' && step !== 'manipulation')

function emptySession() {
  return {
    content_type: null,
    content_url: null,
    content_image_url: null,
    content_image_name: null,
    emotion: null,
    source_status: null,
    cross_check_status: null,
    context_status: null,
    media_status: null,
    manipulation_status: null,
    harm_flags: [],
  }
}

export function useFactChecker() {
  const session = reactive(emptySession())
  const stepIndex = ref(0)

  const isTextOnly = computed(() => session.content_type === 'post' || session.content_type === 'message')
  const stepList = computed(() => (isTextOnly.value ? TEXT_ONLY_STEPS : ALL_STEPS))
  const currentStep = computed(() => stepList.value[stepIndex.value])

  const verdict = computed(() => {
    if (session.harm_flags.length > 0) return 'misleading_harmful'

    const hasFalseEvidence =
      session.source_status === 'not_found' ||
      session.cross_check_status === 'single_source_only' ||
      session.context_status === 'unclear_or_missing' ||
      session.media_status === 'verified_suspicious' ||
      session.manipulation_status === 'ai_deepfake_signs' ||
      session.manipulation_status === 'edited_signs'
    if (hasFalseEvidence) return 'misleading_harmful'

    const isUncertain = [
      session.source_status,
      session.cross_check_status,
      session.context_status,
      session.media_status,
      session.manipulation_status,
    ].includes('unsure')
    if (isUncertain) return 'needs_verification'

    return 'verified'
  })

  function goNext() {
    if (currentStep.value === 'context' && isTextOnly.value) {
      session.media_status = 'n/a'
      session.manipulation_status = 'n/a'
    }
    if (stepIndex.value < stepList.value.length - 1) stepIndex.value += 1
  }

  function goBack() {
    if (stepIndex.value > 0) stepIndex.value -= 1
  }

  function setContentImage(file) {
    if (session.content_image_url) URL.revokeObjectURL(session.content_image_url)
    if (!file) {
      session.content_image_url = null
      session.content_image_name = null
      return
    }
    session.content_image_url = URL.createObjectURL(file)
    session.content_image_name = file.name
  }

  function reset() {
    if (session.content_image_url) URL.revokeObjectURL(session.content_image_url)
    Object.assign(session, emptySession())
    stepIndex.value = 0
  }

  return { session, stepIndex, stepList, currentStep, isTextOnly, verdict, goNext, goBack, setContentImage, reset }
}
