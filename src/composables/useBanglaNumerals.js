const BN_DIGITS = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯']

export function toStepNumeral(n, isBn) {
  if (!isBn) return String(n)
  return String(n)
    .split('')
    .map((d) => BN_DIGITS[Number(d)] ?? d)
    .join('')
}
