import { reactive, computed } from 'vue'

const state = reactive({ lang: 'bn' })

export function useLang() {
  const isBn = computed(() => state.lang === 'bn')

  function setLang(lang) {
    state.lang = lang
  }

  function toggle() {
    state.lang = state.lang === 'bn' ? 'en' : 'bn'
  }

  return { state, isBn, setLang, toggle }
}
