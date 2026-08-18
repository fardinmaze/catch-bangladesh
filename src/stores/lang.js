import { reactive, computed } from 'vue'
import { bn, en } from '@/i18n/content'

const state = reactive({ lang: 'bn' })

export function useLang() {
  const isBn = computed(() => state.lang === 'bn')
  const t = computed(() => (isBn.value ? bn : en))

  function setLang(lang) {
    state.lang = lang
  }

  function toggle() {
    state.lang = state.lang === 'bn' ? 'en' : 'bn'
  }

  return { state, isBn, t, setLang, toggle }
}
