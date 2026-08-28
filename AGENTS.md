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
| **Dev URL** | `http://localhost:5173` |
| **Primary role (display)** | Senior Software Engineer |
| **Target roles (availability)** | Forward Deployed AI, backend & cloud — user is open to switching, NOT currently titled FDE |

**Do NOT invent** companies, dates, certifications, metrics, or projects. All factual content lives in `src/data/content.ts` and should match the resume.

---

## 2. Commands

```bash
npm install          # install deps
npm run dev          # Vite dev server → localhost:5173
npm run build        # tsc + production build → dist/
npm run preview      # preview production build
npm run lint         # oxlint
```

**Do not commit** unless the user explicitly asks.

---

## 3. Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | React 19 + Vite 8 + TypeScript |
| Styling | Tailwind CSS v4 (`@import 'tailwindcss'` in `src/index.css`) |
| Design tokens | CSS variables in `:root` / `.dark` + `@theme` |
| Font | **Inter only** (Google Fonts in `index.html`) |
| UI animation | Framer Motion |
| Scroll animation | GSAP + ScrollTrigger (`src/hooks/useGsapScroll.ts`) |
| Smooth scroll | Lenis (`src/components/layout/SmoothScroll.tsx`, exposed as `window.__lenis`) |
| 3D hero | Three.js + R3F + Drei (`src/components/three/HeroScene.tsx`) |
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
│   ├── index.css            # Design system, utilities, theme tokens
│   ├── data/content.ts      # ★ ALL resume/portfolio content (single source of truth)
│   ├── context/ThemeContext.tsx
│   ├── hooks/
│   │   ├── useActiveSection.ts   # Navbar scroll-spy (Lenis-aware)
│   │   ├── useGsapScroll.ts      # GSAP reveal/stagger (respects reduced motion)
│   │   └── useReducedMotion.ts
│   ├── pages/HomePage.tsx
│   ├── sections/            # Hero, About, Experience, Projects, Skills, Certifications, Contact
│   ├── components/
│   │   ├── layout/          # Navbar, Footer, Container, SmoothScroll
│   │   ├── three/           # HeroScene (cosmic/galaxy visual)
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
| `Container.tsx` | Global layout width via `.page-container` |
| `SectionShell.tsx` | Section wrapper + optional `CosmicAtmosphere` |
| `SectionHeading.tsx` | Section titles with Framer Motion |
| `MagneticButton.tsx` | CTA buttons (primary/secondary/ghost), auto external links |
| `ThemeToggle.tsx` | Light/dark toggle with portaled tooltip |
| `Tooltip.tsx` | Portaled tooltips, auto-hide, no header clip |
| `BackToTop.tsx` | Scroll progress ring, Lenis scroll-to-top, animated |
| `ProfileAvatar.tsx` | Header photo with FM fallback on error |
| `FooterPressable.tsx` | Ripple/press interactions for footer links |
| `FooterSocialLink.tsx` | Social icons in footer |
| `BrandIcons.tsx` | GitHub + LinkedIn SVG (Lucide lacks brand icons in this version) |

---

## 5. Page Structure & Section IDs

`HomePage.tsx` section order:

1. **Hero** — full viewport, 3D background, no section id
2. **About** — `id="about"`
3. **Experience** — `id="experience"`
4. **Projects** — `id="work"` (nav label: "Work")
5. **Skills** — `id="skills"` (interactive category tabs)
6. **Certifications** — `id="certifications"` (not in nav)
7. **Contact** — `id="contact"`

Nav links (`content.ts` → `navLinks`): About, Experience, Work, Skills, Contact.

---

## 6. Design System

### Theme

- **Default on first visit**: system preference (`prefers-color-scheme`), then `localStorage` key `portfolio-theme`
- **Toggle**: `ThemeContext` + `ThemeToggle`
- **No flash**: inline script in `index.html` applies `.dark` before paint
- Light mode: soft off-white `#f3f4f8`, not pure white
- Dark mode: soft gray `#2e2e36`, not pure black

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

### Visual language

- Premium, minimal, Inter typography, eye-comfortable contrast
- Subtle galaxy/cosmic atmosphere (NOT neon/cyberpunk)
- `CosmicAtmosphere` on sections; full 3D `HeroScene` on hero only
- Glass surfaces: `.glass`, panels: `.surface-panel`, lifts: `.interactive-lift`
- Always respect `prefers-reduced-motion` via `useReducedMotion` and CSS media query

---

## 7. Profile & Content Rules

### Current profile (`content.ts`)

- **Name**: Firoz Mahmud
- **Title / tagline (display)**: Senior Software Engineer
- **Availability badge**: "Open to Forward Deployed AI, backend & cloud roles"
- **Email**: firozmahmud26@gmail.com
- **Photo**: `/img/myself.jpeg` → served from `public/img/myself.jpeg`
- **Initials fallback**: FM (`ProfileAvatar.tsx`)
- **Focus areas**: Backend, AI, Cloud, DevOps, DevSecOps

### Content editing

- Edit **`src/data/content.ts` only** for text/data changes
- Preserve factual accuracy from resume
- External links (LinkedIn, GitHub, Credly, http/https) open in new tab via `MagneticButton` / footer links

---

## 8. Navigation — Active Section (scroll-spy)

**File**: `src/hooks/useActiveSection.ts`

Uses **scroll position**, NOT IntersectionObserver (which skipped Experience).

- On each Lenis/window scroll: find last section whose `getBoundingClientRect().top <= 128px`
- Order: about → experience → work → skills → contact
- Desktop: animated pill (`layoutId="nav-active-indicator"`) + gradient underline
- Mobile menu: left accent bar + highlighted row

---

## 9. Notable UX Decisions (session history)

| Topic | Decision |
|-------|----------|
| **Role display** | Show **Senior Software Engineer** everywhere; FDE only in availability text |
| **Layout width** | Widened via single `.page-container`; hero/projects use full width |
| **Back to top** | `right-4 bottom-4 sm:right-6 sm:bottom-6` + safe-area margins; symmetric spacing |
| **Theme tooltip** | Portaled `Tooltip`, position left, auto-hide ~2.2s; navbar no `overflow-hidden` when scrolled |
| **Header avatar** | Photo with FM fallback |
| **Footer social** | `FooterPressable` ripple/press; brand icons for GitHub/LinkedIn |
| **Footer "Connect" label** | Removed per user request |
| **Hero 3D** | Minimal cosmos beside text (not on back-to-top); reduced particles on mobile / reduced motion |
| **Skills section** | Click/tap category tabs with animated panel |
| **Projects** | Case-study cards; featured span 2 cols; 3-col grid on xl |

---

## 10. Performance & 3D

- `HeroScene` lazy-loaded in `Hero.tsx`
- Star count reduced on mobile; 3D disabled when `prefers-reduced-motion`
- Lenis + GSAP ScrollTrigger synced in `SmoothScroll.tsx`
- Build warning: HeroScene chunk ~888KB — acceptable for hero lazy load

---

## 11. Accessibility Checklist

- Semantic HTML, heading hierarchy
- `aria-label` on icon-only buttons
- `aria-current="page"` on active nav links
- Focus rings via `--focus-ring` in `index.css`
- Keyboard nav + tooltips on focus
- Reduced motion: disable non-essential animation

---

## 12. Common Tasks for AI

### Update resume content
→ Edit `src/data/content.ts`, verify against `.tex` resume.

### Change theme colors
→ Edit CSS variables in `src/index.css` (`:root` and `.dark`).

### Add a nav section
→ Add section `id`, add to `navLinks` in `content.ts`, add to `HomePage.tsx`, update `useActiveSection` ids automatically via navLinks.

### Change layout width
→ Adjust `--content-max` and `--page-gutter` in `index.css`, not per-component px.

### Swap profile photo
→ Replace `public/img/myself.jpeg` (and optionally `img/myself.jpeg`).

---

## 13. What NOT to Do

- Do not rebuild from scratch unless explicitly requested
- Do not change factual content without user-provided source
- Do not use fonts other than Inter
- Do not add heavy dependencies without clear benefit
- Do not commit/push unless user asks
- Do not nest horizontal padding inside `.page-container`
- Do not use IntersectionObserver for nav active state (use `useActiveSection`)
- Do not put galaxy/3D on back-to-top button

---

## 14. Git Status Notes

- Project may have no commits yet on `main` — check `git status` before assuming history
- Remote `origin/main` may be `[gone]` — user has not requested deploy yet

---

## 15. Related Files Outside Repo

- Resume variants: `/home/bs01631/Firoz_Mahmud/my-resume/`
- Primary resume for portfolio content: `ai-forward-deployed-engineer/Firoz_Mahmud_Resume.tex`

---

*Last updated: 2026-08-28 — reflects full portfolio build session including UI polish, layout fixes, footer interactions, and nav scroll-spy.*
