function wrapLines(ctx, text, maxWidth) {
  const words = text.split(' ')
  const lines = []
  let line = ''
  for (const word of words) {
    const testLine = line ? `${line} ${word}` : word
    if (line && ctx.measureText(testLine).width > maxWidth) {
      lines.push(line)
      line = word
    } else {
      line = testLine
    }
  }
  if (line) lines.push(line)
  return lines
}

function drawLines(ctx, lines, x, y, lineHeight) {
  lines.forEach((line, i) => ctx.fillText(line, x, y + i * lineHeight))
  return y + lines.length * lineHeight
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    // Needed for remote (non-blob) sources — e.g. the link-thumbnail CDN — so the
    // canvas isn't tainted and toBlob() below can still read pixel data.
    if (!src.startsWith('blob:')) img.crossOrigin = 'anonymous'
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
  })
}

function drawCoverImage(ctx, img, x, y, w, h) {
  const scale = Math.max(w / img.width, h / img.height)
  const sw = w / scale
  const sh = h / scale
  const sx = (img.width - sw) / 2
  const sy = (img.height - sh) / 2
  ctx.drawImage(img, sx, sy, sw, sh, x, y, w, h)
}

function roundRectPath(ctx, x, y, w, h, r) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.arcTo(x + w, y, x + w, y + h, r)
  ctx.arcTo(x + w, y + h, x, y + h, r)
  ctx.arcTo(x, y + h, x, y, r)
  ctx.arcTo(x, y, x + w, y, r)
  ctx.closePath()
}

export async function downloadResultCard({
  badge,
  topBg,
  topText,
  pillBg,
  pillText,
  label,
  contentTypeLabel,
  body,
  slogan,
  filename,
  imageUrl,
  linkPreview,
  linkThumbnailUrl,
}) {
  if (document.fonts?.ready) await document.fonts.ready

  const width = 1080
  const margin = 60
  const topStripHeight = 130
  const bottomBarHeight = 140
  const bodyLineHeight = 52

  let thumbImg = null
  const sourceUrl = imageUrl || linkThumbnailUrl
  if (sourceUrl) {
    try {
      thumbImg = await loadImage(sourceUrl)
    } catch {
      thumbImg = null
    }
  }

  const measure = document.createElement('canvas').getContext('2d')
  measure.font = '700 44px "Noto Sans Bengali", sans-serif'
  const bodyLines = wrapLines(measure, body, width - margin * 2)

  const overlayBlockHeight = 60 + bodyLines.length * bodyLineHeight + 40
  const mediaHeight = Math.max(560, overlayBlockHeight + 280)
  const height = topStripHeight + mediaHeight + bottomBarHeight

  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')

  // top status strip — measure both pieces so the badge+label pair centers as a group
  ctx.fillStyle = topBg
  ctx.fillRect(0, 0, width, topStripHeight)
  ctx.fillStyle = topText
  ctx.textAlign = 'left'
  const badgeFont = '700 54px "Noto Sans Bengali", sans-serif'
  const labelFont = '700 44px "Noto Sans Bengali", sans-serif'
  const stripGap = 24
  ctx.font = badgeFont
  const badgeWidth = ctx.measureText(badge).width
  ctx.font = labelFont
  const labelWidth = ctx.measureText(label).width
  let stripX = (width - (badgeWidth + stripGap + labelWidth)) / 2
  ctx.font = badgeFont
  ctx.fillText(badge, stripX, topStripHeight / 2 + 18)
  stripX += badgeWidth + stripGap
  ctx.font = labelFont
  ctx.fillText(label, stripX, topStripHeight / 2 + 16)

  // media area
  const mediaY = topStripHeight
  if (thumbImg) {
    drawCoverImage(ctx, thumbImg, 0, mediaY, width, mediaHeight)
  } else if (linkPreview) {
    ctx.fillStyle = '#f5f5f6'
    ctx.fillRect(0, mediaY, width, mediaHeight)
    const cardW = width - margin * 2
    const cardH = 120
    const cardX = margin
    const cardY = mediaY + (mediaHeight - cardH) / 2
    ctx.fillStyle = '#ffffff'
    ctx.strokeStyle = '#d9d9da'
    roundRectPath(ctx, cardX, cardY, cardW, cardH, 12)
    ctx.fill()
    ctx.stroke()
    ctx.fillStyle = '#151516'
    ctx.textAlign = 'left'
    ctx.font = '600 34px "Noto Sans Bengali", sans-serif'
    ctx.fillText(`🔗 ${linkPreview.hostname}`, cardX + 30, cardY + 52)
    ctx.fillStyle = '#59595a'
    ctx.font = '400 26px "Noto Sans Bengali", sans-serif'
    ctx.fillText(linkPreview.href, cardX + 30, cardY + 88)
  } else {
    ctx.fillStyle = '#f5f5f6'
    ctx.fillRect(0, mediaY, width, mediaHeight)
    ctx.fillStyle = '#59595a'
    ctx.textAlign = 'center'
    ctx.font = '600 34px "Noto Sans Bengali", sans-serif'
    ctx.fillText(contentTypeLabel, width / 2, mediaY + mediaHeight / 2)
  }

  // dark gradient scrim over the lower portion of the media area
  const gradient = ctx.createLinearGradient(0, mediaY + mediaHeight * 0.35, 0, mediaY + mediaHeight)
  gradient.addColorStop(0, 'rgba(0,0,0,0)')
  gradient.addColorStop(1, 'rgba(0,0,0,0.72)')
  ctx.fillStyle = gradient
  ctx.fillRect(0, mediaY, width, mediaHeight)

  // pill + headline overlay, bottom-left of the media area
  ctx.font = '600 30px "Noto Sans Bengali", sans-serif'
  const pillTextWidth = ctx.measureText(contentTypeLabel).width
  const pillPaddingX = 26
  const pillHeight = 52
  const pillY = mediaY + mediaHeight - overlayBlockHeight
  roundRectPath(ctx, margin, pillY, pillTextWidth + pillPaddingX * 2, pillHeight, pillHeight / 2)
  ctx.fillStyle = pillBg
  ctx.fill()
  ctx.fillStyle = pillText
  ctx.textAlign = 'left'
  ctx.fillText(contentTypeLabel, margin + pillPaddingX, pillY + pillHeight / 2 + 10)

  ctx.fillStyle = '#ffffff'
  ctx.font = '700 44px "Noto Sans Bengali", sans-serif'
  drawLines(ctx, bodyLines, margin, pillY + pillHeight + 50, bodyLineHeight)

  // bottom slogan bar
  ctx.fillStyle = '#030303'
  ctx.fillRect(0, height - bottomBarHeight, width, bottomBarHeight)
  ctx.fillStyle = '#f40000'
  ctx.textAlign = 'center'
  ctx.font = '600 36px "Noto Sans Bengali", sans-serif'
  const sloganLines = wrapLines(ctx, slogan, width - margin * 2)
  const sloganStart = height - bottomBarHeight / 2 - ((sloganLines.length - 1) * 44) / 2 + 12
  drawLines(ctx, sloganLines, width / 2, sloganStart, 44)

  const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/png'))
  if (!blob) return
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}
