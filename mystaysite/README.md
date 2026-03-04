# MyStaySite.gr - Landing Page

Premium website design service for Greek vacation rental owners. This is the marketing landing page at [mystaysite.gr](https://mystaysite.gr).

## Tech Stack

- **Next.js 16** (App Router)
- **React 19** + TypeScript
- **Tailwind CSS 4**
- Google Fonts: Plus Jakarta Sans, DM Sans, JetBrains Mono

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
├── app/
│   ├── globals.css      # Tailwind config, theme, animations
│   ├── layout.tsx       # Root layout with SEO meta + Schema.org
│   └── page.tsx         # Main page composing all sections
├── components/
│   ├── Navbar.tsx        # Sticky nav with glass effect + mobile hamburger
│   ├── Hero.tsx          # Hero with browser mockup visual
│   ├── PainPoints.tsx    # 3 problem cards
│   ├── Solution.tsx      # 8 feature cards
│   ├── Portfolio.tsx     # 3 browser-frame website mockups
│   ├── Calculator.tsx    # Interactive ROI calculator with sliders
│   ├── HowItWorks.tsx    # 4-step timeline
│   ├── Testimonials.tsx  # Review cards
│   ├── Pricing.tsx       # 3-tier pricing cards
│   ├── BadgeSection.tsx  # "Built by MyStaySite" badge explanation
│   ├── FAQ.tsx           # Accordion FAQ
│   ├── Contact.tsx       # Contact form + direct contact info
│   ├── Footer.tsx        # Site footer
│   └── MobileStickyCTA.tsx  # Fixed bottom bar on mobile
└── lib/
    ├── translations.ts       # Full GR/EN translations
    ├── language-context.tsx   # Language provider + hook
    └── use-animate-on-scroll.ts  # Intersection Observer animation hook
```

## Bilingual Support

Greek is the default language. Toggle via the flag button in the navbar. Selection persists in localStorage.

## Deployment

```bash
npm run build
```

Deploy to Vercel, Netlify, or any Node.js host.
