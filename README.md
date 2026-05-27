# pluss.dev

Marketing site for [pluss.dev](https://pluss.dev) — **React + Vite** with smooth scroll, GSAP animations, and a 3D hero.

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server |
| `npm run build` | Production build → `dist/` |
| `npm run preview` | Preview production build |
| `npm run screenshots` | Capture project preview images (Playwright) |

## Stack

- **React 18** + **Vite**
- **React Router** for pages (`app/` route components)
- **Tailwind CSS** + **HeroUI**
- **GSAP** ScrollTrigger + **Lenis** smooth scroll
- **React Three Fiber** (hero 3D model)

## Project layout

```
app/           Route pages (home, about, packs, admin)
components/    UI sections and shared components
src/           Vite entry (main.tsx, App.tsx, shims, styles)
public/        Static assets (images, models, CV)
```

`next/image` and `next/link` are shimmed in `src/shims/` for compatibility — this is not a Next.js app.
