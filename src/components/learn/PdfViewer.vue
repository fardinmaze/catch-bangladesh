<script setup>
// In-page PDF viewer built on pdf.js, so module PDFs show up on every browser and phone — the browser's own
// <object>/<embed> PDF viewer is missing on mobile and is switched off when a browser is set to download PDFs.
// pdf.js (~1 MB) is imported lazily, so it is only fetched when a module page is opened.
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { useLang } from '@/stores/lang'

const props = defineProps({
  src: { type: String, required: true },
  maxWidth: { type: Number, default: 960 },
})

const { t } = useLang()

const PAD = 16 // must match the px-4 on the pages wrapper below

const scrollEl = ref(null)
const status = ref('loading') // 'loading' | 'ready' | 'error'
const progress = ref(0) // 0..1 while the file downloads
const pages = ref([]) // [{ n, scale, width, height }]

const percent = computed(() => Math.round(progress.value * 100))
const fileName = computed(() => props.src.split('/').pop())

const canvasEls = new Map()
const pageProxies = new Map()
const rendered = new Set()
const activeTasks = new Set()

let pdfjs = null
let loadingTask = null
let pdfDoc = null
let observer = null
let resizeObserver = null
let resizeTimer = null
let layoutWidth = 0
let generation = 0 // bumped on every re-layout so stale renders are dropped
let renderChain = Promise.resolve() // pages render one at a time: big photos are heavy on phones
let destroyed = false

function setCanvas(n, el) {
  if (el) canvasEls.set(n, el)
  else canvasEls.delete(n)
}

async function layout() {
  const width = scrollEl.value?.clientWidth || 640
  layoutWidth = width
  const avail = Math.max(240, Math.min(props.maxWidth, width - PAD * 2))
  const list = []
  for (let n = 1; n <= pdfDoc.numPages; n++) {
    let page = pageProxies.get(n)
    if (!page) {
      page = await pdfDoc.getPage(n)
      pageProxies.set(n, page)
    }
    const base = page.getViewport({ scale: 1 })
    const scale = avail / base.width
    list.push({ n, scale, width: Math.round(base.width * scale), height: Math.round(base.height * scale) })
  }
  pages.value = list
}

async function renderPage(n, gen) {
  if (destroyed || gen !== generation) return
  const canvas = canvasEls.get(n)
  const info = pages.value.find((p) => p.n === n)
  const page = pageProxies.get(n)
  if (!canvas || !info || !page) return

  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  const viewport = page.getViewport({ scale: info.scale * dpr })
  canvas.width = Math.floor(viewport.width)
  canvas.height = Math.floor(viewport.height)

  const task = page.render({ canvasContext: canvas.getContext('2d'), viewport, canvas })
  activeTasks.add(task)
  try {
    await task.promise
  } catch (e) {
    // a cancelled render (window resized, page left) is expected; anything else is worth a log
    if (e?.name !== 'RenderingCancelledException') console.error('[PdfViewer] page', n, e)
  } finally {
    activeTasks.delete(task)
  }
}

function queueRender(n) {
  if (rendered.has(n)) return
  rendered.add(n)
  const gen = generation
  renderChain = renderChain.then(() => renderPage(n, gen))
}

function observe() {
  observer?.disconnect()
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) if (entry.isIntersecting) queueRender(Number(entry.target.dataset.page))
    },
    { root: scrollEl.value, rootMargin: '800px 0px' },
  )
  scrollEl.value.querySelectorAll('[data-page]').forEach((el) => observer.observe(el))
}

async function relayout() {
  generation += 1
  activeTasks.forEach((task) => task.cancel())
  activeTasks.clear()
  rendered.clear()
  await layout()
  await nextTick()
  observe()
}

function watchSize() {
  resizeObserver = new ResizeObserver(() => {
    if (Math.abs((scrollEl.value?.clientWidth || 0) - layoutWidth) < 8) return
    clearTimeout(resizeTimer)
    resizeTimer = setTimeout(relayout, 200)
  })
  resizeObserver.observe(scrollEl.value)
}

async function load() {
  try {
    const [lib, worker] = await Promise.all([
      import('pdfjs-dist/legacy/build/pdf.mjs'), // legacy build: also runs on older Android WebViews
      import('pdfjs-dist/legacy/build/pdf.worker.min.mjs?url'),
    ])
    if (destroyed) return
    pdfjs = lib
    pdfjs.GlobalWorkerOptions.workerSrc = worker.default

    loadingTask = pdfjs.getDocument({ url: props.src })
    loadingTask.onProgress = ({ loaded, total }) => {
      if (total) progress.value = Math.min(loaded / total, 1)
    }
    pdfDoc = await loadingTask.promise
    if (destroyed) return

    await layout()
    status.value = 'ready'
    await nextTick()
    observe()
    watchSize()
  } catch (e) {
    if (destroyed) return
    console.error('[PdfViewer]', e)
    status.value = 'error'
  }
}

onMounted(load)

onBeforeUnmount(() => {
  destroyed = true
  clearTimeout(resizeTimer)
  observer?.disconnect()
  resizeObserver?.disconnect()
  activeTasks.forEach((task) => task.cancel())
  loadingTask?.destroy()
  pageProxies.clear()
})
</script>

<template>
  <div ref="scrollEl" class="relative overflow-y-auto bg-accent-50" tabindex="0" :aria-label="t.moduleDetail.viewerLabel">
    <div
      v-if="status === 'loading'"
      role="status"
      class="flex h-full min-h-[240px] flex-col items-center justify-center gap-4 p-6 text-center"
    >
      <p class="font-heading text-base text-accent-700">
        {{ t.moduleDetail.viewerLoading }}<span v-if="percent > 0"> {{ percent }}%</span>
      </p>
      <div class="h-1.5 w-56 max-w-full overflow-hidden rounded-full bg-accent-100">
        <div class="h-full rounded-full bg-brand-500 transition-all duration-200" :style="{ width: `${percent}%` }" />
      </div>
    </div>

    <div
      v-else-if="status === 'error'"
      role="alert"
      class="flex h-full min-h-[240px] flex-col items-center justify-center gap-4 p-6 text-center"
    >
      <p class="font-heading text-lg font-semibold text-accent-900">{{ t.moduleDetail.viewerError }}</p>
      <p class="max-w-md font-heading text-sm leading-relaxed text-accent-700">{{ t.moduleDetail.viewerErrorHint }}</p>
      <div class="flex flex-wrap items-center justify-center gap-3">
        <a
          :href="src"
          :download="fileName"
          class="rounded-button bg-brand-500 px-6 py-3 font-heading text-xs font-medium text-white"
        >
          {{ t.moduleDetail.download }}
        </a>
        <a
          :href="src"
          target="_blank"
          rel="noopener"
          class="rounded-button border border-brand-500 px-6 py-3 font-heading text-xs font-medium text-brand-500"
        >
          {{ t.moduleDetail.openOriginal }}
        </a>
      </div>
    </div>

    <div v-else class="flex flex-col items-center gap-4 px-4 py-4">
      <div v-for="p in pages" :key="p.n" :data-page="p.n" class="bg-white shadow-md" :style="{ width: `${p.width}px`, height: `${p.height}px` }">
        <canvas
          :ref="(el) => setCanvas(p.n, el)"
          role="img"
          :aria-label="`${t.moduleDetail.pageLabel} ${p.n}`"
          class="block h-full w-full"
        />
      </div>
    </div>
  </div>
</template>
