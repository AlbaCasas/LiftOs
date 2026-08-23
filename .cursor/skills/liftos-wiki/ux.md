# UX

Sourced from Mobbin (2026-08-23). Prefer these links over guessing. Layout: **editor first, chat beside it**, not chat-first.

## Steal

### Roster (empty → first athlete)

[Time2book — Adding clients](https://mobbin.com/flows/07d7390d-cc40-4383-bdec-219f46d4950e): table of people, primary **Add**, short form (name / contact), toast on save. [Midday — Customers](https://mobbin.com/flows/362a6d23-6cee-45c1-b62b-7bc80466fdb3): empty table + one Add, no fake charts.

LiftOS: same for athletes. One CTA. No Kajabi-style 12-step “new program” wizard — the coach already knows the athlete.

### Block editor + AI (the money screen)

Split ~70 / 30:

| Grid | Chat |
|---|---|
| Weeks, days, exercise rows (%, kg, RPE, reps). | Thread scoped to **this block** (Fabric’s “Current file” chip). |
| Inline cells, not a modal per set. | [Graphite](https://mobbin.com/screens/88f81a55-bfa9-450c-b106-2ffd76e94f6a): proposals + **Apply changes**. Grid never auto-writes. |
| | [Fabric](https://mobbin.com/screens/b392bc22-bf75-4b35-be0a-ae58de609dc2) / [Semrush](https://mobbin.com/screens/34501fa3-8ec1-4fd4-84e1-aa0d7866389f): collapse chat to an icon rail. |

Quick actions in chat (Semrush / Grammarly): “Add a squat week”, “Deload week 4” — not a blank box only.

### Exercise picker

[Hevy — Add Exercise](https://mobbin.com/screens/5c6fc454-8ab5-4278-9221-4e5b14bbdcce): search, equipment/muscle chips, **Custom** section first, sticky **Add N exercises**, header **Create**. [Gymshark](https://mobbin.com/screens/c26e68e5-fd18-4930-8d16-a1bf6a978579) / [Bevel](https://mobbin.com/screens/b8c914e6-092d-40d1-8e63-a1b0e5e5a0bf): multi-select + count on the CTA; “Add custom” as a row.

LiftOS: barbell only. No video catalog. Picker is a sheet/dialog over the grid.

### Free cap → pay

[Sana AI](https://mobbin.com/screens/7e164f55-0807-4fb9-957e-324eb42cd9ea): always-visible “N messages left this month. Upgrade”. [Air](https://mobbin.com/screens/33662dd3-56c7-49c8-bc9d-b393f8133dac): modal on the workspace, not a new site. After pay, stay on the same block (Vercel “welcome to Pro” is optional, skippable).

Chat blocks; **the grid stays usable**.

## Do not copy

- [Kajabi — Creating a coaching program](https://mobbin.com/flows/abcf3193-9a83-49d9-aabf-fea8e7632666): 12-step schedule/location wizard. That is a course product, not a training block.
- Motion / Amie week **calendars**: meetings, not sets. A LiftOS week is a list of days/exercises, not a 9–5 grid.
- Consumer fitness chrome (Peloton / WHOOP stories, streaks). Coach tool, not a consumer app.

## Flows (product)

1. Sign in → empty roster → add athlete → athlete with “no block” → create block.
2. Edit grid; open picker; chat proposes; **Apply** writes rows.
3. Hit cap → upgrade in/over the chat panel → same thread continues.
4. Library: search + create custom barbell lift.

Mobile web: sidebar already uses a Sheet. Full grid is desktop. Do not block MVP on a phone editor.

## Anti-patterns

- Chat as the only way to edit a program.
- Auto-commit model output into the grid.
- React Native screens in this repo.
