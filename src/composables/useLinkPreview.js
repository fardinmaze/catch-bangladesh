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
