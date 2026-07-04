# nrkportfolio.in

Personal portfolio of **Koushik Nagabhatla** — developer & photographer. Cinematic single-page app with smooth scrolling, GSAP scroll animations, a photography gallery, and an audio "dynamic island" player.

**Live:** https://nrkportfolio.in/

## Stack

- [React 19](https://react.dev/) + [Vite](https://vite.dev/)
- [React Router 7](https://reactrouter.com/) — client-side routing (SPA rewrite on Vercel)
- [GSAP + ScrollTrigger](https://gsap.com/) — scroll-driven animations
- [Lenis](https://lenis.darkroom.engineering/) — smooth scrolling
- Deployed on [Vercel](https://vercel.com/) (see `vercel.json` for cache & security headers)

## Structure

```
index.html              Entry HTML: meta/SEO, critical CSS, font loading
public/                 Static assets served as-is
  about/                About-page gallery images
  photography/          Gallery images (hq/ = high-quality hero shots)
  fonts/                Self-hosted display font
src/
  main.jsx              React bootstrap
  App.jsx               Router, Lenis setup, route-level layout
  index.css             Design tokens, resets, global utilities
  assets/               Bundled images/audio (hashed by Vite)
  components/           One folder-level component + its CSS per feature
  data/photoDatabase.json  Gallery image manifest by category
```

## Routes

| Path | Page |
|------|------|
| `/` | Hero + selected works |
| `/about` | Editorial photo story |
| `/photography` | Category directory |
| `/photography/:category` | Masonry gallery (`all`, `people`, `bikes`, `nature`) |
| `/works` | Redirects to `/` |

## Development

```bash
npm install
npm run dev       # local dev server
npm run lint      # eslint
npm run build     # production build to dist/
npm run preview   # serve the production build locally
```
