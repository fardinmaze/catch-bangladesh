export function parseUrl(raw) {
  if (!raw) return null
  const value = raw.trim()
  if (!value) return null

  for (const candidate of [value, `https://${value}`]) {
    try {
      const url = new URL(candidate)
      if (url.hostname.includes('.')) return { href: url.href, hostname: url.hostname }
    } catch {
      // try the next candidate
    }
  }
  return null
}

const thumbnailCache = new Map()

// Best-effort visual thumbnail for a submitted URL, via Microlink's free preview API.
// Resolves to null (never rejects) if the service is unreachable or has no image —
// callers should fall back to a text-only link card in that case.
export function fetchLinkThumbnail(href) {
  if (!href) return Promise.resolve(null)
  if (thumbnailCache.has(href)) return thumbnailCache.get(href)

  const promise = (async () => {
    try {
      const res = await fetch(`https://api.microlink.io/?url=${encodeURIComponent(href)}`)
      if (!res.ok) return null
      const json = await res.json()
      return json?.data?.image?.url || json?.data?.logo?.url || null
    } catch {
      return null
    }
  })()

  thumbnailCache.set(href, promise)
  return promise
}
