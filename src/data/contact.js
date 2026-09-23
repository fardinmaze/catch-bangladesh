// Machine-readable contact targets for the footer, /contact and /help.
// Digits are always Latin here — mailto: and wa.me can't take Bangla numerals.
// The visible, localised text (with Bangla numerals in BN) stays in i18n/content.js under `footer`.
//
// The office phone is deliberately NOT here: it is a series of lines (55044851-57), not one number to dial.

export const CONTACT_HREF = {
  email: 'mailto:aab.mail@actionaid.org',
  // WhatsApp number: wa.me opens a chat (and the call button inside it) rather than a carrier call.
  whatsapp: 'https://wa.me/8801631654306',
  // Bangladesh's national emergency services line — used by the footer's "Emergency Call" link.
  emergency: 'tel:999',
  // ActionAid Bangladesh's own official site (not this platform) — footer "About ActionAid" redirects here.
  actionAidOfficial: 'https://actionaidbd.org/',
}
