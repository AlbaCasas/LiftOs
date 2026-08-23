# Conventions

## Stack (do not reopen)

Next.js 16 App Router, React 19, TypeScript, pnpm, Tailwind 4, shadcn (`radix-nova`), next-intl (default `es`), Neon + Drizzle.

## Folders

| Path | What belongs |
|---|---|
| `src/app/` | Routes and layouts only. |
| `src/components/ui/` | shadcn primitives. |
| `src/components/common/` | App chrome (Shell). |
| `src/features/<name>/` | `domain` / `application` / `infrastructure` / `ui`. |
| `src/proxy.ts` | Redirect `/` and `/home` → `/athletes`. |

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

**One database.** Neon + Drizzle stays. Vercel is the **host** for Next (pages + future Route Handlers), not a second database and not a replacement for Neon.

| Client | How it reads |
|---|---|
| Coach web (now) | Server Component → use case → Drizzle. No HTTP. |
| Athlete mobile (later) | `fetch` → `app/api/athlete/*` → **same** use case → same Neon. |

Do not build those routes until an athlete client exists. Do not stand up a separate REST service “to be cheaper” — at this scale one Next deploy + one Neon is the cheap path. Athlete MVP is read-only: the assigned block. Auth for athletes is a second identity, not the coach session.

**AI later.** Coach-only `POST /api/ai/block-chat` on the same Next app. Provider key stays on the server. Meter in Neon. See [ai.md](ai.md).
