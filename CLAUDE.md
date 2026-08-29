# Claude Code — Project Context

**Read [`AGENTS.md`](./AGENTS.md) first.** It contains the complete AI context for this repository.

## Quick reference

- **Project**: Firoz Mahmud's portfolio — React 19 + Vite 8 + TypeScript + Tailwind v4
- **Content**: `src/data/content.ts` (do not invent facts; section copy in `sections`, nav in `navLinks`)
- **Commands**: `npm run dev` | `npm run build` | `npm run build:watch` | `npm run lint`
- **dist/**: run `npm run build` after code changes (or `npm run build:watch` in a second terminal)
- **Display title**: Senior Software Engineer (FDE only in availability text)
- **Layout**: `.page-container` in `src/index.css` — do not stack extra horizontal padding
- **Buttons**: use `Button.tsx` (glass system in `index.css`); `MagneticButton` is deprecated
- **Nav active state**: `src/hooks/useActiveSection.ts` (scroll-spy, Lenis-aware, near-line + bottom fixes)
- **Nav UI**: nav pill at all breakpoints (horizontal scroll on narrow screens); theme toggle only in header actions — **no hamburger**
- **Theme**: `portfolio-theme` in localStorage; light bg `#edf1f7`, dark `#2e2e36`
- **Photo**: `public/img/myself.jpeg` with FM fallback

## Page order (live)

Hero → About → Skills → Experience → Projects → Certifications → Education → Contact

**Nav:** About · Skills · Experience · Projects · Certifications · Education · Contact

`Projects.tsx` exists but is **not mounted** on `HomePage`.

## Copy & UX rules

- Section **titles**: Title Case (`Technical Expertise`, `Get in Touch`)
- Section **subtitles**: sentence case
- **Skills**: auto-cycles every 4.5s while section ≥35% visible; pauses off-screen; stops on manual tab click; off when reduced motion
- **Cosmic**: one distant galaxy in hero 3D only; sections use sparse stars (`CosmicAtmosphere` minimal) — no repeated nebula blobs
- **LayoutGroup**: one per nav list (`header-nav`, `footer-nav`, `skills-nav`) — not per link

## AI context maintenance

When you change section order, nav, scripts, content structure, or UX rules, update in the same session:

1. `AGENTS.md`
2. `CLAUDE.md`
3. `.cursor/rules/portfolio-context.mdc`

When unsure about architecture, UX decisions, or session history → **read AGENTS.md §5–§9**.
