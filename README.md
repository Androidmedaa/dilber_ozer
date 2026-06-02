# Portfolio

A Next.js portfolio inspired by [Adobe Portfolio / Jackie theme](https://bengielmacioglu.myportfolio.com/) — fixed sidebar, project grid with hover overlays, and full case study pages.

## Stack

- Next.js (App Router)
- TypeScript
- Framer Motion
- CSS Modules + design tokens aligned to the reference site

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Customize your content

| File | Purpose |
|------|---------|
| `src/data/site.ts` | Name, role, bio, profile image, social links |
| `src/data/projects.ts` | Projects, cover images, case study sections |
| `src/app/about/page.tsx` | About copy |
| `src/app/contact/page.tsx` | Contact form & links |

## Project routes

- `/` — Work gallery
- `/internships` — Internship projects
- `/artificial-intelligence` — AI projects
- `/projects/[slug]` — Case study detail

## Build

```bash
npm run build
npm start
```

## Deploy live (Vercel)

See **[DEPLOY.md](./DEPLOY.md)** for step-by-step instructions:

- Deploy to Vercel (free)
- Contact form via Formspree (`FORMSPREE_FORM_ID`)
- Optional private/unlisted mode (`SITE_PRIVATE=true`)
- Environment variables: copy from `.env.example`
