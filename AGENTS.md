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
| 3D cosmos | Three.js + R3F + Drei (`GalaxyBackground.tsx` — lazy on `HomePage`; hero CSS overlays in `HeroScene.tsx`) |
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
│   ├── index.css            # Design system, theme tokens, glass button CSS, cosmic veils
│   ├── data/content.ts      # ★ ALL resume/portfolio content (single source of truth)
│   ├── context/ThemeContext.tsx
│   ├── hooks/
│   │   ├── useActiveSection.ts   # Navbar/footer scroll-spy (Lenis-aware)
│   │   ├── useGsapScroll.ts      # GSAP reveal/stagger (respects reduced motion)
│   │   └── useReducedMotion.ts
│   ├── pages/HomePage.tsx
│   ├── sections/            # Hero, About, Skills, Experience, Projects, Certifications, Education, Contact
│   ├── components/
│   │   ├── layout/          # Navbar, Footer, Container, SmoothScroll
│   │   ├── three/           # GalaxyBackground, HeroScene, galaxy/* (3D cosmos)
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

### Key 3D / cosmos files

| File | Purpose |
|------|---------|
| `GalaxyBackground.tsx` | Sticky full-viewport Canvas; lazy-loaded on `HomePage`; disabled when `prefers-reduced-motion` |
| `HeroScene.tsx` | Hero-only CSS gradients/readability overlays (no WebGL) |
| `galaxy/constants.ts` | `HERO_RIGHT_GALAXY`, distant galaxies, `COMFORT` tokens, parallax range |
| `galaxy/generateCosmos.ts` | Procedural solar systems + rogue planets (desktop/mobile counts) |
| `galaxy/GalaxyCore.tsx` | Spiral galaxy mesh (differential spin, core halo) |
| `galaxy/SolarSystem.tsx` | Star + orbiting planets |
| `galaxy/RoguePlanet.tsx` | Standalone drifting planets |
| `galaxy/DeepStarField.tsx` | Multi-layer drei `Stars` + pinprick particles |
| `galaxy/AmbientCosmicDrift.tsx` | Slow time-based scene drift |
| `galaxy/cosmicMotion.ts` | `cosmicVisibility(isDark, opacity)` theme multiplier |

---

## 5. Page Structure & Section IDs

`HomePage.tsx` layout:

```
<div> Navbar
  <div> GalaxyBackground (absolute) + content-readability-veil
    <main> Hero → About → Skills → Experience → Projects → Certifications → Education → Contact
  </div>
  Footer          ← sibling outside galaxy wrapper (z-index above canvas)
  BackToTop
</div>
```

Section order:

1. **Hero** — full viewport, no section id
2. **About** — `id="about"` (principles sidebar, no duplicate stats)
3. **Skills** — `id="skills"` (manual category tabs)
4. **Experience** — `id="experience"`
5. **Projects** — `id="projects"` (case-study cards: problem → approach → outcome)
6. **Certifications** — `id="certifications"` (`Certifications.tsx` + `CredentialStack`)
7. **Education** — `id="education"` (`Education.tsx` + `CredentialStack`)
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
- Light mode: soft off-white canvas `#e9eef5`, indigo `#4755c7` + teal `#117a8a` accents
- Dark mode: soft gray `#2e2e36`, not pure black
- WebGL canvas bg: `LIGHT_BG = '#e9eef5'`, `DARK_BG = '#2e2e36'` in `galaxy/constants.ts`

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
- **Cosmic**: scroll-linked full-page `GalaxyBackground` (stars, solar systems, rogue planets, distant galaxies + featured hero-right galaxy); `HeroScene` adds hero text readability gradients only
- Readability layers: `content-readability-veil` (page), `section-readability-scrim` (sections), `cosmic-vignette` (canvas overlay) — cosmos visible at edges
- `CosmicAtmosphere`: sparse pinprick stars on sections; **no** nebula orbs per section
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

Uses **scroll position**, NOT IntersectionObserver for nav.

Algorithm:
- Activation line at **128px** from viewport top
- Default: last section whose `top <= 128px`
- **Near-line fallback**: if next section's top is just below the line (within 160px), prefer it — fixes Contact vs Education highlight at page end
- **Near page bottom**: prefer last visible section in nav order
- `NAV_SCROLL_OFFSET = -128` exported for anchor scrolling

**Navbar** (`Navbar.tsx`):
- **Breakpoint**: `lg` = 1024px; mobile nav uses `matchMedia('(max-width: 1023px)')` → `isMobileNav` state (same as `GalaxyBackground` mobile detection)
- **Desktop (`lg+`)**: all 7 nav links in horizontal pill + theme toggle in header; **no hamburger** (not rendered)
- **Mobile (`< lg`)**: profile photo left, hamburger right — nav links + theme toggle in slide-down panel (`#mobile-nav-menu`)
- **Hamburger visibility**: render hamburger only when `isMobileNav` is true — do **not** rely on `lg:hidden` on `Button` alone (`.btn { display: inline-flex }` overrides Tailwind `hidden`)
- **Mobile menu**: `AnimatePresence` panel + backdrop; closes on link click, backdrop tap, Escape, or resize to desktop; Lenis `stop()` / `start()` while open
- `GlassSelectIndicator`: `layoutId="header-nav-glass"` (desktop); `mobile-header-nav-glass` (mobile menu)
- `LayoutGroup`: `header-nav` (desktop pill); `mobile-header-nav` (mobile list) — one group per list, not per link
- Mobile menu styles: `.mobile-nav-backdrop`, `.mobile-nav-panel`, `.mobile-nav-list`, `.mobile-nav-theme` in `index.css`
- `pendingSection` state on click until scroll-spy agrees (same pattern in `Footer.tsx`)

**Footer nav**: `FooterNavLink` + single `LayoutGroup id="footer-nav"` wrapping the `<ul>`

Nav scroll-spy order (from `navLinks`): about → skills → experience → projects → certifications → education → contact

---

## 9. Notable UX Decisions (session history)

| Topic | Decision |
|-------|----------|
| **Role display** | Show **Senior Software Engineer** everywhere; FDE only in availability text |
| **Layout width** | Widened via single `.page-container`; hero uses full width |
| **Back to top** | Simple FAB + scroll progress ring — no cosmic orbit animation |
| **Theme tooltip** | Portaled `Tooltip`, position left, auto-hide ~2.2s |
| **Header avatar** | Photo with FM fallback |
| **Button system** | Global glass `Button.tsx`; nav/tabs use `GlassSelectIndicator` + `glassLayers={false}` |
| **Nav Contact fix** | Scroll-spy near-line + pending section; Education no longer steals Contact highlight |
| **Mobile nav** | Hamburger below `lg` (1023px); photo in header; nav + theme in panel; hamburger unmounted on desktop |
| **Section order** | About → Skills → Experience → Projects → Certifications → Education → Contact (all in nav) |
| **Projects** | Mounted on `HomePage`; section id `#projects`; hero CTA links to `#projects` |
| **Certifications & Education** | Split from combined Credentials; separate sections + nav entries |
| **3D cosmos** | `GalaxyBackground` sticky canvas with Lenis scroll parallax; featured galaxy beside hero text (right); procedural solar systems/planets; `AmbientCosmicDrift`; boosted visibility in light + dark via `cosmicVisibility()` |
| **Hero overlays** | `HeroScene` = CSS gradients only; WebGL lives in page-level `GalaxyBackground` |
| **Section atmosphere** | All sections `minimal` — sparse distant CSS stars |
| **Skills section** | Manual category tabs only (`LayoutGroup id="skills-nav"`) — no auto-slide |
| **Footer** | Outside galaxy wrapper so it stays visible above cosmic canvas |
| **Light theme** | Soft `#e9eef5` canvas, frosted glass buttons/surfaces |
| **dist/ builds** | Run `npm run build` after changes, or keep `npm run build:watch` running |
| **AI context files** | Keep `AGENTS.md`, `CLAUDE.md`, `.cursor/rules/portfolio-context.mdc` in sync |

---

## 10. Performance & 3D

- `GalaxyBackground` lazy-loaded via `Suspense` on `HomePage` (not in Hero)
- Reduced counts on mobile; entire 3D canvas returns `null` when `prefers-reduced-motion`
- Lenis + GSAP ScrollTrigger synced in `SmoothScroll.tsx`
- Build warning: GalaxyBackground chunk ~900KB — acceptable for lazy load

---

## 11. Accessibility Checklist

- Semantic HTML, heading hierarchy
- `aria-label` on icon-only buttons; `aria-expanded` / `aria-controls` on mobile menu toggle
- `aria-current="page"` on active nav links; `aria-pressed` on skills tabs
- Focus rings via `--focus-ring` in `index.css`
- Keyboard nav + tooltips on focus
- Reduced motion: disable non-essential animation (including full 3D canvas)

---

## 12. Common Tasks for AI

### Update resume content
→ Edit `src/data/content.ts`, verify against `.tex` resume.

### Change theme colors
→ Edit CSS variables in `src/index.css` (`:root` and `.dark`); update `LIGHT_BG` / `DARK_BG` in `galaxy/constants.ts` if canvas bg changes.

### Add or style a button
→ Use `Button` from `src/components/ui/Button.tsx`; extend `.btn*` in `index.css` if needed.

### Add a nav section
→ Add section `id`, add to `navLinks` in `content.ts`, mount in `HomePage.tsx`; scroll-spy picks up ids from `navLinks` automatically.

### Change layout width
→ Adjust `--content-max` and `--page-gutter` in `index.css`, not per-component px.

### Tune 3D cosmos
→ Placements in `galaxy/constants.ts` + `generateCosmos.ts`; motion in `COMFORT`, `AmbientCosmicDrift`, component `useFrame` hooks; readability in `index.css` veils.

### Swap profile photo
→ Replace `public/img/myself.jpeg` (and optionally `img/myself.jpeg`).

### Tune mobile header nav
→ `Navbar.tsx` (`isMobileNav`, menu state); mobile styles under `.mobile-nav-*` in `index.css`. Keep desktop pill unchanged at `lg+`.

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
- Do not add nebula/galaxy blobs to every section — page-level WebGL + hero CSS overlays only
- Do not use `lg:hidden` on `Button` to hide the hamburger — use `isMobileNav` conditional render (or a non-`.btn` wrapper)
- Do not wrap each nav link in its own `LayoutGroup` — one group per nav list (`header-nav`, `mobile-header-nav`, `footer-nav`, `skills-nav`)
- Do not let AI context files drift — update them when the codebase changes materially
- Do not mount Footer inside the galaxy absolute wrapper — it hides behind the canvas

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

*Last updated: 2026-08-29 — Mobile hamburger nav below `lg` (conditional render + slide-down panel); AI context sync for Claude & Cursor.*
