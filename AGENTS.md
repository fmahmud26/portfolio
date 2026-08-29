# AI Agent Context — Firoz Mahmud Portfolio

> **Read this file first** before editing this repository.  
> Works for **Cursor**, **Claude Code**, and other coding agents.

---

## 1. Project Summary

| Field | Value |
|-------|-------|
| **Owner** | Firoz Mahmud |
| **Project** | Personal technical portfolio (single-page site) |
| **Repo path** | `/home/bs01631/Firoz_Mahmud/portfolio` |
| **Resume source** | `/home/bs01631/Firoz_Mahmud/my-resume/ai-forward-deployed-engineer/Firoz_Mahmud_Resume.tex` |
| **Dev URL** | `http://localhost:5173` (Vite may use 5174 if 5173 is busy) |
| **Primary role (display)** | Senior Software Engineer |
| **Target roles (availability)** | Forward Deployed AI, backend & cloud — user is open to switching, NOT currently titled FDE |

**Do NOT invent** companies, dates, certifications, metrics, or projects. All factual content lives in `src/data/content.ts` and should match the resume.

---

## 2. Commands

```bash
npm install          # install deps
npm run dev          # Vite dev server → localhost:5173
npm run build        # tsc + production build → dist/
npm run build:watch  # rebuild dist/ on file changes (keep running alongside dev)
npm run preview      # preview production build
npm run lint         # oxlint
```

**Keep `dist/` current:** after source changes, run `npm run build` (or leave `npm run build:watch` running in a second terminal).

**Do not commit** unless the user explicitly asks.

---

## 3. Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | React 19 + Vite 8 + TypeScript |
| Styling | Tailwind CSS v4 (`@import 'tailwindcss'` in `src/index.css`) |
| Design tokens | CSS variables in `:root` / `.dark` + `@theme` + `.btn*` glass button system |
| Font | **Inter only** (Google Fonts in `index.html`) |
| UI animation | Framer Motion |
| Scroll animation | GSAP + ScrollTrigger (`src/hooks/useGsapScroll.ts`) |
| Smooth scroll | Lenis (`src/components/layout/SmoothScroll.tsx`, exposed as `window.__lenis`) |
| 3D hero | Three.js + R3F + Drei (`src/components/three/GalaxyBackground.tsx`, hero overlays in `HeroScene.tsx`) |
| Icons | Lucide React (+ custom brand SVGs in `BrandIcons.tsx` for GitHub/LinkedIn) |
| Routing | React Router (`src/App.tsx` — single route `/`) |
| Lint | oxlint |

---

## 4. Directory Map

```
portfolio/
├── public/
│   ├── img/myself.jpeg      # Profile photo (also copied from /img at repo root)
│   ├── favicon.svg
│   └── icons.svg
├── img/myself.jpeg          # User's original photo upload location
├── src/
│   ├── App.tsx
│   ├── main.tsx
│   ├── index.css            # Design system, theme tokens, glass button CSS
│   ├── data/content.ts      # ★ ALL resume/portfolio content (single source of truth)
│   ├── context/ThemeContext.tsx
│   ├── hooks/
│   │   ├── useActiveSection.ts   # Navbar/footer scroll-spy (Lenis-aware)
│   │   ├── useGsapScroll.ts      # GSAP reveal/stagger (respects reduced motion)
│   │   └── useReducedMotion.ts
│   ├── pages/HomePage.tsx
│   ├── sections/            # Hero, About, Skills, Experience, Certifications, Education, Contact (+ Projects.tsx unused)
│   ├── components/
│   │   ├── layout/          # Navbar, Footer, Container, SmoothScroll
│   │   ├── three/           # HeroScene (distant 3D galaxy, hero only)
│   │   └── ui/              # Reusable UI primitives (see below)
│   └── assets/
├── index.html               # Theme flash prevention script, meta, title
├── AGENTS.md                # ← This file (AI context)
├── CLAUDE.md                # Pointer for Claude Code
└── README.md                # Human quick start
```

### Key UI components

| File | Purpose |
|------|---------|
| `Button.tsx` | **Primary button/CTA** — variants: primary, secondary, tertiary, outlined, danger, success, ghost; sizes sm/md/lg/icon; `glassLayers`, `selected`, `loading` |
| `GlassSelectIndicator.tsx` | Framer Motion sliding glass pill for selected nav/tabs (`layoutId` per group) |
| `MagneticButton.tsx` | Thin wrapper → `Button` — **deprecated**, kept for legacy imports |
| `Container.tsx` | Global layout width via `.page-container` |
| `SectionShell.tsx` | Section wrapper + optional `CosmicAtmosphere` |
| `SectionHeading.tsx` | Section titles with Framer Motion |
| `ThemeToggle.tsx` | Light/dark toggle (`Button` outlined icon + portaled `Tooltip`) |
| `Tooltip.tsx` | Portaled tooltips, auto-hide, no header clip |
| `BackToTop.tsx` | Scroll progress ring, Lenis scroll-to-top, uses `.btn--fab` |
| `ProfileAvatar.tsx` | Header photo with FM fallback on error |
| `FooterNavLink.tsx` | Footer nav item + `GlassSelectIndicator` |
| `FooterSocialLink.tsx` | Social icons in footer |
| `FooterPressable.tsx` | Thin wrapper → `Button` for footer interactions |
| `CredentialStack.tsx` | Stacked credential rows (certifications, education) |
| `CosmicAtmosphere.tsx` | Sparse distant starfield for sections (no galaxy blobs) |

---

## 5. Page Structure & Section IDs

`HomePage.tsx` section order:

1. **Hero** — full viewport, 3D background, no section id
2. **About** — `id="about"` (principles sidebar, no duplicate stats)
3. **Skills** — `id="skills"` (manual category tabs; no auto-slide)
4. **Experience** — `id="experience"`
5. **Projects** — `id="projects"` (case-study cards: problem → approach → outcome)
6. **Certifications** — `id="certifications"`
7. **Education** — `id="education"`
8. **Contact** — `id="contact"`

Nav links (`content.ts` → `navLinks`): About, Skills, Experience, Projects, Certifications, Education, Contact.

Section headings live in `sections` in `content.ts`. Use **Title Case** for section titles. Subtitles stay sentence case.

All live sections use `atmosphere="minimal"` on `SectionShell` (sparse distant stars only).

---

## 6. Design System

### Theme

- **Default on first visit**: system preference (`prefers-color-scheme`), then `localStorage` key `portfolio-theme`
- **Toggle**: `ThemeContext` + `ThemeToggle`
- **No flash**: inline script in `index.html` applies `.dark` before paint
- Light mode: cool slate canvas `#edf1f7`, white surfaces, indigo `#4755c7` + teal `#117a8a` accents
- Dark mode: soft gray `#2e2e36`, not pure black
- Hero 3D bg matches theme: `LIGHT_BG = '#d2d2d6'`, `DARK_BG = '#2e2e36'`

### Layout container (important)

Single gutter system in `index.css`:

```css
--content-max: 87.5rem;  /* 1400px */
--page-gutter: clamp(1.25rem, 3vw, 4rem);
.page-container {
  width: min(calc(100% - 2 * var(--page-gutter)), var(--content-max));
  margin-inline: auto;
}
```

**Do NOT** stack `max-width` + large `px-*` on nested containers — causes narrow layout.

Reading width for long text: `.reading-width` / `--reading-max: 42rem`.

### Button system (glass / M3-inspired)

- **Use `Button`** for all new buttons/CTAs — not raw `<button>` or ad-hoc classes
- CSS lives in `index.css` under `.btn`, `.btn--{variant}`, `.btn--{size}`, `.btn--nav`, `.btn--tab`, `.btn--fab`
- Default: frosted glass (`glassLayers={true}`) with shine/edge layers
- **Nav/tab/footer nav**: `glassLayers={false}` + `btn--nav` or `btn--tab` — transparent, indicator handled by `GlassSelectIndicator`
- **`LayoutGroup`**: one per nav group (`header-nav`, `footer-nav`, `skills-nav`) — wrap the list, not individual items
- Variants map: primary CTAs → `primary`; secondary actions → `secondary` or `outlined`; ghost/text → `tertiary`

### Visual language

- Premium, minimal, Inter typography, eye-comfortable contrast
- **Cosmic**: one **distant** galaxy in hero 3D only — light-years-away feel, not repeated nebula blobs per section
- `CosmicAtmosphere`: sparse pinprick stars (`starfield--distant`); **no** nebula orbs on sections
- Glass surfaces: `.glass`, panels: `.surface-panel`, lifts: `.interactive-lift`
- Always respect `prefers-reduced-motion` via `useReducedMotion` and CSS media query

---

## 7. Profile & Content Rules

### Current profile (`content.ts`)

- **Name**: Firoz Mahmud
- **Title (display)**: Senior Software Engineer
- **Tagline (hero mono line)**: Backend · LLM pipelines · Cloud-native systems
- **Availability badge**: "Open to Forward Deployed AI, backend, and cloud engineering roles"
- **Email**: firozmahmud26@gmail.com
- **Phone**: +880 1744-885126
- **Location**: Dhaka, Bangladesh
- **Photo**: `/img/myself.jpeg` → served from `public/img/myself.jpeg`
- **Initials fallback**: FM (`ProfileAvatar.tsx`)
- **Focus areas**: Backend, AI / LLM, Cloud, DevOps, Kubernetes

### Content editing

- Edit **`src/data/content.ts`** for text/data changes (section copy in `sections`, nav in `navLinks`, etc.)
- Preserve factual accuracy from resume
- External links (LinkedIn, GitHub, Credly, http/https) open in new tab via `Button` / footer links

---

## 8. Navigation — Active Section (scroll-spy)

**File**: `src/hooks/useActiveSection.ts`

Uses **scroll position**, NOT IntersectionObserver for nav (Skills auto-slide uses IO separately).

Algorithm:
- Activation line at **128px** from viewport top
- Default: last section whose `top <= 128px`
- **Near-line fallback**: if next section's top is just below the line (within 160px), prefer it — fixes Contact vs Education highlight bug
- **Near page bottom**: prefer last visible section in nav order
- `NAV_SCROLL_OFFSET = -128` exported for anchor scrolling

**Navbar** (`Navbar.tsx`):
- All nav links in horizontal pill at **all breakpoints** (scroll horizontally on narrow screens)
- **No hamburger / mobile drawer** — header right corner is theme toggle only
- `GlassSelectIndicator` (`layoutId="header-nav-glass"`)
- `pendingSection` state on click until scroll-spy agrees (same pattern in `Footer.tsx`)
- Contact is **in the nav pill** with other links — not a separate CTA

**Footer nav**: `FooterNavLink` + single `LayoutGroup id="footer-nav"` wrapping the `<ul>`

Order: about → experience → work → skills → contact (credentials is on-page, not in nav)

---

## 9. Notable UX Decisions (session history)

| Topic | Decision |
|-------|----------|
| **Role display** | Show **Senior Software Engineer** everywhere; FDE only in availability text |
| **Layout width** | Widened via single `.page-container`; hero uses full width |
| **Back to top** | `right-4 bottom-4 sm:right-6 sm:bottom-6` + safe-area margins |
| **Theme tooltip** | Portaled `Tooltip`, position left, auto-hide ~2.2s |
| **Header avatar** | Photo with FM fallback |
| **Button system** | Global glass `Button.tsx`; nav/tabs use `GlassSelectIndicator` + `glassLayers={false}` |
| **Nav Contact fix** | Scroll-spy near-line + pending section; Education no longer steals Contact highlight |
| **Hero 3D** | Scroll-linked `GalaxyBackground` (sticky viewport + parallax) — 5 distant galaxies desktop / 3 mobile + star field; galaxies spread vertically and shift with Lenis/window scroll; `HeroScene` adds hero text readability overlays; off when `prefers-reduced-motion` |
| **Section atmosphere** | All sections `minimal` — sparse distant CSS stars; 3D galaxies show through page canvas between panels |
| **Skills section** | Auto-cycles every 4.5s while section ≥35% visible (`IntersectionObserver`, `rootMargin: -12%`); pauses off-screen/tab hidden; stops permanently on manual tab click; `LayoutGroup id="skills-nav"` |
| **Section titles** | Title Case in `sections` / headings; subtitles sentence case |
| **Certifications & Education** | In nav; rendered via `CredentialStack` |
| **Projects** | Not on live page; `Projects.tsx` + `projects[]` retained but unmounted |
| **Light theme** | Soft neutral grey palette (`#d2d2d6` bg) — lower contrast, eye-comfort |
| **dist/ builds** | Run `npm run build` after changes, or keep `npm run build:watch` running |
| **AI context files** | Keep `AGENTS.md`, `CLAUDE.md`, `.cursor/rules/portfolio-context.mdc` in sync |

---

## 10. Performance & 3D

- `HeroScene` lazy-loaded in `Hero.tsx`
- Reduced star/particle counts; camera pulled back for distant galaxy; 3D disabled when `prefers-reduced-motion`
- Lenis + GSAP ScrollTrigger synced in `SmoothScroll.tsx`
- Build warning: HeroScene chunk ~889KB — acceptable for hero lazy load

---

## 11. Accessibility Checklist

- Semantic HTML, heading hierarchy
- `aria-label` on icon-only buttons
- `aria-current="page"` on active nav links; `aria-pressed` on skills tabs
- Focus rings via `--focus-ring` in `index.css`
- Keyboard nav + tooltips on focus
- Reduced motion: disable non-essential animation

---

## 12. Common Tasks for AI

### Update resume content
→ Edit `src/data/content.ts`, verify against `.tex` resume.

### Change theme colors
→ Edit CSS variables in `src/index.css` (`:root` and `.dark`); update `HeroScene.tsx` `LIGHT_BG` / `DARK_BG` if bg changes.

### Add or style a button
→ Use `Button` from `src/components/ui/Button.tsx`; extend `.btn*` in `index.css` if needed.

### Add a nav section
→ Add section `id`, add to `navLinks` in `content.ts`, add to `HomePage.tsx`; scroll-spy picks up ids from `navLinks` automatically.

### Change layout width
→ Adjust `--content-max` and `--page-gutter` in `index.css`, not per-component px.

### Swap profile photo
→ Replace `public/img/myself.jpeg` (and optionally `img/myself.jpeg`).

### Keep AI context current
→ After changing section order, nav, scripts, content structure, or UX rules, update **`AGENTS.md`**, **`CLAUDE.md`**, and **`.cursor/rules/portfolio-context.mdc`** in the same session.

---

## 13. What NOT to Do

- Do not rebuild from scratch unless explicitly requested
- Do not change factual content without user-provided source
- Do not use fonts other than Inter
- Do not add heavy dependencies without clear benefit
- Do not commit/push unless user asks
- Do not nest horizontal padding inside `.page-container`
- Do not use IntersectionObserver for **nav** active state (use `useActiveSection`)
- Do not put galaxy/3D on back-to-top button
- Do not add nebula/galaxy blobs to every section — hero 3D is the only galaxy focal point
- Do not wrap each nav link in its own `LayoutGroup` — one group per nav list
- Do not let AI context files drift — update them when the codebase changes materially

---

## 14. Git & Remote

- Remote: `origin` → `github.com/fmahmud26/portfolio`
- **`dist/`** is gitignored; deploy from local build output
- **Do not commit/push** unless the user explicitly asks

---

## 15. Related Files Outside Repo

- Resume variants: `/home/bs01631/Firoz_Mahmud/my-resume/`
- Primary resume for portfolio content: `ai-forward-deployed-engineer/Firoz_Mahmud_Resume.tex`

---

*Last updated: 2026-08-29 — Glass Button system, distant hero galaxy, minimal section atmosphere, nav Contact fix, light theme grey tokens, Footer LayoutGroup.*
