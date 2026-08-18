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

function extractYouTubeId(href) {
  try {
    const url = new URL(href)
    const host = url.hostname.replace(/^www\.|^m\./, '')
    if (host === 'youtu.be') return url.pathname.slice(1).split('/')[0] || null
    if (host === 'youtube.com') {
      if (url.pathname === '/watch') return url.searchParams.get('v')
      const match = url.pathname.match(/^\/(shorts|embed|live)\/([^/]+)/)
      if (match) return match[2]
    }
    return null
  } catch {
    return null
  }
}

const thumbnailCache = new Map()

// Best-effort visual thumbnail for a submitted URL. YouTube is handled directly via
// its public thumbnail CDN — Microlink's free tier gets blocked by YouTube's antibot
// protection (EPROXYNEEDED), and this path also avoids sending the URL to a third
// party for what is likely the most common video source submitted. Everything else
// goes through Microlink's preview API.
// Resolves to null (never rejects) if no thumbnail can be found — callers should
// fall back to a text-only link card in that case.
export function fetchLinkThumbnail(href) {
  if (!href) return Promise.resolve(null)
  if (thumbnailCache.has(href)) return thumbnailCache.get(href)

  const youTubeId = extractYouTubeId(href)
  if (youTubeId) {
    const promise = Promise.resolve(`https://i.ytimg.com/vi/${youTubeId}/hqdefault.jpg`)
    thumbnailCache.set(href, promise)
    return promise
  }

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
