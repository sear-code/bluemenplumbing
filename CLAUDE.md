# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start Next.js dev server
- `npm run build` — production build
- `npm run lint` — run ESLint
- `npm start` — start production server

## Architecture

This is a **Next.js 16** app (App Router) for a plumbing business website, using React 18, TypeScript, Tailwind CSS, and shadcn/ui components. It was originally scaffolded via Lovable and migrated from Vite to Next.js.

### Directory Layout

- **`app/`** — Next.js App Router: `layout.tsx`, `page.tsx` (single-page site), `providers.tsx` (QueryClient, Tooltip, Toasters, i18n init), and API routes
- **`app/api/`** — Server-side API routes: `quotes/`, `google-reviews/`, `services/`, `admin/services/{categories,items}/`
- **`src/components/`** — React components: page sections (`Header`, `Hero`, `Services`, `QuoteGenerator`, `Testimonials`, `Contact`, `Footer`), `forms/` (multi-step quote wizard), `admin/` (services management), `ui/` (shadcn primitives)
- **`src/services/`** — Data access layer: `quoteService.ts`, `googleReviewsService.ts`, `pricingService.ts`, `supabaseServiceApi.ts`, `adminServiceApi.ts`, `serviceData.ts`
- **`src/viewmodels/`** — Form state management (`useQuoteForm.ts`)
- **`src/models/`** — TypeScript type definitions (`Quote.ts`)
- **`src/lib/`** — `supabase.ts` (client + DB type definitions), `utils.ts` (cn helper)
- **`src/i18n/`** — i18next config with English and French locales (`locales/en.json`, `locales/fr.json`)
- **`src/assets/`** — Static images, logos, Lottie animations

### Key Patterns

- **Path alias**: `@/*` maps to `./src/*`
- **Supabase** is the backend (quotes, service categories, service items). Client is in `src/lib/supabase.ts`. DB types are co-located there.
- **Service categories** use a union type: `'rough-in' | 'finishing' | 'kitchen' | 'laundry' | 'repair' | 'maintenance'`
- **Quote system** uses a multi-step wizard form in `src/components/forms/` with two-tier service selection (categories → items)
- **Google Reviews** are fetched via API route with 24-hour caching and a fallback system
- **React Query** (`@tanstack/react-query`) for server state management, configured in `app/providers.tsx`
- **Styling**: Tailwind CSS with shadcn/ui design tokens (CSS custom properties via HSL). Custom gradients/shadows defined in `tailwind.config.ts`.

### Environment Variables

Required in `.env.local`:
- `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` — Supabase connection
- `NEXT_PUBLIC_GOOGLE_PLACES_API_KEY` / `NEXT_PUBLIC_GOOGLE_PLACE_ID` — Google Reviews

### Database

Schema files: `supabase-schema.sql` (DDL), `supabase-initial-data.sql` (seed data). Three main tables: `service_categories`, `service_items`, `quotes`.

### Deployment

Deployed on Vercel. The `next.config.mjs` allows remote images from `lh3.googleusercontent.com` and `maps.googleapis.com`.
