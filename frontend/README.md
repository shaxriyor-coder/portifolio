# Portfolio — Frontend

Developer portfolio (landing page + admin panel) built with **Next.js 16**, **React 19**,
**TypeScript** and **Tailwind CSS 3**. All data comes from the Django REST API in
[`../backent`](../backent).

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

Copy `.env.example` to `.env.local` and point it at the backend:

```bash
# Local development (Django running on port 8000)
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000

# Production
NEXT_PUBLIC_API_BASE_URL=https://your-backend-domain.com
```

`lib/api-client.ts` reads this value, normalizes trailing slashes and builds every
request URL. If it is missing the app falls back to `http://localhost:8000`, so it
**must** be set on any deployment (Vercel, etc.).

## Structure

```
app/
├── page.tsx                # Landing page (hero, about, skills, projects, contact, footer)
├── layout.tsx              # Root layout, fonts, toaster
├── globals.css             # Design tokens + animations (dark theme)
├── project/[id]/page.tsx   # Project detail page
└── admin/                  # Admin panel (client-side gated via localStorage)
    ├── layout.tsx          # Sidebar + auth guard
    ├── login/page.tsx      # Calls POST /api/login/ on the backend
    ├── page.tsx            # Dashboard
    ├── projects/page.tsx   # Projects CRUD
    ├── skills/page.tsx     # Skills CRUD
    ├── profile/page.tsx    # Profile editor
    └── about/page.tsx      # "About me" editor

components/landing/         # Section components for the landing page
lib/api-client.ts           # Backend URL builder (apiUrl helper)
```

## Backend API

The frontend consumes these endpoints from `NEXT_PUBLIC_API_BASE_URL` (see the
backend README for details): `profile`, `about-me`, `projects`, `projects/:id`,
`skills`, `skills/:id`, `contact`, `login`.

## Deployment

Deployable to Vercel or any Node host. Set `NEXT_PUBLIC_API_BASE_URL` to the live
backend URL. Images are served unoptimized (`next.config.mjs`) so no image host
configuration is required.
