// Source of truth for the 9 curriculum modules — used by the homepage preview,
// the /learn grid, and each module's detail page. PDFs live in public/learning-materials/.

export const MODULES = [
  {
    slug: 'introduction-to-information-disorder',
    number: 1,
    pdf: '/learning-materials/module-1-introduction-to-information-disorder.pdf',
    title: { bn: 'তথ্য বিভ্রান্তির পরিচিতি', en: 'Introduction to Information Disorder' },
    subtitle: {
      bn: '"তথ্য বিভ্রান্তি" আসলে কী, কেন এটি গুরুত্বপূর্ণ, এবং কীভাবে এটি ব্যক্তি, সমাজ ও কমিউনিটিকে প্রভাবিত করে — তার একটি ভিত্তিগত পরিচিতি।',
      en: 'What "information disorder" actually is, why it matters, and how it affects individuals, communities, and society — a foundational introduction.',
    },
  },
  {
    slug: 'misinformation',
    number: 2,
    pdf: '/learning-materials/module-2-misinformation.pdf',
    title: { bn: 'মিসইনফরমেশন', en: 'Misinformation' },
    subtitle: {
      bn: 'মিসইনফরমেশন কী, এটি কীভাবে ও কেন ছড়ায়, এবং একজন সচেতন নাগরিক হিসেবে কীভাবে তা শনাক্ত ও এড়িয়ে চলা যায়।',
      en: 'What misinformation is, how and why it spreads, and how an aware citizen can recognize and avoid sharing it.',
    },
  },
  {
    slug: 'disinformation',
    number: 3,
    pdf: '/learning-materials/module-3-disinformation.pdf',
    title: { bn: 'ডিসইনফরমেশন', en: 'Disinformation' },
    subtitle: {
      bn: 'পরিকল্পিতভাবে তৈরি ও ছড়ানো ভুয়া তথ্য — উদ্দেশ্যই থাকে বিভ্রান্ত করা। কীভাবে চিনবেন এবং কীভাবে সাড়া দেবেন।',
      en: 'False information created and spread deliberately, with the intent to deceive — how to recognize it and how to respond.',
    },
  },
  {
    slug: 'malinformation',
    number: 4,
    pdf: '/learning-materials/module-4-malinformation.pdf',
    title: { bn: 'ম্যালইনফরমেশন', en: 'Malinformation' },
    subtitle: {
      bn: 'সত্য তথ্য, কিন্তু ক্ষতিকর উদ্দেশ্যে শেয়ার করা হয় — প্রসঙ্গ থেকে বিচ্ছিন্ন করে বা কারও ব্যক্তিগত তথ্য ফাঁস করে।',
      en: "True information shared with harmful intent — stripped of context or used to expose someone's private details.",
    },
  },
  {
    slug: 'deep-fake',
    number: 5,
    pdf: '/learning-materials/module-5-deep-fake.pdf',
    title: { bn: 'ডিপ ফেক', en: 'Deep Fake' },
    subtitle: {
      bn: 'এআই দিয়ে তৈরি ভুয়া ছবি বা ভিডিও, যা দেখতে হুবহু আসলের মতো মনে হয় — শনাক্ত করার লক্ষণ ও সীমাবদ্ধতা।',
      en: 'AI-generated fake images or video designed to look exactly like the real thing — the tells, and their limits.',
    },
  },
  {
    slug: 'cheap-fake',
    number: 6,
    pdf: '/learning-materials/module-6-cheap-fake.pdf',
    title: { bn: 'চিপ ফেক', en: 'Cheap Fake' },
    subtitle: {
      bn: 'সাধারণ সম্পাদনা বা ভুল প্রসঙ্গে ব্যবহার করে তৈরি বিভ্রান্তিকর কনটেন্ট — কোনো এআই ছাড়াই।',
      en: 'Misleading content made with simple editing or out-of-context reuse — no AI required.',
    },
  },
  {
    slug: 'clickbait',
    number: 7,
    pdf: '/learning-materials/module-7-clickbait.pdf',
    title: { bn: 'ক্লিকবেইট', en: 'Clickbait' },
    subtitle: {
      bn: 'অতিরঞ্জিত বা উত্তেজক শিরোনাম দিয়ে ক্লিক করানোর ফাঁদ — ভেতরের তথ্য প্রায়ই শিরোনামের সঙ্গে মেলে না।',
      en: "Exaggerated or sensational headlines designed to get clicks — the content inside often doesn't match the headline.",
    },
  },
  {
    slug: 'pre-bunking-and-debunking',
    number: 8,
    pdf: '/learning-materials/module-8-pre-bunking-and-debunking.pdf',
    title: { bn: 'প্রি-বাংকিং ও ডি-বাংকিং', en: 'Pre-bunking & Debunking' },
    subtitle: {
      bn: 'ভুল তথ্য ছড়ানোর আগেই সচেতন করা (প্রি-বাংকিং) বনাম ছড়িয়ে পড়ার পর দায়িত্বশীলভাবে সংশোধন করা (ডি-বাংকিং) — কখন কোনটি বেশি কার্যকর।',
      en: 'Building awareness before misinformation spreads (pre-bunking) versus responsibly correcting it afterward (debunking) — when each works best.',
    },
  },
  {
    slug: 'tools-and-techniques-to-verify',
    number: 9,
    pdf: '/learning-materials/module-9-tools-and-techniques-to-verify.pdf',
    title: { bn: 'তথ্য যাচাইয়ের টুল ও কৌশল', en: 'Tools & Techniques to Verify Information' },
    subtitle: {
      bn: 'ছবি, ভিডিও ও লেখার সত্যতা যাচাইয়ের সহজ ও ব্যবহারযোগ্য টুল — এবং নিজে থেকেই যাচাই করার অভ্যাস গড়ে তোলার উপায়।',
      en: 'Simple, usable tools for verifying photos, video, and written claims — and how to build the habit of checking things yourself.',
    },
  },
]

export function getModuleBySlug(slug) {
  return MODULES.find((m) => m.slug === slug)
}
