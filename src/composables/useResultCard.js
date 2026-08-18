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

export async function downloadResultCard({
  colorHex,
  badge,
  label,
  summaryLine,
  body,
  slogan,
  filename,
  imageUrl,
  linkPreview,
}) {
  if (document.fonts?.ready) await document.fonts.ready

  const width = 1080
  const margin = 60
  const contentWidth = width - margin * 2
  const topBand = 260
  const bottomBand = 140
  const summaryLineHeight = 44
  const bodyLineHeight = 56
  const linkCardHeight = 110
  const imageCardHeight = 380

  let thumbImg = null
  if (imageUrl) {
    try {
      thumbImg = await loadImage(imageUrl)
    } catch {
      thumbImg = null
    }
  }
  const thumbHeight = thumbImg ? imageCardHeight : linkPreview ? linkCardHeight : 0

  const measure = document.createElement('canvas').getContext('2d')
  measure.font = '600 32px "Noto Sans Bengali", sans-serif'
  const summaryLines = wrapLines(measure, summaryLine, contentWidth)
  measure.font = '400 40px "Noto Sans Bengali", sans-serif'
  const bodyLines = wrapLines(measure, body, contentWidth)

  let contentEnd = topBand + 80 + summaryLines.length * summaryLineHeight
  if (thumbHeight) contentEnd += 30 + thumbHeight
  contentEnd += 30 + bodyLines.length * bodyLineHeight

  const height = Math.max(contentEnd + 50 + bottomBand, topBand + bottomBand + 260)

  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')

  ctx.fillStyle = '#ffffff'
  ctx.fillRect(0, 0, width, height)

  ctx.fillStyle = colorHex
  ctx.fillRect(0, 0, width, topBand)
  ctx.fillStyle = '#ffffff'
  ctx.textAlign = 'center'
  ctx.font = '700 100px "Noto Sans Bengali", sans-serif'
  ctx.fillText(badge, width / 2, 150)
  ctx.font = '700 44px "Noto Sans Bengali", sans-serif'
  ctx.fillText(label, width / 2, 220)

  ctx.textAlign = 'left'
  ctx.fillStyle = '#59595a'
  ctx.font = '600 32px "Noto Sans Bengali", sans-serif'
  let cursorY = drawLines(ctx, summaryLines, margin, topBand + 80, summaryLineHeight) + 30

  if (thumbImg) {
    ctx.save()
    ctx.strokeStyle = '#d9d9da'
    drawCoverImage(ctx, thumbImg, margin, cursorY, contentWidth, imageCardHeight)
    ctx.strokeRect(margin, cursorY, contentWidth, imageCardHeight)
    ctx.restore()
    cursorY += imageCardHeight + 30
  } else if (linkPreview) {
    ctx.fillStyle = '#f9fafa'
    ctx.fillRect(margin, cursorY, contentWidth, linkCardHeight)
    ctx.strokeStyle = '#d9d9da'
    ctx.strokeRect(margin, cursorY, contentWidth, linkCardHeight)
    ctx.fillStyle = '#151516'
    ctx.font = '600 32px "Noto Sans Bengali", sans-serif'
    ctx.fillText(`🔗 ${linkPreview.hostname}`, margin + 28, cursorY + 48)
    ctx.fillStyle = '#59595a'
    ctx.font = '400 26px "Noto Sans Bengali", sans-serif'
    ctx.fillText(linkPreview.href, margin + 28, cursorY + 82)
    cursorY += linkCardHeight + 30
  }

  ctx.fillStyle = '#151516'
  ctx.font = '400 40px "Noto Sans Bengali", sans-serif'
  drawLines(ctx, bodyLines, margin, cursorY, bodyLineHeight)

  ctx.fillStyle = '#f40000'
  ctx.fillRect(0, height - bottomBand, width, bottomBand)
  ctx.fillStyle = '#ffffff'
  ctx.textAlign = 'center'
  ctx.font = '700 36px "Noto Sans Bengali", sans-serif'
  const sloganLines = wrapLines(ctx, slogan, contentWidth)
  const sloganStart = height - bottomBand / 2 - ((sloganLines.length - 1) * 44) / 2 - 12
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
