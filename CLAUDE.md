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
- **Nav UI**: `lg+` → 7-link header pill + theme toggle; `< lg` → photo + hamburger; panel has nav links + theme (`matchMedia` max-width 1023px; hamburger not rendered on desktop)
- **Theme**: `portfolio-theme` in localStorage; light bg `#e9eef5`, dark `#2e2e36`
- **Photo**: `public/img/myself.jpeg` with FM fallback

## Page order (live)

Hero → About → Skills → Experience → Projects → Certifications → Education → Contact → Footer

**Nav:** About · Skills · Experience · Projects · Certifications · Education · Contact

## Copy & UX rules

- Section **titles**: Title Case (`Technical Stack`, `Industry Certifications`)
- Section **subtitles**: sentence case
- **Skills**: manual category tabs only — no auto-slide
- **Mobile nav**: hamburger only when viewport &lt; 1024px; do not use `lg:hidden` on `Button` for hamburger (use conditional render); Lenis paused while menu open
- **Cosmic**: lazy `GalaxyBackground` (sticky WebGL canvas, scroll parallax, hero-right galaxy, solar systems, stars); `HeroScene` = hero CSS readability overlays only; sections use sparse stars (`CosmicAtmosphere` minimal)
- **Footer**: sibling of main/galaxy wrapper — not inside cosmic canvas
- **LayoutGroup**: one per nav list (`header-nav`, `mobile-header-nav`, `footer-nav`, `skills-nav`) — not per link

## AI context maintenance

When you change section order, nav, scripts, content structure, or UX rules, update in the same session:

1. `AGENTS.md`
2. `CLAUDE.md`
3. `.cursor/rules/portfolio-context.mdc`

When unsure about architecture, UX decisions, or session history → **read AGENTS.md §5–§9**.
