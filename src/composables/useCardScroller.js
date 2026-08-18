import { ref } from 'vue'

export function useCardScroller() {
  const trackEl = ref(null)
  const canScrollPrev = ref(false)
  const canScrollNext = ref(false)

  function updateScrollState() {
    const el = trackEl.value
    if (!el) return
    canScrollPrev.value = el.scrollLeft > 4
    canScrollNext.value = el.scrollLeft < el.scrollWidth - el.clientWidth - 4
  }

  function scrollByCard(direction) {
    const el = trackEl.value
    if (!el) return
    const card = el.querySelector('[data-card]')
    const gap = parseFloat(getComputedStyle(el).columnGap || '0')
    const amount = card ? card.getBoundingClientRect().width + gap : el.clientWidth * 0.9
    el.scrollBy({ left: direction * amount, behavior: 'smooth' })
  }

  return { trackEl, canScrollPrev, canScrollNext, updateScrollState, scrollByCard }
}
