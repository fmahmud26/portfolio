# Firoz Mahmud — Portfolio

Personal portfolio site for **Firoz Mahmud**, Senior Software Engineer.

> **AI agents (Cursor / Claude):** read [`AGENTS.md`](./AGENTS.md) for full project context before making changes.  
> Claude Code: see also [`CLAUDE.md`](./CLAUDE.md).

## Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19 + Vite 8 + TypeScript |
| Styling | Tailwind CSS v4 |
| UI Animation | Framer Motion |
| Scroll Animation | GSAP + ScrollTrigger |
| Smooth Scroll | Lenis |
| 3D | Three.js + React Three Fiber + Drei |
| Icons | Lucide React |
| Routing | React Router |

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Build for production (static site)

```bash
npm run build
```

Output goes to `dist/` — deploy to any static host (GitHub Pages, Netlify, Vercel, S3, etc.).

```bash
npm run preview   # preview the production build locally
```

## Project Structure

```
src/
├── components/
│   ├── layout/     # Navbar, Footer, Container, SmoothScroll
│   ├── three/      # HeroScene (3D cosmic background)
│   └── ui/         # Buttons, tooltips, BackToTop, footer pressables, etc.
├── sections/       # Hero, About, Experience, Projects, Skills, Certifications, Contact
├── pages/          # HomePage
├── hooks/          # useActiveSection, useGsapScroll, useReducedMotion
├── context/        # ThemeContext
└── data/           # content.ts (single source of truth)
```

## Content

All resume data lives in `src/data/content.ts` — update projects, experience, skills, and contact info there.
