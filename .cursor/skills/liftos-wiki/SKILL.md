---
name: liftos-wiki
description: >-
  LiftOS product wiki, roadmap, UX flows, and next-step recommendations.
  Use when planning features, writing Linear issues, choosing what to build
  next, discussing production or paying customers, AI chat, billing, blocks,
  exercises, athletes, or when the user says wiki, producto, roadmap, o
  siguientes pasos.
---

# LiftOS wiki

Read this skill **before** inventing features, Linear tickets, or UX.

## Always do

1. Read [product.md](product.md) (who pays, wedge, out of scope).
2. Read [roadmap.md](roadmap.md) (what is Done vs next).
3. If the task is UI or a flow, read [ux.md](ux.md).
4. If the task is AI, tokens, or billing, read [ai.md](ai.md).
5. If the task is code structure, read [conventions.md](conventions.md).
6. End the reply with **Siguiente paso** — one Linear issue, why now, what not to start.

## Recommend, do not dump

- One issue ≈ one PR. Do not open a 20-ticket board unless Alba asks.
- Prefer finishing an open milestone over starting a new one.
- Coach **web** (this repo) before the athlete React Native app.
- Auth before more multi-user data. Billing after AI tokens exist.
- Do not implement React Native in this repo (`src/components` only).

## Keep the wiki true

When a ticket ships or the product bet changes, update the matching reference file in the same PR or immediately after. Do not let chat memory replace these files.

## Linear

- Team **Acz-dev**, project **LiftOS**.
- 1 issue = 1 PR = something Ferran can review in 10–20 minutes.
- Ticket body: what ships, what is out, how to see it.

## Mobbin

If a Mobbin MCP is connected, search coaching / programming / AI-editor flows and write findings into [ux.md](ux.md). If it is not connected, say so and use [ux.md](ux.md) as the source of truth — do not invent that you browsed Mobbin.
