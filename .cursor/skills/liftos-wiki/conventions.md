# Conventions

## Stack (do not reopen)

Next.js 16 App Router, React 19, TypeScript, pnpm, Tailwind 4, shadcn (`radix-nova`), next-intl (default `es`), Auth.js / NextAuth (coach sign-in), Neon + Drizzle.

## Folders

| Path | What belongs |
|---|---|
| `src/app/` | Routes and layouts only. |
| `src/components/ui/` | shadcn primitives. |
| `src/components/common/` | App chrome (Shell). |
| `src/features/<name>/` | `domain` / `application` / `infrastructure` / `ui`. |
| `src/auth.ts` | Auth.js config. Session `user.id` is the coach id. |
| `src/proxy.ts` | Redirect `/` and `/home`. |

Root `layout.tsx` = `html` / `body` / i18n. Nested layouts attach shells. Pages do not wrap themselves in `Shell`.

## UI

- Only `src/components` (no React Native).
- Navigation: `Link`, not `useRouter`, for in-app links.
- One `<main>` per view (`SidebarInset` is the main when the shell is on).

## Git / Linear

- Conventional Commits: `feat(scope):` / `fix` / `refactor`.
- PR body: pr-desc skill (`### What does this PR do?`, tickets, `### How to test`).
- 1 Linear issue ≈ 1 PR.

## Data

Pages call use cases. Use cases talk to repository interfaces. Postgres adapter is the default. Do not add a public `/api` for a Server Component read unless there is a client that needs it.

Coach identity is the Auth.js session `user.id` (row in `users`). Use cases that read or write athletes call `requireCoachId`. The proxy is only an optimistic redirect — not the security boundary.

`/api/auth/*` is the Auth.js route handler. That is the exception to “no public API” until a second client exists.

**One database.** Neon + Drizzle stays. Vercel is the **host** for Next (pages + future Route Handlers), not a second database and not a replacement for Neon.

Coach web writes use a Server Action (`"use server"`). Do not add webrpc or REST until a second client (athlete app) exists.

| Client | How it talks to Neon |
|---|---|
| Coach web reads | Server Component → use case → Drizzle. No HTTP. |
| Coach web writes | Server Action → Zod → Drizzle. |
| Athlete mobile (later) | `fetch` → `app/api/athlete/*` → **same** use case → same Neon. |

Do not build those athlete routes until that client exists. Do not stand up a separate REST service “to be cheaper” — at this scale one Next deploy + one Neon is the cheap path. Athlete MVP is read-only: the assigned block. Auth for athletes is a second identity, not the coach session.

**AI later.** Coach-only `POST /api/ai/block-chat` on the same Next app. Provider key stays on the server. Meter in Neon. See [ai.md](ai.md).
