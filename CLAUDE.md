# Claude Code — Project Context

**Read [`AGENTS.md`](./AGENTS.md) first.** It contains the complete AI context for this repository.

## Quick reference

- **Project**: Firoz Mahmud's portfolio — React 19 + Vite 8 + TypeScript + Tailwind v4
- **Content**: `src/data/content.ts` (do not invent facts)
- **Commands**: `npm run dev` | `npm run build` | `npm run lint`
- **Display title**: Senior Software Engineer (FDE only in availability text)
- **Layout**: `.page-container` in `src/index.css` — do not stack extra horizontal padding
- **Nav active state**: `src/hooks/useActiveSection.ts` (scroll-spy, Lenis-aware)
- **Theme**: `portfolio-theme` in localStorage; system preference on first visit
- **Photo**: `public/img/myself.jpeg` with FM fallback

When unsure about architecture, UX decisions, or session history → **read AGENTS.md §8–§9**.
